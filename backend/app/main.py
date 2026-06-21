from fastapi import FastAPI
from app.routes.user_routes import router
from app.routes.career_routes import router as career_router
from fastapi.middleware.cors import CORSMiddleware
from app.routes.project_routes import router as project_router
from app.routes.auth_routes import router as auth_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
app.include_router(career_router)
app.include_router(project_router)
app.include_router(auth_router)
@app.get("/")
def home():
    return {
        "message": "Welcome to CareerForge AI"
    }