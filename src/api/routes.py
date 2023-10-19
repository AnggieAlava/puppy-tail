"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import *
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,  get_jwt, create_refresh_token, get_jti, verify_jwt_in_request
from flask import Flask
from flask_cors import CORS
from datetime import timezone
from firebase_admin import storage
import tempfile
import datetime
from sqlalchemy import asc, desc
from datetime import date
import numpy as np
import locale

import smtplib
import ssl
from email.message import EmailMessage
locale.setlocale( locale.LC_ALL, 'en_US.UTF-8' )

import os


frontend_url = os.environ.get("FRONTEND_URL")


api = Blueprint('api', __name__)
# Agregado al boilerplate
app = Flask(__name__)
bcrypt = Bcrypt(app)

#ruta que filtra por ubicacion 

def signup_by_type(new_user, data):
    new_user.first_name = data["first_name"]
    new_user.last_name = data["last_name"]
    new_user.email = data["email"]
    new_user.location = data["location"]
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
    if 'phone_number' in data and data['phone_number']:
        new_keeper.phone_number = data['phone_number']
    if hasattr(data, "services") is False:
        new_keeper.services = []
    if hasattr(data, "description") is False:
        new_keeper.description = ""
    if hasattr(data, "experience") is False:
        new_keeper.experience = datetime.date.today()
    if hasattr(data, "hourly_pay") and data["hourly_pay"] != "" and locale.atof((data["hourly_pay"]).replace(',','.')) > 0: 
        new_keeper.hourly_pay = locale.atof((data["hourly_pay"]).replace(',',"."))
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
    pets = []
    if user.user_type == "owner":
        pets = [{"id":pet.id,"name": pet.name, "category": pet.category, "profile_pic": getpetAvatar(pet.id), "size":pet.size} for pet in user.pets]
    return jsonify({"message": "Login successful", "token":acces_token, "refreshToken": refresh_token, "user_id":user.id, "user_type":user.user_type, "pets":pets}), 201

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
    user = User.query.get(user_id)
    acces_token = create_access_token(identity = user_id)
    acces_jti=get_jti(acces_token)
    refresh_token=create_refresh_token(identity=user_id, additional_claims={"accesToken": acces_jti})
    return jsonify({"message": "Login successful", "token":acces_token, "refreshToken": refresh_token, "user_id":user.id, "user_type":user.user_type}), 201

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
        "user_type":user.user_type,
        "claims":claims,
        "isActive":user.is_active
    }
    return jsonify(response)

@api.route('/owner', methods=["GET"])
def owners_list():
    owners = Owner.query.all()
    owners_data = [{"id": owner.id, "first_name": owner.first_name, "last_name": owner.last_name, "email": owner.email, "location": owner.location, "description": owner.description, "profile_pic": owner.profile_pic, "pets": [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "owner_id": pet.owner_id, "bookings": pet.bookings}
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
        "location": owner.location,
        "description": owner.description,
        "email": owner.email,
        "profile_pic": imgUrl,
        "pets": [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "profile_pic":getpetAvatar(pet.id), "owner_id": pet.owner_id}
            for pet in owner.pets]
    }
    return jsonify(owner_data), 200

@api.route('/owner/<int:owner_id>', methods=["PUT"])
def updateOwner(owner_id):
    owner = Owner.query.get(owner_id)
    data = request.get_json(force=True)
    owner.first_name = (data["first_name"].lower()).title()
    owner.last_name = (data["last_name"].lower()).title()
    owner.description = data["description"]
    owner.location = data["location"]
    imgUrl = ""
    if owner.profile_pic:
        bucket = storage.bucket(name="puppy-tail.appspot.com")
        resource = bucket.blob(owner.profile_pic)
        imgUrl = resource.generate_signed_url(version="v4", expiration = datetime.timedelta(minutes=15), method="GET")    
    db.session.commit()
    owner = {
        "id": owner.id,
        "first_name":owner.first_name,
        "last_name":owner.last_name,
        "description":owner.description,
        "location": owner.location,
        "profile_pic": imgUrl,
        "pets": [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category, "profile_pic":getpetAvatar(pet.id), "owner_id": pet.owner_id, "bookings": pet.bookings}
            for pet in owner.pets]
    }
    return jsonify(owner),200

@api.route('/owner/<int:owner_id>', methods=['DELETE'])
def delete_owner(owner_id):
    owner = Owner.query.get(owner_id)
    db.session.delete(owner)
    db.session.commit()
    return jsonify({"msg": "Owner deleted successfully"}), 200


@api.route('/keeper', methods=["GET"])
def keepers_list():
    keepers = Keeper.query.all()
    keepers_data = []

    for keeper in keepers:
        if keeper.experience:
            experience_date = datetime.datetime.strptime(keeper.experience.strftime("%Y/%m/%d"), '%Y/%m/%d').date()
        else:
            experience_date = None

        if keeper.services is not None:
            services = [service for service in keeper.services]
        else:
            services = []

        keeper_data = {
            "id": keeper.id,
            "first_name": keeper.first_name,
            "last_name": keeper.last_name,
            "email": keeper.email,
            "location": keeper.location,
            "hourly_pay": keeper.hourly_pay,
            "description": keeper.description,
            "profile_pic": getprofilePic(keeper.id),
            "experience": experience_date,
            "services": services,
            "phone_number": keeper.phone_number,
            "working_hours": [str(time) for time in keeper.working_hours] if keeper.working_hours else []
        }

        keepers_data.append(keeper_data)

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
        "location": keeper.location,
        "experience": keeper.experience,
        "hourly_pay": keeper.hourly_pay,
        "phone_number": keeper.phone_number,
        "description": keeper.description,
        "bookings": [{"booking_id": booking.id,"start_date": booking.start_date, "end_date": booking.end_date, "status": booking.status, "keeper_id": booking.keeper_id} for booking in keeper.booking],
        "services": [service for service in keeper.services] if keeper.services else [],
        "profile_pic": imgUrl,
        "working_hours": [str(time) for time in keeper.working_hours]
    }
    return jsonify(keeper_data), 200

@api.route('/keeper/<int:keeper_id>', methods=["PUT"])
def updateKeeper(keeper_id):
    keeper = Keeper.query.get(keeper_id)
    data = request.get_json(force=True)
    keeper.first_name = (data["first_name"].lower()).title()
    keeper.last_name = (data["last_name"].lower()).title()
    if data["hourly_pay"] != "" and locale.atof((data["hourly_pay"]).replace(',','.')) > 0:
        keeper.hourly_pay = locale.atof((data["hourly_pay"]).replace(',','.')) 
    keeper.description = data["description"]
    keeper.experience = data["experience"]
    if "phone_number" in data:
        keeper.phone_number = data["phone_number"]
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
        "phone_number":keeper.phone_number,
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
    new_pet.owner = Owner.query.get(owner_id)
    db.session.add(new_pet)
    db.session.commit()
    # retornar el objeto creado
    obj={
        "name": new_pet.name,
        "size": new_pet.size,
        "category": new_pet.category,
        "id": new_pet.id
    }
    return jsonify(obj), 201


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
            "bookings": pet.bookings,
            "profile_pic": getpetAvatar(pet_id)
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

    pets = [{"id": pet.id, "name": pet.name, "size": pet.size, "category": pet.category,"profile_pic": getpetAvatar(pet.id), "owner_id": pet.owner_id, "bookings": pet.bookings}
            for pet in pets]
    return jsonify(pets), 200

#Endpoint para subir imagenes con firebase
@api.route('/avatar/<int:user_id>', methods=["POST"]) #CAMBIAR A JWT Y CONSEGUIR EL USUARIO CON JWT
@jwt_required()
def uploadPicture(user_id):
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
    #Return URL of new image
    picture_url = resource.generate_signed_url(version="v4", expiration=datetime.timedelta(minutes=60), method="GET")
    return jsonify({"public_url":picture_url, "storable_url": user.profile_pic}), 201

@api.route('/avatar/<int:user_id>', methods=["GET"])
def getprofilePic(user_id):
    user = User.query.get(user_id)
    if user.profile_pic is None:
        return ""
    bucket = storage.bucket(name="puppy-tail.appspot.com")
    resource = bucket.blob(user.profile_pic)
    picture_url = resource.generate_signed_url(version="v4", expiration=datetime.timedelta(days=5), method="GET")
    return picture_url

@api.route('/pet_avatar/<int:pet_id>', methods=["POST"]) #CAMBIAR A JWT Y CONSEGUIR EL PET CON JWT
#@jwt_required()
def uploadpetAvatar(pet_id):
    #user_id = get_jwt_identity()
    pet = Pet.query.get(pet_id)
    #Recibir archivo
    file = request.files["avatar"]
    #Extraer la extension del archivo
    extension = file.filename.split(".").pop()
    #Guardar archivo temporal
    temp = tempfile.NamedTemporaryFile(delete=False)
    file.save(temp.name)
    #Cargar archivo a firebase
    bucket = storage.bucket(name="puppy-tail.appspot.com")
    filename = "pet_avatar/"+str(pet_id)+"."+extension
    #Guardar en firebase
    resource = bucket.blob(filename)
    resource.upload_from_filename(temp.name, content_type="image/"+extension)
    pet.profile_pic = filename
    db.session.add(pet)
    db.session.commit()
    #Return URL of new image
    picture_url = resource.generate_signed_url(version="v4", expiration=datetime.timedelta(minutes=60), method="GET")
    return jsonify({"public_url":picture_url, "storable_url": pet.profile_pic}), 201

@api.route('/pet_avatar/<int:pet_id>', methods=["GET"])
def getpetAvatar(pet_id):
    pet = Pet.query.get(pet_id)
    if pet.profile_pic is None:
        return ""
    bucket = storage.bucket(name="puppy-tail.appspot.com")
    resource = bucket.blob(pet.profile_pic)
    picture_url = resource.generate_signed_url(version="v4", expiration=datetime.timedelta(days=5), method="GET")
    return picture_url

@api.route('/booking', methods=["POST"])
def createBooking():
    data = request.get_json(force=True)
    booking = Booking()
    booking.start_date = data["start_date"]
    booking.end_date = data["end_date"]
    booking.keeper = Keeper.query.get(data["keeper_id"])
    if 'owner_id' in data:
        print(data['owner_id'])
        booking.owner_id = data['owner_id']
    if 'cost' in data:
        print(data['cost'])
        booking.cost = data['cost']
    if 'service' in data:
        print(data['service'])
        booking.service = data['service']
    for pet in data['pets']:
        pet = Pet.query.get(pet)
        booking.pets.append(pet)
    booking.status = 'approved'
    db.session.add(booking)
    db.session.commit()
    return jsonify({"msg":"Booking created successfully"}), 201

@api.route('/bookings', methods=["GET"])
def getAllBookings():
    bookings = Booking.query.all()
    bookings = [{"booking_id": booking.id,"start_date": booking.start_date, "end_date": booking.end_date, "status": booking.status, "keeper_id": booking.keeper_id} for booking in bookings]
    return jsonify(bookings), 200

@api.route('bookings/<string:user_type>/<int:id>', methods=["GET"])
def getuserBookings(user_type,id):    
    if user_type == 'owner':
        bookings = Booking.query.filter_by(owner_id=id).order_by(desc(Booking.start_date)).all()
    elif user_type == 'keeper':
        bookings = Booking.query.filter_by(keeper_id=id).order_by(desc(Booking.start_date)).all()
    bookings = [{"id":booking.id, "start_date": booking.start_date, "end_date": booking.end_date,"keeper":{"id":booking.keeper.id, "first_name":booking.keeper.first_name, "last_name": booking.keeper.last_name, "location": booking.keeper.location, "profile_pic":getprofilePic(booking.keeper.id), "phone_number":booking.keeper.phone_number}, "cost": booking.cost, "service": booking.service, "status": booking.status, "pets":[{"id":pet.id, "name": pet.name, "size": pet.size, "category":pet.category, "profile_pic": getpetAvatar(pet.id), "owner_first_name": pet.owner.first_name, "owner_last_name": pet.owner.last_name, "email": pet.owner.email} for pet in booking.pets], "owner":{"id": booking.pets[0].owner.id, "first_name":booking.pets[0].owner.first_name, "last_name":booking.pets[0].owner.last_name,"email": booking.pets[0].owner.email, "owner_profile_pic": getprofilePic(booking.pets[0].owner.id)}} for booking in bookings]
    return jsonify(bookings), 200

def getbookingPets(pets):
    allPets = []
    for pet in pets:
        temp_pet = Pet.query.get(pet)
        temp_pet = {
            "name": temp_pet.name,
            "size": temp_pet.size,
            "category": temp_pet.category,
            "profile_pic": getpetAvatar(temp_pet.id)
        }
        allPets.append(temp_pet)
    return allPets

@api.route('/bookings/<int:keeper_id>/', methods=["GET"])
def getdailySlots(keeper_id):
    if request.args.get('start_date') is None:
        return jsonify({"msg": "No start date added to request"}), 400
    start_date = request.args.get('start_date')+" 00:00:00"
    end_date = request.args.get('start_date') +" 23:59:59"
    if request.args.get('end_date') != None:
        print("Getting end_date: ")
        print(request.args.get('end_date'))
        end_date = request.args.get('end_date') +" 23:59:59"
    #Getting working hours and making a list of all available working slots for the day
    working_hours = Keeper.query.get(keeper_id).working_hours
    slots = np.array([datetime.time(h,m) for h in range(working_hours[0].hour,working_hours[1].hour) for m in [0,30]])
    slots = slots.tolist()
    slots.pop() #Removes last 30min slot we won't offer due to 1-hour minimum service
    #Getting reservations for the day
    bookings = db.session.query(Booking).where(Booking.keeper_id==keeper_id).filter(Booking.start_date>=start_date, Booking.end_date<=end_date).all()
    if len(bookings) < 1:
        return jsonify([""]+[slot.strftime('%-H:%M') for slot in slots]), 200
    #Remove any conflicting slots based on booking times
    timetoRemove = []
    #Making start_date a datetime object from str
    start_date = datetime.datetime.strptime(start_date,'%Y-%m-%d %H:%M:%S').date()
    for booking in bookings:
        for time in slots:
            full_datetime = datetime.datetime.combine(start_date, time)
            if full_datetime >= (booking.start_date-datetime.timedelta(minutes=30)) and full_datetime < booking.end_date:
                timetoRemove.append(time)
    for time in timetoRemove:
        if time in slots:    
            slots.remove(time)
    slots = [""]+[slot.strftime('%-H:%M') for slot in slots]
    return slots

@api.route("/booking/<int:booking_id>", methods=["PUT", "DELETE"])
def modifyBooking(booking_id):
    booking = Booking.query.get(booking_id)
    if request.method == "DELETE":
        db.session.delete(booking)
        db.session.commit()
        return jsonify({"msg":"Booking successfully deleted"}), 200
    if request.method == "PUT":
        data = request.get_json(force=True)
        booking.start_date = data["start_date"]
        booking.end_date = data["end_date"]
        booking.status = data["status"]
        booking.pets_id = data["pets_id"]
        db.session.commit()
        return jsonify({"msg":"Booking successfully updated"}), 200

@api.route("/bookings/maxDate/<int:keeper_id>", methods=["GET"])
def getmaxDate(keeper_id):
    if request.args.get('start_date') is None:
        return jsonify({"msg": "No start date added to request"}), 400
    start_date = request.args.get('start_date')+" 00:00:00"
    if request.args.get('end_date') is None:
        return jsonify({"msg": "No end date added to request"}), 400
    end_date = request.args.get('end_date') +" 23:59:59"
    start = datetime.datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S').date()
    end = datetime.datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S').date()
    delta = (end-start).days
    #Make start and end dates date objs to compare with bookings
    if delta > 30: #Allow reservations no bigger than 30 days
        end = start+datetime.timedelta(days=30)
        end = datetime.datetime.combine(end, datetime.time(23,59,59))
    if delta <= 30:
        end = datetime.datetime.combine(end, datetime.time(23,59,59))
    start = datetime.datetime.combine(start, datetime.time(00,00,00))
    working_hours = Keeper.query.get(keeper_id).working_hours
    start_slots = np.array([datetime.time(h,m) for h in range(working_hours[0].hour,working_hours[1].hour) for m in [0,30]])
    start_slots = start_slots.tolist()
    start_slots.pop()
    end_slots = start_slots
    # end_slots = np.array([datetime.time(h,m) for h in range(working_hours[0].hour,working_hours[1].hour) for m in [0,30]])
    # end_slots = end_slots.tolist()
    #end_slots.pop()
    bookings = db.session.query(Booking).where(Booking.keeper_id==keeper_id).filter(((Booking.start_date >= start) & (Booking.start_date <= end)).self_group()|((Booking.end_date >= start) & (Booking.end_date <= end)).self_group()).order_by(asc(Booking.start_date)).all()

    if bookings is None:
        bookings = []
    if start.date() == end.date():
         same_slots = getdailySlots(keeper_id)
         same_slots = same_slots[0].get_json() #Tuple object
         dupslots = same_slots
         return ([[""]+same_slots,[""]+dupslots]), 200

    for booking in bookings:
        if booking.start_date>start+datetime.timedelta(days=1) and booking.end_date<end-datetime.timedelta(days=1):
            #Ver si algun booking esta entre los dias de la reserva pero no directamente en los dias selecionados start y end
            return jsonify([[],[]]),200
        last_hour_start = datetime.datetime.combine(start, working_hours[1])-datetime.timedelta(hours=1) #Ultima hora laboral del dia inicial seleccionado

        if booking.start_date > start and booking.start_date < datetime.datetime.combine(start, working_hours[1])-datetime.timedelta(hours=1) and booking.end_date > datetime.datetime.combine(start, datetime.time(working_hours[1].hour, working_hours[1].minute,00)):
            #Booking inicia el dia seleccionado pero termina otro dia
            return jsonify([[],[]]),200
        if booking.start_date > datetime.datetime.combine(start, datetime.time(23,59,59)) and booking.start_date < datetime.datetime.combine(end, datetime.time(00,00,00)):
            #Booking inicia despues de mi inicio solicitado
            return jsonify([[],[]]),200
        if booking.start_date > start and booking.end_date <= last_hour_start:
            #El inicio y fin de la reserva estan en el dia de inicio seleccionado
            end_time = datetime.time(booking.end_date.hour,booking.end_date.minute,00)
            start_slots = start_slots[start_slots.index(end_time)::]
        if booking.start_date > datetime.datetime.combine(end, datetime.time(00,00,00)):
            start_time = datetime.time(booking.start_date.hour, booking.start_date.minute)
            end_slots = end_slots[:end_slots.index(start_time):]
        if booking.end_date > datetime.datetime.combine(start, datetime.time(00,00,00)) and booking.end_date < datetime.datetime.combine(start, working_hours[1])-datetime.timedelta(hours=1):
            end_time = datetime.time(booking.end_date.hour,booking.end_date.minute,00)
            start_slots = start_slots[start_slots.index(end_time)::]

    slots = [start_slots, end_slots]
    slots = [[time.strftime('%-H:%M') for time in slot] for slot in slots]
    return jsonify([[""]+slots[0],[""]+slots[1]]),200
    
@api.route('/recoverypassword', methods=['POST'])
def recovery_password():
   
   email= request.json.get("email")
   user=User.query.filter_by(email=email).first()
   if  user is None:
        return jsonify({"msg": "Se requiere un correo electrónico"}), 400
   token = create_access_token(
       identity=user.id, additional_claims={"type": "password"})
   send_simple_message(email, token)
   return jsonify({"recoveryToken": token}),200
def send_simple_message(user_email, token):
    email_sender = "puppy.tail.verificacion@gmail.com"
    password = "okscwjyfwjlvmakx"
    email_receiver = user_email
    subject = "Recuperar contraseña"
    body = f"""Estimado Usuario,
Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Puppy Tail.
Para recuperar la contraseña, haz clic aquí:
{frontend_url}/changePassword?token={token}
Si no solicitaste este cambio de contraseña, por favor ignora este mensaje o contáctanos inmediatamente si crees que tu cuenta está en peligro.
El enlace expirará en 5 minutos por motivos de seguridad. Si el enlace ha caducado, puedes solicitar un nuevo enlace de recuperación de contraseña en la página de inicio de sesión de Puppy Tail.
Gracias,
Puppy Tail team
"""
    em = EmailMessage()
    em["From"] = email_sender
    em["To"] = email_receiver
    em["Subject"] = subject
    em.set_content(body, subtype="plain")  # Utiliza subtype="plain" para texto sin formato
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
        smtp.login(email_sender, password)
        smtp.send_message(em)
    print("enviado")
@api.route('/changepassword', methods=['POST'])
@jwt_required()
def change_password():
    new_password = request.json.get("password")
    user_id = get_jwt_identity()
    if new_password is None:
        return jsonify({"msg": "Se requiere una nueva contraseña"}), 400
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    secure_password = bcrypt.generate_password_hash(new_password, rounds=None).decode("utf-8")
    user.password = secure_password
    db.session.commit()
    return jsonify({"msg": "Contraseña actualizada exitosamente"}), 200

@api.route('/order', methods=['POST'])
def createPayment():
    data = request.get_json(force=True)
    order = Order(**data)
    # order.paypal_id = data["paypal_id"]
    # order.create_time = data["create_time"]
    # order.payer_email = data["payer_email"]
    # order.payer_name = data["payer_name"]
    # order.payer_id = data["payer_id"]
    # order.amount_currency = data["amount_currency"]
    # order.amount_value = data["amount_value"]
    # order.description= data["description"]
    # order.payee_email = data["payee_email"]
    # order.status = data["status"]
    db.session.add(order)
    db.session.commit()

    return jsonify({"message": "Compra registrada con éxito"}), 200
    
