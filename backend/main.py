from fastapi import FastAPI, HTTPException, Depends
from models.checkin import Checkin
from models.checkin_request import CheckinRequest
from models.user import User
from services.storage import StorageService
import os
from static_files import StaticFileMiddleware


app = FastAPI()


@app.get("/api/registrations")
def list_registrations(storage_service: StorageService = Depends()) -> list[User]:
    """List all registrations in the system."""
    return storage_service.get_registrations()


@app.post("/api/registrations")
def new_registration(user: User, storage_service: StorageService = Depends()) -> User:
    """Create a new user/registration."""
    try:
        return storage_service.create_registration(user)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))


@app.post("/api/reset")
def reset(storage_service: StorageService = Depends()) -> str:
    """Development-only route for resetting storage module and adding fake user and checkin."""
    if "MODE" in os.environ and os.environ["MODE"] == "production":
        raise HTTPException(status_code=404, detail="Not Found")
    else:
        storage_service.reset()
        storage_service.create_registration(User(pid=710453084, first_name="Kris", last_name="Jordan"))
        storage_service.create_checkin(710453084)
        return "OK"
    
@app.post("/api/checkins")
def new_checkin(checkin_request: CheckinRequest, storage_service: StorageService = Depends()) -> Checkin:
    try:
        return storage_service.create_checkin(checkin_request.pid)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

@app.get("/api/checkins")
def list_checkins(storage_service: StorageService = Depends()) -> list[Checkin]:
    return storage_service.get_checkins()

@app.delete("/api/registrations/{pid}")
def remove_registration(pid: int, storage_service: StorageService = Depends()) -> User:
    try:
        return storage_service.delete_registration(pid)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
app.mount("/", StaticFileMiddleware("../static", "index.html"))
