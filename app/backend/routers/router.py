from fastapi import FastAPI, APIRouter
from backend.models.model import (Task, MessageResponse, MessageError, taskEntity, tasksEntity)
from backend.database.db_mongo import tasks_db
from bson import ObjectId
from typing import List

router = APIRouter()

#Home Page
@router.get("/" , tags=["Manage Tasks"])
async def get_all_tasks():
    all_tasks = tasksEntity(tasks_db.find())
    if all_tasks:
        return MessageResponse(all_tasks,"Retrive all tasks from database.")
    return MessageError("Error","Unable to found tasks.")


#Get task by task id
@router.get("/v1/task/{id}", tags=["Manage Tasks"])
async def get_task_by_id(id):
    task  = taskEntity(tasks_db.find_one({"_id": ObjectId(id)}))
    if task:
        return MessageResponse(task,"Task found successfully.")
    return MessageError("Error:","Unable to found task id: {}".format(id))


#Create a New Task
@router.post("/v1/task", tags=["Manage Tasks"])
async def create_new_task(task: Task):
    task_new = tasks_db.insert_one(dict(task))
    if task_new:
        return MessageResponse(tasksEntity(tasks_db.find({"description": task.description})),"Task Created successfully.")
    else:
        return MessageError("Error:","Unable to create new task.")


#Update Existing Task
@router.put("/v1/task/{id}", tags=["Manage Tasks"])
async def update_existing_task(id, task: Task):
    task_update = tasks_db.find_one_and_update({"_id":ObjectId(id)},{"$set":dict(task)})
    if task_update:
        return MessageResponse(tasksEntity(tasks_db.find({"_id":ObjectId(id)})),"Task Updated.")
    else:
        return MessageError("Error","Unable to update task id: {}".format(id))


#Delete Existing Task
@router.delete("/v1/task/{id}", tags=["Manage Tasks"])
async def delete_task(id, task: Task):
    delete_task = tasks_db.find_one_and_delete({"_id":ObjectId(id)})
    if delete_task:
        return MessageResponse("Task ID: {} deleted successfully.".format(id),"Task Deleted.")
    return MessageError("Unable to delete task ID: {}".format(id),"Task not found or not exists.")


#test
@router.post("/v1/test_app", tags=["Manage Tests"])
async def create_new_task(task :Task):
    return task

