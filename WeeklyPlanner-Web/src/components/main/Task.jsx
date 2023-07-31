import { Context } from "../../TasksContext.jsx"
import { useContext } from "react";
import { Space } from "antd";

function Task({ task, taskId }) {

    const { deleteTask } = useContext(Context);

    return (
        <li className="task-item">
            <Space size="middle">
                <svg viewBox="0 0 12 12" className="task-icon" onClick={() => deleteTask(taskId, task.content)}>
                    <circle cx="6" cy="6" r="6" />
                    <line x1="1" y1="11" x2="11" y2="1" stroke="currentColor" strokeWidth="2" />
                    <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="2" />
                </svg>
                
                <span className="task-content">{task.content}</span>
            </Space>
        </li>
    );
}

export default Task;