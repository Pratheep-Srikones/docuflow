from fastapi import APIRouter, Response
from app.controllers import user_controller
from app.models import user_model

router = APIRouter()


@router.get("/")
def get_users():
    return user_controller.get_all_users()

@router.get("/{user_id}",status_code=200)
def get_user(user_id: str, response: Response):
    return user_controller.get_user_by_id(user_id,response)

@router.get("/nic/{nic}",status_code=200)
def get_user_by_nic(nic: str, response: Response):
    return user_controller.get_user_by_nic(nic,response)

@router.post("/",status_code=201)
def create_user(user: user_model.User, response: Response):
    return user_controller.create_user(user,response)

@router.put("/{user_id}",status_code=200)
def update_user(user_id: str, user: user_model.User, response: Response):
    return user_controller.update_user(user_id,user,response)

@router.delete("/{user_id}",status_code=200)
def delete_user(user_id: str, response: Response):
    return user_controller.delete_user(user_id,response)