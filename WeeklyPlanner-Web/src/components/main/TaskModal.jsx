import { Context } from "../../GlobalContext.jsx"
import { Modal, Menu, Input, Space, Alert, DatePicker } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";

function TaskModal() {

    const [taskContent, setTaskContent] = useState("");
    const [taskDateString, setTaskDateString] = useState("");
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { tasks, setTasks, showTaskModal, openTaskModal, taskModalDate, notifyFailedRequest } = useContext(Context);

    //Handler for closing task modal
    const closeModal = () => {
        if (!loading) {
            openTaskModal(false);
            setShowError(false);
            setErrorMessage("");
            setTaskContent("");
            setTaskDateString("");
            setSelectedDate(undefined);
            setLoading(false);
        }
    };

    //Function to make request to server
    const submit = async () => {

        //Checking if there is a user logged in
        if (localStorage.getItem("JWT") === null) return;

        //Validating input
        if (taskContent.length === 0) {
            setErrorMessage("Please enter the task's content");
            setShowError(true);
            return;
        }

        if (taskDateString.length === 0) {
            setErrorMessage("Please select the task's date");
            setShowError(true);
            return;
        }

        //Waiting for loading animation
        setLoading(true);
        await new Promise(r => setTimeout(r, 500));

        try {

            //Making request
            const response = await fetch(`https://api-weeklyplanner.adamose.com/task?date=${taskDateString}&content=${encodeURIComponent(taskContent)}`, {
                "method": "POST",
                "headers": { "Authorization": localStorage.getItem("JWT"), "x-api-key": "ObYIVP54zf35RbJsVO1i785wLdLTiswQ2JU3MAwu" }
            });

            //Checking if response is bad
            if (response.status !== 200) {
                setLoading(false);
                setErrorMessage("Failed to add task because of database error");
                setShowError(true);
            } else {

                //Adding task to UI
                const updatedTasks = { ...tasks };
                updatedTasks[await response.text()] = { content: taskContent, date: taskDateString };
                setTasks(updatedTasks);

                closeModal();
            }

        } catch (error) {
            notifyFailedRequest();
        }
    };

    //Function to set initial date value when modal gets opened by another component
    useEffect(() => {
        if (taskModalDate === undefined) {
            setSelectedDate(null);
            setTaskDateString("Future task");
        } else {
            setSelectedDate(dayjs(taskModalDate));
            setTaskDateString(`${taskModalDate.getMonth() + 1}-${taskModalDate.getDate()}-${taskModalDate.getFullYear()}`);
        }
    }, [taskModalDate]);

    //Function used to disable dates in date picker component
    const disabledDate = (date) => {
        //Return if date is undefined
        if (!date) 
            return false;
        //Disabling overdue dates
        if (date < dayjs().startOf("day"))
            return true;
        //Disabling dates farther than two weeks ahead
        if (date >= dayjs().add(2, "week").startOf("day"))
            return true;
        return false;
    };

    return (
        <Modal
            okText="Submit"
            centered={true}
            open={showTaskModal}
            confirmLoading={loading}
            onOk={submit}
            onCancel={closeModal}
        >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Menu
                    className="modal-menu"
                    mode="horizontal"
                    items={[{ label: "Add task", key: "add-task" }]}
                    defaultSelectedKeys={["add-task"]}
                />

                <Input
                    size="large"
                    placeholder="Enter task's content"
                    prefix={<EditOutlined />}
                    value={taskContent}
                    maxLength={50}
                    onChange={e => setTaskContent(e.target.value)}
                />

                <DatePicker
                    onChange={(date, dateString) => { setSelectedDate(date); setTaskDateString(dateString) }}
                    allowClear={false}
                    showToday={false}
                    format="M-D-YYYY"
                    size="large"
                    placeholder={selectedDate ? "Enter task's date" : "Future task"}
                    disabled={selectedDate ? false : true}
                    value={selectedDate}
                    inputReadOnly={true}
                    disabledDate={disabledDate}
                />

                {showError && <Alert message={errorMessage} type="error" showIcon />}
            </Space>
        </Modal>
    );
}

export default TaskModal;