import React, { useState } from 'react';
import Card from './Card';
import '../App.css'

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const[taskList, setTaskList] = useState([])

    const toggle = () => {setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        setTaskList(tempList)
        setModal(false)
    }
    
    return (
        <>
            <div className='header text-center'>
                <h2>Todo App</h2>
                <button className = "btn btn-primary mt-2" onClick={()=>setModal(true)} >Create Task</button>
            </div>
            <div className='task-container'>
                {taskList.map((obj, index) => <Card taskObj={obj} index={index}/>)}
            </div>
        </>
    );
};

export default TodoList;