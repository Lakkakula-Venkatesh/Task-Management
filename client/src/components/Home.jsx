import React, {useEffect, useState} from "react";
import DateSection from "./DateSection";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import moment from 'moment-timezone';

function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [taskForm, setTaskForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskUpdate, setTaskUpdate] = useState(0);

    useEffect(() => {
        fetchTasks();

        return () => {
            console.log("Cleanup");
        }
    }, [currentDate, taskUpdate]);

    const fetchTasks = async () => {
        await fetch(`http://localhost:3001/api/tasks?date=${moment(currentDate).format('YYYY-MM-DD')}`)
            .then(response => response.json())
            .then(data => setTasks(data));
    }

    const handlePrevDay = () => {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        setCurrentDate(prevDate);
    };

    const handleNextDay = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setCurrentDate(nextDate);
    };

    return (
        <>
            <h1>Task Manager</h1>
            <DateSection 
                date={currentDate}
                handlePrevDay={handlePrevDay}
                handleNextDay={handleNextDay}
            />
            {taskForm ? 
                <NewTask updateTasks={() => setTaskUpdate(prevState => prevState + 1)} /> :
                <div onClick={() => setTaskForm(true)}>Add a task..</div>
            }
            <TaskList tasks={tasks} updateTasks={() => setTaskUpdate(prevState => prevState + 1)} />
        </>
    );
}

export default Home;