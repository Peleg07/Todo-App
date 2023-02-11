import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Grid from "@mui/material/Grid";
import style from "./todoStyle.module.css";
import axios from "axios";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import UpdateDialog from "./UpdateDialog";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";

const TodoList = () => {
  const [taskList, setTaskList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [taskTag, setTaskTag] = useState("");
  const [taskCheck, setTaskCheck] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [updateDialog, setUpdateDialog] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [editDate, setEditDate] = useState(0);

  const showSuccessMessage = () => {
    Toast.current.show({
      life: 3000,
      severity: "success",
      summary: "Success Message",
      detail: "Task Created Succesffuly",
    });
  };

  const showInfoMessage = () => {
    Toast.current.show({
      life: 3000,
      severity: "info",
      summary: "Info Message",
      detail: "Operation Cancelled",
    });
  };

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const handleChange = (event) => {
    if (event.target.name === "taskTag") {
      setTaskTag(event.target.value);
    } else {
      setTaskDescription(event.target.value);
    }
  };

  const saveTask = () => {
    let taskObj = {
      description: taskDescription,
      tag: taskTag,
    };
    if (taskTag && taskDescription) {
      let tempList = taskList;
      console.log(taskObj);
      axios
        .post("http://localhost:8080/v1/task", taskObj)
        .then((response) => {
          // what to do when the task saved successfuly
          console.log(response);
          tempList.push(taskObj);
          setTaskList(tempList);
          setVisible(false);
          setTaskDescription("");
        })
        .catch(function (error) {
          // catch any error returns from the backend side
          console.log(error);
        });
    }
    //window.location.reload();
    showSuccessMessage();
  };

  const handleDeleteTask = (obj) => {
    console.log(obj);
    axios
      .delete(`http://localhost:8080/v1/task/${obj.id}`)
      .then((response) => {
        // what to do when the task deleted successfuly
        console.log(response.data.data);
        getAllTasks();
      })
      .catch(function (error) {
        // catch any error returns from the backend side
        console.log(error);
      });
    window.location.reload();
  };

  const handleUpdateDialog = () => {
    setUpdateDialog(true);
  };

  const getAllTasks = () => {
    axios
      .get("http://localhost:8080/v1/tasks")
      .then((response) => {
        // what to do when the tasks retrieved
        if (response.data.code === 404) {
          console.log("No new Tasks");
        } else {
          setTaskList(response.data.data);
        }
      })
      .catch(function (error) {
        // catch any error returns from the backend side
        console.log(error);
      });
  };

  useEffect(() => {
    // when the page first load, it will get all the data from the backend
    getAllTasks();
  }, []);

  return (
    <>
      <Toast ref={Toast} />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12}>
          <h1 className={style.header}>Todo App</h1>
        </Grid>
        <Grid item xs={12} className={style.creatBtn}>
          <Button label="Create new task" onClick={showDialog} />
        </Grid>
        {visible ? (
          <>
            <Dialog
              header="Create new task"
              visible={visible}
              style={{ width: "30vw" }}
              onHide={hideDialog}
            >
              <div className="p-grid p-fluid">
                <div className="field">
                  <label htmlFor="tagName" className="block">
                    Tag Name
                  </label>
                  <InputText
                    id="tag"
                    className="block"
                    value={taskTag}
                    onChange={(e) => setTaskTag(e.target.value)}
                  />
                </div>
                <div className="p-col-4">
                  <label htmlFor="taskDescription">Task Description</label>
                </div>
                <InputTextarea
                  rows={5}
                  cols={22}
                  value={taskDescription}
                  onChange={handleChange}
                  autoResize
                />
              </div>
              <footer
                className="p-clearfix"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  className={[
                    style.btns,
                    "p-button-danger",
                    "p-button-outlined",
                  ]}
                  label="Cancel"
                  onClick={function (event) {
                    showInfoMessage();
                    hideDialog();
                  }}
                />
                <Button
                  className={[
                    style.btns,
                    "p-button-success",
                    "p-button-outlined",
                  ]}
                  label="Create"
                  onClick={saveTask}
                />
              </footer>
            </Dialog>
          </>
        ) : (
          <></>
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={5}
        className={style.allCards}
      >
        {taskList ? (
          taskList.map((obj, index) => (
            <Grid item xs={3} className={style.taskCard}>
              <Card title={obj.tag} className={style.cardComponent}>
                <span className={["p-float-label", style.inputs]}>
                  <label htmlFor="tag">Tag</label>
                  <div>
                    <InputText
                      className={style.gridTitles}
                      disabled
                      id="Tag"
                      value={obj.tag}
                      m
                    />
                  </div>
                </span>
                <span className={["p-float-label", style.inputs]}>
                  <label htmlFor="date">Created on</label>
                  <div>
                    <Calendar
                      className={style.gridTitles}
                      dateFormat="mm/dd/yy"
                      disabled
                      value={new Date(obj.creation_date)}
                    ></Calendar>
                  </div>
                </span>
                <span className={["p-float-label", style.inputs]}>
                  <label htmlFor="Description">Description</label>
                  <div>
                    <InputTextarea
                      className={style.gridDescription}
                      disabled
                      value={obj.description}
                    />
                  </div>
                </span>
                <span className={["p-float-label", style.checkButton]}>
                  <label htmlFor="Done">Done</label>
                  <div>
                    <Checkbox disabled checked={obj.check}></Checkbox>
                  </div>
                </span>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  spacing={5}
                >
                  <Grid item xs={3} className={style.actionButtons}>
                    <Button
                      className={["p-button-secondary", style.editButton]}
                      onClick={() => {
                        setTaskTag(obj.tag);
                        setTaskDescription(obj.description);
                        setCurrentId(obj.id);
                        setEditDate(obj.creation_date);
                        handleUpdateDialog();
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item xs={2.5} className={style.actionButtons}>
                    <Button
                      className={["p-button-danger", style.deleteButton]}
                      icon="pi pi-trash"
                      onClick={() => handleDeleteTask(obj)}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        ) : (
          <></>
        )}
        {updateDialog ? (
          <UpdateDialog
            id={currentId}
            tag={taskTag}
            description={taskDescription}
            checked={taskCheck}
            date={editDate}
          ></UpdateDialog>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};
export default TodoList;