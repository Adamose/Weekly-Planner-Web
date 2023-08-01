import "./CustomConsole.js";
import Main from "./components/main/Main.jsx";
import Header from "./components/header/Header.jsx";
import GlobalContext from "./GlobalContext.jsx";
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
            <GlobalContext>
                <Header />
                <Main />
            </GlobalContext>
        </ConfigProvider>
    );
}

export default App;