
import React, { useState } from 'react';

function NewTask({ updateTasks, toggleTaskForm }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [pinned, setPinned] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      return setPinned(checked);
    }
    return name === 'scheduledDate'
      ? setScheduledDate(value)
      : name === 'status'
      ? setStatus(value)
      : name === 'title'
      ? setTitle(value)
      : setDescription(value);
  };

  const addTask = async (event) => {
        event.preventDefault();
        const task = {
            title: event.target.title.value,
            description: event.target.description.value,
            scheduledDate: event.target.scheduledDate.value,
            status: event.target.status.value,
            pinned: event.target.pinned.checked
        };
        await fetch("http://localhost:3001/api/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(() => {
            updateTasks();
            toggleTaskForm();
        }).catch(error => console.error("Error creating task:", error));
    }


    return (
        <div>
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div onClick={toggleTaskForm} style={{display: "flex", justifyContent: "flex-end", cursor: "pointer"}}>X</div>
                <form onSubmit={addTask}>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '5px',
                                borderRadius: '3px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label
                            htmlFor="description"
                            style={{ display: 'block', marginBottom: '5px' }}
                        >
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={handleInputChange}
                            required
                            style={{
                                width: '100%',
                                padding: '5px',
                                borderRadius: '3px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label
                            htmlFor="scheduledDate"
                            style={{ display: 'block', marginBottom: '5px' }}
                        >
                            Scheduled Date:
                        </label>
                        <input
                            type="date"
                            id="scheduledDate"
                            name="scheduledDate"
                            value={scheduledDate}
                            onChange={handleInputChange}
                            required
                            style={{
                                padding: '5px',
                                borderRadius: '3px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="status" style={{ display: 'block', marginBottom: '5px' }}>
                            Status:
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={handleInputChange}
                            required
                            style={{
                            padding: '5px',
                            borderRadius: '3px',
                            border: '1px solid #ccc',
                        }}>
                            <option value="pending">Pending</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="pinned" style={{ display: 'block', marginBottom: '5px' }}>
                            Pinned:
                        </label>
                        <input
                            type="checkbox"
                            id="pinned"
                            name="pinned"
                            checked={pinned}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        }}
                    >
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewTask;