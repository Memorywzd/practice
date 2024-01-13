from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str


class AddUser(BaseModel):
    username: str
    password: str
    avatar: str
