from fastapi import APIRouter

from api import dev, user

api_router = APIRouter()
api_router.include_router(dev.router, prefix="/dev", tags=["dev"])
api_router.include_router(user.router, prefix="/user", tags=["user"])
