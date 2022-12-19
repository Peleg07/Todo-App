from fastapi.testclient import TestClient
from backend.main import app
import datetime

client = TestClient(app)

def test_main():
    response = client.get("/")
    assert response.status_code == 200

current_date = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
description = "test task"
test_task = {
    "description": "{}".format(description),
    "creation_date" : "{}".format(current_date),
    "check": 0
}

def test_create_task():
    response = client.post("/v1/test_app", json=test_task)
    assert response.status_code == 200
    assert response.json() == test_task
