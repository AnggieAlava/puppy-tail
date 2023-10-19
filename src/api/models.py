from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemyseeder import ResolvingSeeder
# from sqlalchemy_jsonfield import JSONField
from enum import Enum

db = SQLAlchemy()

class Status(str, Enum):
    pending = 'Pending'
    approved = 'Approved'
    #Archived means the booking proposal was rejected by the keeper and we should dispose this booking
    archived = 'Archived'
    #canceled means it was withdrawn by the user
    canceled = 'Canceled'
    done = 'Done'
    #Personal Time Off. Used by the keeper to go on vacation or other personal duties.
    pto = 'PTO'

class Booking(db.Model, SerializerMixin):
    __tablename__='booking'
    serialize_rules = ('-keeper','-keeper.booking')
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Enum(Status))
    #Many to one relationship booking to keeper
    keeper = relationship("Keeper", back_populates="booking")
    keeper_id = db.Column(db.Integer, db.ForeignKey('keeper.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id'), nullable=True)
    pets_id = db.Column(db.ARRAY(db.Integer), nullable=True)
    #Many to many bookings/pets
    pets = relationship("Pet", secondary="booking_pet",
                        back_populates="bookings")

# Definición de la clase base 'User': encapsulara dentro los owner y los keepers, que serian una subclase de user
class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    serialize_rules = ('-password') #PROBAR
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    location = db.Column(db.String(255), unique=False, nullable=True)
    password = db.Column(db.String(255), unique=False, nullable=False)
    description = db.Column(db.String(2000), unique=False, nullable=True)
    profile_pic = db.Column(db.String(150), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    user_type = db.Column(db.String(50))

    # Configuración para el polimorfismo
    __mapper_args__ = {
        # <= # Identidad de user(representa una entidad con la que se pueden relacionar varias subentidades (en este caso Owner y Keeper)
        "polymorphic_identity": "user",
        # <= este es el link, donde los categorizamos como subcatgorias de User
        # establece que cualquier fila polymorphic_identity igual a user, se considera un tipo de user y se establece su tipo en la columna user_type
        "polymorphic_on": "user_type",
    }

# Definición de la clase 'Owner' que hereda de 'User', seria un user_type: Owner
class Owner (User, SerializerMixin):
    __tablename__ = 'owner'
    id = db.mapped_column(db.ForeignKey("user.id"), primary_key=True)
    # Relación one-to-many: Un propietario puede tener varias mascotas
    pets = relationship("Pet", back_populates="owner")
    
    # configuracion del polimorfismo(sus propiedades se heredan de su entidad base USER)
    __mapper_args__ = {
        # y se establece su identidad como subentidad de User, tipo => owner
        "polymorphic_identity": "owner",
    }

class Keeper(User, SerializerMixin):
    __tablename__ = 'keeper'
    id = db.mapped_column(db.ForeignKey("user.id"), primary_key=True)
    hourly_pay = db.Column(db.Float, nullable=True)
    experience = db.Column(db.Date, nullable=True)
    services = db.Column(db.ARRAY(db.String(50)), nullable=True)
    working_hours = db.Column(db.ARRAY(db.Time), nullable = True, default=('07:00:00','22:00:00'))
    phone_number = db.Column(db.String(20), nullable=True)
    #One keeper to many bookings
    booking = relationship("Booking", back_populates='keeper')

    __mapper_args__ = {
        "polymorphic_identity": "keeper",  # Identidad de cuidador
    }

class Pet (db.Model, SerializerMixin):
    __tablename__ = 'pet'
    serialize_rules = ('-bookings', '-owner.pets')
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    size = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    profile_pic = db.Column(db.String(150), unique=False, nullable=True)
    # Relación many-to-one multiple pets/one owner
    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id'))
    owner = relationship("Owner", back_populates="pets")
    #Ralacion many to many bookings/pets
    bookings = relationship(
        "Booking", secondary="booking_pet", back_populates="pets")

# Definición de la clase 'KeeperPet' para la relación muchos a muchos entre cuidadores y mascotas
class BookingPet (db.Model):
    __tablename__ = 'booking_pet'
    booking_id = db.Column(db.Integer, db.ForeignKey(
        'booking.id'), primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), primary_key=True) #HACER PET DUMMY PARA PTO

class TokenBlockedList(db.Model, SerializerMixin):
    __tablename__ = 'token_blocked_list'
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(1000), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    # __mapper_args__ = {
       
    #     "polymorphic_identity": "token_blocked_list",
    # }

class Order(db.Model,SerializerMixin):
    __tablename__ = 'order'
    id = db.Column(db.Integer, primary_key=True)
    paypal_id = db.Column(db.String(200), unique=True, nullable=False)  
    create_time = db.Column(db.DateTime, nullable=False) 
    payer_email = db.Column(db.String(200), nullable=False) 
    payer_name = db.Column(db.String(200), nullable=False) 
    payer_id = db.Column(db.String(200), nullable=False) 
    amount_currency = db.Column(db.String(3), nullable=False) 
    amount_value = db.Column(db.Float, nullable=False)  
    description = db.Column(db.String(200), nullable=False) 
    payee_email = db.Column(db.String(200), nullable=False) 
    status = db.Column(db.String(50), nullable=False) 


def seed():
    seeder = ResolvingSeeder(db.session)
    seeder.register(Owner)
    seeder.register(Keeper)
    seeder.register(Pet)
    seeder.register(Booking)
    seeder.load_entities_from_json_file("seedData.json")
    db.session.commit()
