import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "../App.css";
import style from "./todoStyle.module.css";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";

const UpdateDialog = (params) => {
  const [tag, setTag] = useState(params.tag);
  const [visible, setEditVisible] = useState(false);
  const [description, setDescription] = useState(params.description);
  const [Checked, setCheckd] = useState(params.Checked);
  const id = params.id;

  const hideEditDialog = () => {
    setEditVisible(false);
  };

  const handleUpdateTask = () => {
    const obj = {
      id: id,
      tag: tag,
      description: description,
      check: Checked,
    };
    console.log(obj);
    axios
      .put(`http://localhost:8080/v1/task/${id}`, obj)
      .then((response) => {
        // what to do when the task deleted successfuly
        console.log(response.data.data);
      })
      .catch(function (error) {
        // catch any error returns from the backend side
        console.log(error);
      });
    window.location.reload();
  };

  return (
    <>
      <Dialog
        header="Edit Task"
        visible={{ visible }}
        style={{ width: "30vw" }}
        onHide={hideEditDialog}
      >
        <div className="p-grid p-fluid">
          <span className={["p-float-label", style.inputs]}>
            <label htmlFor="tag">Tag Name</label>
            <div>
              <InputText
                id="tag"
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              />
            </div>
          </span>
          <span className={["p-float-label", style.inputs]}>
            <label htmlFor="date">Created on</label>
            <div>
              <Calendar
                disabled
                dateFormat="mm/dd/yy"
                value={new Date(params.date)}
                showIcon={(true)}
              ></Calendar>
            </div>
          </span>
          <span className={["p-float-label", style.inputs]}>
            <label htmlFor="Description">Task Description</label>
            <InputTextarea
              rows={5}
              cols={22}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              autoResize
            />
          </span>
          <label htmlFor="Done">Done</label>
          <div>
            <Checkbox
              checked={Checked}
              value = {params.Checked}
              onChange={(e) => {
                setCheckd(e.target.checked);
              }}
            ></Checkbox>
          </div>
        </div>

        <footer
          className="p-clearfix"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            className={[style.btns, "p-button-danger", "p-button-outlined"]}
            label="Cancel"
            onClick={hideEditDialog}
          />
          <Button
            className={[style.btns, "p-button-success", "p-button-outlined"]}
            label="Update"
            onClick={handleUpdateTask}
          />
        </footer>
      </Dialog>
    </>
  );
};

export default UpdateDialog;