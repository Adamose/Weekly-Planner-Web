import { Context } from "../../TasksContext.jsx"
import { useState, useContext } from "react";
import { Space } from "antd";
import Icon from "@ant-design/icons";

function Task({ task, taskId }) {

    const [isHovered, setIsHovered] = useState(false);
    const { deleteTask } = useContext(Context);

    const bulletIcon = () => (
        <svg width="15px" height="15px" fill="#a93dc7" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="6" />
        </svg>
    );

    const closeIcon = () => (
        <svg width="15px" height="15px" viewBox="0 0 12 12">
            <line x1="1" y1="11" x2="11" y2="1" stroke="currentColor" strokeWidth="2" />
            <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="2" />
        </svg>
    );

    return (
        <li
          className="task-item"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
            <Space size="middle">
                { isHovered 
                  ? <Icon component={closeIcon} className="task-icon" onClick={() => deleteTask(taskId, task.content)} />
                  : <Icon component={bulletIcon} className="task-icon" />
                }
                <span className="task-content">{task.content}</span>
            </Space>
        </li>
    );
}

export default Task;