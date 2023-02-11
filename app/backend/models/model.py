from pydantic import BaseModel
import datetime

class Task(BaseModel):
    tag: str
    description: str
    creation_date: str = datetime.datetime.now().strftime("%d/%m/%Y")
    check: bool = False


def MessageResponse(data, message):
    return {
        "data": data,
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
        "tag": task["tag"],
        "description": task["description"],
        "creation_date": task["creation_date"],
        "check": task["check"],
    }


def tasksEntity(entity)-> list:
    return [taskEntity(task) for task in entity]

def TestResponse(data):
    return {
        "data": data
    }
