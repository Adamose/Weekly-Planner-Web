import Task from "../Task.jsx";
import Placeholder from "./Placeholder.jsx";
import { Context } from "../../../GlobalContext.jsx"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useRef, useContext } from "react";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DayCard({ dateObject }) {

    const { tasks, deleteTasks, tasksLoading, openTaskModal } = useContext(Context);
    const dateString = useRef(`${dateObject.getMonth() + 1}-${dateObject.getDate()}-${dateObject.getFullYear()}`);
    const cardDate = `${weekdays[dateObject.getDay()]} ${dateObject.getDate()}/${dateObject.getMonth() + 1}`;
    const tasksComponents = [];

    //Getting tasks whose date corresponds to current day
    for (const [taskId, task] of Object.entries(tasks)) {
        if (task.date === dateString.current) {
            tasksComponents.push(
                <Task key={taskId} task={task} taskId={taskId} />
            );
        }
    }

    return (
        <div className="day-card">
            <div className="day-card-body">
                <div className="card-title">
                    <MinusOutlined className="card-title-icon" onClick={() => deleteTasks(dateString.current)} />
                    <h3 className="card-date">{cardDate}</h3>
                    <PlusOutlined className="card-title-icon" onClick={() => openTaskModal(true, dateObject)} />
                </div>
                
                {tasksLoading && <Placeholder />}

                <ul className="day-card-list">
                    {tasksComponents}
                </ul>
            </div>
        </div>
    );
}

export default DayCard;