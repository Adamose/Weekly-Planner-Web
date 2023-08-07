import { Context } from "../../../GlobalContext.jsx";
import Task from "../Task.jsx"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useContext } from "react";

function FutureTasksCard() {
    
    const { tasks, openTaskModal, deleteTasks } = useContext(Context);
    const tasksComponents = [];

    //Getting all future tasks
    for (const [taskId, task] of Object.entries(tasks)) {
        if (task.date === "Future task") {
            tasksComponents.push(
                <Task key={taskId} task={task} taskId={taskId} />
            );
        }
    }
    
    return (
        <div className="tasks-card">
            <div className="tasks-card-body">
                <div className="card-title">
                    <MinusOutlined className="card-title-icon" onClick={() => deleteTasks("Future task")} />
                    <h3 className="card-date">Future Tasks</h3>
                    <PlusOutlined className="card-title-icon" onClick={() => openTaskModal(true, null)} />
                </div>
                
                <ul className="tasks-card-list">
                    {tasksComponents}
                </ul>

                {tasksComponents.length === 0 && <p className="tasks-card-message">Clear schedule ahead, no future tasks to show!</p> }
            </div>
        </div>
    );
}

export default FutureTasksCard;