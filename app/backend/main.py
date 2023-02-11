from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.router import router

app = FastAPI()

#For frontend access
origins = [
    "http://frontend",
    "http://frontend:3000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Include router
app.include_router(router)



