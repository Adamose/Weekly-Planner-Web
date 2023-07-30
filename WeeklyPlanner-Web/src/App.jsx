import "./AntdWarnings.js";
import Main from "./components/main/Main.jsx";
import Header from "./components/header/Header.jsx";
import TasksContext from "./TasksContext.jsx";
import { ConfigProvider } from "antd";

function App() {
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
            <TasksContext>
                <Header />
                <Main />
            </TasksContext>
        </ConfigProvider>
    );
}

export default App;