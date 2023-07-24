import "./AntdWarnings.js";
import Main from "./components/main/Main.jsx";
import Header from "./components/header/Header.jsx";
import { ConfigProvider, message } from "antd";
import { useState, useEffect, createContext } from "react";

export const Context = createContext();

function App() {

    //Global state for tasks storage
    const [tasks, setTasks] = useState({});
    const [tasksLoading, setTasksLoading] = useState(false);

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
    }

    //Fetching tasks on initial page load
    useEffect(() => { fetchTasks() }, []);

    return (
        <ConfigProvider
          theme={{
            token: {
                fontFamily: "Roboto",
                colorPrimary: "#a93dc7",
                textColor: "#a93dc7"
            }
          }}
        >
            <Context.Provider value={{ tasks, tasksLoading, setTasks, fetchTasks }}>
                <Header />
                <Main />
            </Context.Provider>
        </ConfigProvider>
    );
}

export default App;