import { Context } from "../../TasksContext.jsx"
import { useState, useContext } from "react";
import { Space } from "antd";
import { CloseOutlined, RightCircleOutlined } from "@ant-design/icons";

function Task({ task, taskId }) {

    const [hovered, setHovered] = useState(false);
    const { deleteTask } = useContext(Context);

    return (
        <li
          className="task-item"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
            <Space>
                {hovered ? <CloseOutlined className="task-icon" onClick={() => deleteTask(taskId, task.content)} /> : <RightCircleOutlined className="task-icon" />}
                <span className="task-content">{task.content}</span>
            </Space>
        </li>
    );
}

export default Task;