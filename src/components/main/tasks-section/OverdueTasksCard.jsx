import { Context } from "../../../GlobalContext.jsx";
import Task from "../Task.jsx"
import { useContext } from "react";

function OverdueTasksCard() {
    
    const { tasks, todaysDate } = useContext(Context);
    const tasksComponents = [];

    //Function to check if task is overdue
    const isOverdue = (task) => {

        //Checking if future task
        if (task.date === "Future task") return false;

        const parts = task.date.split('-');
        const dateObject = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
        return dateObject < todaysDate;
    };
    
    //Getting all overdue tasks
    for (const [taskId, task] of Object.entries(tasks)) {
        if (isOverdue(task)) {
            tasksComponents.push(
                <Task key={taskId} task={task} taskId={taskId} />
            );
        }
    }

    return (
        <div className="tasks-card">
            <div className="tasks-card-body">
                <div className="card-title">
                    <h3 className="card-date">Overdue Tasks</h3>
                </div>
                
                <ul className="tasks-card-list">
                    {tasksComponents}
                </ul>

                {tasksComponents.length === 0 && <p className="tasks-card-message">You're all caught up, no tasks are overdue!</p> }
            </div>
        </div>
    );
}

export default OverdueTasksCard;