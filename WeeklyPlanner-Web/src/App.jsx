import './AntdWarnings.js';
import DayContainer from './components/DayContainer.jsx';
import Header from './components/header/Header.jsx';
import { ConfigProvider } from 'antd';

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
            <Header />
            <DayContainer />
        </ConfigProvider>
    );
}

export default App;