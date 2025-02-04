from fastapi import FastAPI
from app.routes import users,staff,applications,auth,upload

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "Worlds"}

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(staff.router, prefix="/staff", tags=["Staff"])
app.include_router(applications.router, prefix="/applications", tags=["Applications"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(upload.router, prefix="/upload", tags=["Upload"])

