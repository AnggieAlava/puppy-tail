"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import *
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,  get_jwt, create_refresh_token, get_jti
from flask import Flask
from flask_cors import CORS
from datetime import timezone
from firebase_admin import storage
import tempfile
import datetime

api = Blueprint('api', __name__)
# Agregado al boilerplate
app = Flask(__name__)
bcrypt = Bcrypt(app)


def signup_by_type(new_user, data):
    new_user.first_name = data["first_name"]
    new_user.last_name = data["last_name"]
    new_user.email = data["email"]
    new_user.password = bcrypt.generate_password_hash(
        str(data["password"])).decode("utf-8")
    new_user.is_active = True

@api.route('/signup', methods=['POST'])
def create_owner():
    data = request.get_json(force=True)
    email = data["email"].lower()
    if Owner.query.filter_by(email=email).first() is not None:
        return jsonify({"msg": "Email already registered"}), 400
    new_owner = Owner()
    signup_by_type(new_owner, data)
    db.session.add(new_owner)
    db.session.commit()
    # siempre devolver el nuevo estado del recurso que se ha modificado
    return jsonify({"msg": "Owner created successfully"}), 201


@api.route('/signup/keeper', methods=['POST'])
def create_keeper():
    data = request.get_json(force=True)
    email = data["email"].lower()
    if Keeper.query.filter_by(email=email).first() is not None:
        return jsonify({"msg": "Email already registered"}), 400
    new_keeper = Keeper()
    signup_by_type(new_keeper, data)
    new_keeper.hourly_pay = data["hourly_pay"]
    db.session.add(new_keeper)
    db.session.commit()
    return jsonify({"msg": "Keeper created successfully"}), 201

@api.route('/login', methods=['POST'])
def login_user():
    email= request.json.get("email")
    
    password= request.json.get("password")
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"message": "Usern not found"}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message":"Wrong password"}), 400
    acces_token = create_access_token(identity = user.id)
    acces_jti=get_jti(acces_token)
    
    
    refresh_token=create_refresh_token(identity=user.id, additional_claims={"accesToken": acces_jti})
   
    return jsonify({"message": "Login successful", "token":acces_token, "refreshToken": refresh_token}), 201

@api.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def user_refresh():
    #Identificadores de token viejos
    jti_refresh=get_jwt()["jti"]
    jti_access=get_jwt()["accesToken"]
    #Bloquear los tokens viejos
    accesRevoked=TokenBlockedList(jti=jti_access)
    refreshRevoked=TokenBlockedList(jti=jti_refresh)
    db.session.add(accesRevoked)
    db.session.add(refreshRevoked) 
    db.session.commit()
    
    #Generar nuevos tokens
    user_id=get_jwt_identity()
    acces_token = create_access_token(identity = user_id)
    acces_jti=get_jti(acces_token)
    refresh_token=create_refresh_token(identity=user_id, additional_claims={"accesToken": acces_jti})
    return jsonify({"message": "Login successful", "token":acces_token, "refreshToken": refresh_token}), 201

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
   
    jwt=get_jwt()["jti"]
    
    tokenBlocked= TokenBlockedList(jti=jwt)
    db.session.add(tokenBlocked)
    db.session.commit()
    return jsonify({"message": "User logged out"}),401

@api.route('/helloprotected')
@jwt_required() 
def hello_protected():
    user_id=get_jwt_identity()
    claims= get_jwt()
    user=User.query.get(user_id)
    response={
        "userId":user_id,
        "claims":claims,
        "isActive":user.is_active
    }
    return jsonify(response)

@api.route('/owner', methods=["GET"])
def owners_list():
    owners = Owner.query.all()
    owners_data = [{"id": owner.id, "first_name": owner.first_name, "last_name": owner.last_name, "email": owner.email, "profile_pic": owner.profile_pic, "pets": [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings}
                   for pet in Pet.query.filter_by(owner_id=owner.id)]}
                   for owner in owners]
    return jsonify(owners_data), 200

@api.route('/owner/<int:owner_id>', methods=['GET'])
def get_owner(owner_id):
    owner = Owner.query.get(owner_id)
    #Firebase image url generator
    imgUrl = ""
    if owner.profile_pic:
        bucket = storage.bucket(name="puppy-tail.appspot.com")
        resource = bucket.blob(owner.profile_pic)
        imgUrl = resource.generate_signed_url(version="v4", expiration = datetime.timedelta(minutes=15), method="GET")
    owner_data = {
        "id": owner.id,
        "first_name": owner.first_name,
        "last_name": owner.last_name,
        "email": owner.email,
        "profile_pic": imgUrl,
        "pets": [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings}
            for pet in owner.pets]
    }
    return jsonify(owner_data), 200

@api.route('/owner/<int:owner_id>', methods=['DELETE'])
def delete_owner(owner_id):
    owner = Owner.query.get(owner_id)
    db.session.delete(owner)
    db.session.commit()
    return jsonify({"msg": "Owner deleted successfully"}), 200


@api.route('/keeper', methods=["GET"])
def keepers_list():
    limit = request.args.get('limit', type=int)
    keepers = Keeper.query.all()
    
    if limit is not None and limit > 0:
        keepers = keepers[:limit]
    keepers_data = [{"id": keeper.id, "first_name": keeper.first_name, "last_name": keeper.last_name, "email": keeper.email, "location": keeper.location, "profile_pic": keeper.profile_pic, "hourly_pay": keeper.hourly_pay, "description": keeper.description, "experience": datetime.datetime.strptime((keeper.experience.strftime("%Y/%m/%d")), '%Y/%m/%d').date(), "services":[service for service in keeper.services]} for keeper in keepers]
    
    return jsonify(keepers_data), 200


@api.route('/keeper/<int:keeper_id>', methods=['GET'])
def get_keeper(keeper_id):
    keeper = Keeper.query.get(keeper_id)
    #Firebase img url generator
    imgUrl = ''
    if keeper.profile_pic:
        bucket = storage.bucket(name="puppy-tail.appspot.com")
        resource = bucket.blob(keeper.profile_pic)
        imgUrl = resource.generate_signed_url(version="v4", expiration = datetime.timedelta(minutes=15), method="GET")
    keeper_data = {
        "id": keeper.id,
        "first_name": keeper.first_name,
        "last_name": keeper.last_name,
        "email": keeper.email,
        "hourly_pay": keeper.hourly_pay,
        "description": keeper.description,
        "services": [service for service in keeper.services],
        "profile_pic": imgUrl
    }
    return jsonify(keeper_data), 200

@api.route('/keeper/<int:keeper_id>', methods=["PUT"])
def updateKeeper(keeper_id):
    keeper = Keeper.query.get(keeper_id)
    data = request.get_json(force=True)
    keeper.first_name = (data["first_name"].lower()).title()
    keeper.last_name = (data["last_name"].lower()).title()
    keeper.hourly_pay = data["hourly_pay"]
    keeper.description = data["description"]
    keeper.experience = data["experience"]
    keeper.services = [service for service in data["services"]]
    keeper.location = data["location"]
    db.session.commit()
    keeper = {
        "id": keeper.id,
        "first_name":keeper.first_name,
        "last_name":keeper.last_name,
        "hourly_pay":keeper.hourly_pay,
        "description":keeper.description,
        "experience":keeper.experience,
        "services": [service for service in keeper.services],
        "location": keeper.location
    }
    return jsonify(keeper),200

@api.route('/keeper/<int:keeper_id>', methods=['DELETE'])
def delete_keeper(keeper_id):
    keeper = Keeper.query.get(keeper_id)
    db.session.delete(keeper)
    db.session.commit()
    return jsonify({"msg": "keeper deleted successfully"}), 200


@api.route('/pets', methods=['POST'])
def createPet():
    data = request.get_json(force=True)
    owner_id = int(data["owner_id"])
    name = (data["name"].lower()).title()
    owner = Owner.query.filter_by(id=owner_id).first()
    if owner is None:
        return jsonify({"msg": "Invalid user id"}), 404
    if Pet.query.filter_by(owner_id=owner_id, name=name).first() is not None:
        return jsonify({"msg": "Name already registered for this user"}), 400
    size = (data["size"].lower()).title()
    new_pet = Pet()
    new_pet.name = name
    new_pet.size = size
    new_pet.category = (data["category"].lower()).title()
    new_pet.owner_id = owner_id
    db.session.add(new_pet)
    db.session.commit()
    # retornar el objeto creado
    return jsonify({"msg": "Pet added successfully"}), 201


@api.route('/pets/<int:pet_id>', methods=['GET', 'DELETE', 'PUT'])
def getPet(pet_id):
    if Pet.query.filter_by(id=pet_id).first() is None:
        return jsonify({"msg": "Pet does not exist on record"}), 404
    pet = Pet.query.get(pet_id)
    if request.method == 'GET':
        pet_data = {
            "id": pet.id,
            "name": pet.name,
            "size": pet.size,
            "category": pet.category,
            "owner_id": pet.owner_id,
            "bookings": pet.bookings
        }
        return jsonify(pet_data), 200
    if request.method == 'PUT':
        data = request.get_json(force=True)
        pet.name = (data["name"].lower()).title()
        pet.size = (data["size"].lower()).title()
        pet.category = (data["category"].lower()).title()
        db.session.commit()
        return jsonify({"msg": "Pet data updated"}), 200
    if request.method == 'DELETE':
        db.session.delete(pet)
        db.session.commit()
        return jsonify({"msg": "Pet removed from profile"}), 200


@api.route('/pets', methods=['GET'])
def getAllPets():
    pets = Pet.query.all()
    pets_data = [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings, "owner": [{"id": owner.id, "first_name": owner.first_name, "last_name": owner.last_name, "email": owner.email} for owner in Owner.query.filter_by(id=pet.owner_id)]}
                 for pet in pets]
    return jsonify(pets_data), 200


@api.route('/pets/owner/<int:owner_id>', methods=['GET'])
def getPetsByOwner(owner_id):
    pets = Pet.query.filter_by(owner_id=owner_id)

    pets = [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings}
            for pet in pets]
    return jsonify(pets), 200

    


#Endpoint para subir imagenes con firebase
@api.route('/avatar/<int:user_id>', methods=["POST"]) #CAMBIAR A JWT Y CONSEGUIR EL USUARIO CON JWT
#@jwt_required()
def profilePicture(user_id):
    #user_id = get_jwt_identity()
    user = User.query.get(user_id)
    #Recibir archivo
    file = request.files["avatar"]
    #Extraer la extension del archivo
    extension = file.filename.split(".")[1]
    #Guardar archivo temporal
    temp = tempfile.NamedTemporaryFile(delete=False)
    file.save(temp.name)
    #Cargar archivo a firebase
    bucket = storage.bucket(name="puppy-tail.appspot.com")
    filename = "avatar/"+str(user_id)+"."+extension
    #Guardar en firebase
    resource = bucket.blob(filename)
    resource.upload_from_filename(temp.name, content_type="image/"+extension)
    #Agregar la imagen a nuestra base de datos
    user.profile_pic = filename
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"Profile picture uploaded successfully"}), 201

