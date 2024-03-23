from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, field_validator

app = FastAPI()


class UserSchema(BaseModel):
    name: str
    last_name: str
    email: str
    password: str
    location: str

    @field_validator('name', 'last_name', 'email', 'password', 'location')
    def validate_name(cls, v):
        if not v:
            raise HTTPException(
                status_code=400, detail="Name cannot be empty")
        if len(v) < 3:
            raise HTTPException(
                status_code=400, detail="Name must be at least 3 characters long")
        if len(v) > 20:
            raise HTTPException(
                status_code=400, detail="Name must be less than 20 characters")
        return v

    def __repr__(self):
        return f"UserSchema(name={self.name}, last_name={self.last_name}, email={self.email}, password={self.password}, location={self.location})"


users = [
    {"id": 1, "name": 'Anggie', "last_name": 'Alava',
        "email": 'a@example.com', "password": 'a123', "location": 'Ecuador'},
    {"id": 2, "name": 'Carla', "last_name": 'Cruz',
        "email": 'b@example.com', "password": 'b123', "location": 'Manila'},

]


@app.get('/')
def hello():
    return {"Hello World!"}


@app.get('/api/users')
def users_list():
    return users


@app.get('/api/users/{id}')
def user(id: int):
    user = next((u for u in users if u["id"] == id), None)
    if not user:
        raise HTTPException(
            status_code=404, detail="The user with the given ID was not found..."
        )
    return user
