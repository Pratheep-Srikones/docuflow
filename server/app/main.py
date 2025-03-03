from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import staff_auth, user_auth,branches,organization
from app.routes import pdf
from app.middlewares import middleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,  # Allow cookies & authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allow all headers
)
app.add_middleware(middleware.RoleBasedMiddleware)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Import routers AFTER applying CORS
from app.routes import users, staff, applications, upload

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(staff.router, prefix="/staff", tags=["Staff"])
app.include_router(applications.router, prefix="/applications", tags=["Applications"])
app.include_router(user_auth.router, prefix="/auth/user", tags=["Auth"])
app.include_router(staff_auth.router, prefix="/auth/staff", tags=["Auth"])
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(branches.router, prefix="/branches", tags=["Branches"])
app.include_router(pdf.router, prefix="/pdf", tags=["PDF"])
app.include_router(organization.router, prefix="/organization", tags=["Organization"])
