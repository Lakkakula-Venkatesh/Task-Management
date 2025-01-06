export default function NewTask({  updateTasks }) {
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
        }).catch(error => console.error("Error creating task:", error));
    }

    return (
        <form onSubmit={addTask}>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" required></textarea>
            </div>
            <div>
                <label htmlFor="scheduledDate">Scheduled Date:</label>
                <input type="date" id="scheduledDate" name="scheduledDate" required />
            </div>
            <div>
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" required>
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label htmlFor="pinned">Pinned:</label>
                <input type="checkbox" id="pinned" name="pinned" />
            </div>
            <button type="submit">Create Task</button>
        </form>
    );
}