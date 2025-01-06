import React, { useState } from "react";

export default function Task({ task, updateTasks }) {
    const [currentTask, setCurrentTask] = useState(task);
    const [dropdown, setDropdown] = useState(false);

    const updateTaskPin = async function () {
        // PATCH API to update pin attribute
        await fetch(`http://localhost:3001/api/task/${currentTask.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pinned: !currentTask.pinned }),
        }).then(() => {
            setCurrentTask((prevState) => ({ ...prevState, pinned: !prevState.pinned }));
            updateTasks();
        }).catch
            (error => console.error("Error updating task pin:", error));

    };

    const deleteTask = async function () {
        // DELETE API to remove task
        await fetch(`http://localhost:3001/api/task/${currentTask.id}`, {
            method: "DELETE",
        }).then(() => {
            setCurrentTask(null);
            updateTasks();
        }).catch(error => console.error("Error deleting task:", error));
    };

    const updateTaskStatus = async function () {
        // PATCH API to update task's status
        await fetch(`http://localhost:3001/api/task/${currentTask.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: currentTask.status === "pending" ? "completed" : "pending" }),
        }).then(() => {
            setCurrentTask((prevState) => ({ ...prevState, status: prevState.status === "pending" ? "completed" : "pending" }));
            updateTasks();
        }).catch(error => console.error("Error updating task status:", error));
    };

    return (
        <>
            <input type="checkbox" name="complete" id="complete-radio" onClick={updateTaskStatus} defaultChecked={currentTask.status === "completed"} />
            <div style={{padding: "0px 10px", margin: "0px 25px"}}>
                <h3>{currentTask.title}</h3>
                <span>{currentTask.description}</span>
            </div>
            {dropdown ? (
                <div className="action-dropdown" style={{flexDirection: "column"}}>
                    <button onClick={updateTaskPin}>{currentTask.pinned ? "Unpin" : "Pin to the top"}</button>
                    <button onClick={deleteTask}>Delete</button>
                </div>
            ) : (
                <button onClick={() => setDropdown((prevState) => !prevState)}>...</button>
            )}
        </>
    );
}
