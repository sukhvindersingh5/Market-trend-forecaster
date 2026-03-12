from fastapi import APIRouter, Depends
from app.utils.auth import get_current_user

router = APIRouter()

@router.get("/profile")
async def read_users_me(current_user = Depends(get_current_user)):
    return {
        "id": current_user.get("id"),
        "username": current_user.get("username"),
        "email": current_user.get("email"),
        "full_name": current_user.get("full_name")
    }
