from fastapi import FastAPI
from backend.routers.router import router

app = FastAPI()

#Include router
app.include_router(router)



