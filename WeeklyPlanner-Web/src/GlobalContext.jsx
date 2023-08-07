import { useState, useEffect, createContext } from "react";
import { message, notification } from "antd";

export const Context = createContext();

//Getting start of current date
const today = new Date();
today.setHours(0,0,0,0);

function GlobalContext({ children }) {

    //Global state
    const [todaysDate] = useState(today);
    const [tasks, setTasks] = useState({});
    const [tasksLoading, setTasksLoading] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskModalDate, setTaskModalDate] = useState(undefined);
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);

    //Global function to open add task modal, optional initial date argument
    const openTaskModal = (boolean, date) => {

        //Checking if there is a user logged in
        if (localStorage.getItem("JWT") === null) {
            message.warning("Must be logged-in to use planner");
            return;
        }

        setTaskModalDate(date);
        setShowTaskModal(boolean);
    };

    //Global function for fetching all tasks from an account
    const fetchTasks = async () => {

        //Checking if there is a user logged in
        if (localStorage.getItem("JWT") === null) return;

        setTasksLoading(true);

        //Creating loading message
        message.loading({
            type: 'loading',
            content: 'Fetching tasks',
            duration: 0,
            key: "loadingMessage"
        });

        try {

            //Making request
            const response = await fetch(`https://api-weeklyplanner.adamose.com/tasks`, {
                "method": "GET",
                "headers": { "Authorization": localStorage.getItem("JWT"), "x-api-key": "ObYIVP54zf35RbJsVO1i785wLdLTiswQ2JU3MAwu" }
            });

            //Invalid token or deleted account, sign out user
            if (response.status !== 200) {
                localStorage.clear();
                location.reload();
            } else {
                const body = await response.json();

                //Half a second buffer to allow loading animations to not close instantly
                await new Promise(r => setTimeout(r, 500));
                message.destroy("loadingMessage");
                setTasks(body.tasks);
                setTasksLoading(false);
            }

        } catch (error) {
            setTasksLoading(false);
            message.destroy("loadingMessage");
            notifyFailedRequest();
        }
    };

    //Global function for deleting a task from an account
    const deleteTask = async (taskId, taskContent) => {

        //Checking if there is a user logged in
        if (localStorage.getItem("JWT") === null) return;

        //Removing task from UI
        const updatedTasks = { ...tasks };
        delete updatedTasks[taskId];
        setTasks(updatedTasks);

        deleteRequest(taskId, taskContent);
    };

    //Global function for deleting all tasks in a day
    const deleteTasks = async (dateString) => {

        //Checking if there is a user logged in
        if (localStorage.getItem("JWT") === null) {
            message.warning("Must be logged-in to use planner");
            return;
        }

        const updatedTasks = { ...tasks };

        //Looping through all tasks and deleting the ones who date matches the supplied date
        for (const [taskId, task] of Object.entries(tasks)) {
            if (task.date === dateString) {
                delete updatedTasks[taskId];
                deleteRequest(taskId, task.content);
            }
        }

        //Removing tasks from UI
        setTasks(updatedTasks);
    };

    //Global function used to notify user of failed connection
    const notifyFailedRequest = async () => {
        notification.error({
            message: "Failed server connection!",
            description: "Could not make request to server, verify internet connection or contact Adam about server outage.",
            placement: "top"
        });
    };

    //Local helper function to make request to delete task from database
    const deleteRequest = async (taskId, taskContent) => {
        try {

            //Function assumes caller has already checked that a user is logged in
            const response = await fetch(`https://api-weeklyplanner.adamose.com/task/?id=${taskId}`, {
                "method": "DELETE",
                "headers": { "Authorization": localStorage.getItem("JWT"), "x-api-key": "ObYIVP54zf35RbJsVO1i785wLdLTiswQ2JU3MAwu" }
            });

            //Invalid taskId or server error
            if (response.status !== 200)
                message.error(`Failed to delete task: ${taskContent}`, 2);

        } catch (error) {
            notifyFailedRequest();
        }
    };

    //Fetching tasks on initial load
    useEffect(() => { fetchTasks() }, []);

    const exports = {
        tasks, tasksLoading, setTasks, fetchTasks, deleteTask, deleteTasks, showTaskModal,
        openTaskModal, taskModalDate, notifyFailedRequest, isPlannerOpen, setIsPlannerOpen,
        todaysDate
    };

    return (
        <Context.Provider value={exports}>
            {children}
        </Context.Provider>
    );
}

export default GlobalContext;