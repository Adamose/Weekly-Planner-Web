import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//Verifying if there is a JWT stored in localStorage that is outdated (older than a week)
if (localStorage.getItem("DATE") !== null) {
    if (Date.now() - parseInt(localStorage.getItem("DATE")) > 604800000)
        localStorage.clear();
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />,);