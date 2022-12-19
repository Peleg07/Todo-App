from pydantic import BaseModel
import datetime

class Task(BaseModel):
    description: str
    creation_date: str = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    check = 0


def MessageResponse(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def MessageError(data,message):
    return {
        "data":data,
        "code": 404,
        "message":message,
    }


def taskEntity(task)-> dict:
    return {
        "id": str(task["_id"]),
        "description": task["description"],
        "creation_date": task["creation_date"],
        "check": task["check"]
    }


def tasksEntity(entity)-> list:
    return [taskEntity(task) for task in entity]
