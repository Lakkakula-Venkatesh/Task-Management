import Task from "./Task";

export default function TaskList({ tasks, updateTasks }) {
    const pinnedTasks = tasks.filter(task => task.pinned);
    const unpinnedTasks = tasks.filter(task => !task.pinned);

    return (
        <>
            <ul>
                {pinnedTasks.map(task => 
                    <div key={task.id} style={{display: "flex", alignItems: "center"}}>
                        <Task updateTasks={updateTasks} task={task} />
                    </div>
                )}
            </ul>
            {pinnedTasks.length > 0 && <hr />}
            <ul>
                {unpinnedTasks.map(task => 
                    <div key={task.id} style={{display: "flex", alignItems: "center"}}>
                        <Task updateTasks={updateTasks} task={task} />
                    </div>
                )}
            </ul>
        </>
    );
}