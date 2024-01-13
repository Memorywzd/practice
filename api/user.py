from fastapi import APIRouter, HTTPException

from model import User, AddUser
from db import database

router = APIRouter()


@router.post("/login")
async def login(user: User):
    uid = database.dao_login(user)
    if uid != 0:
        return {"status": "ok", "id": uid}
    else:
        raise HTTPException(status_code=403, detail="invalid username or password")


@router.get("/userInfo")
async def get_user_info(id: int):
    return database.dao_get_user_by_id(id)


@router.post("/addUser")
async def add_user(user: AddUser):
    if database.dao_add_user(user):
        return {"status": "ok"}
    else:
        raise HTTPException(status_code=400, detail="User already exists")


@router.get("/allocate")
async def allocate_dev(userID: int, areaID: int, nodeID: int):
    if database.dao_allocate_dev(userID, areaID, nodeID):
        return {"status": "ok"}
    else:
        raise HTTPException(status_code=400, detail="Device already allocated or not exists")


@router.get("/userList")
async def get_user_list():
    return database.dao_get_user_list()
