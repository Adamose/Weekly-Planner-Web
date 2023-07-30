import { Context } from "../../TasksContext.jsx"
import AccountModal from "./AccountModal.jsx";
import { Button, message } from "antd";
import { useState, useLayoutEffect, useContext } from "react";

function HeaderButton() {

    const [buttonText, setButtonText] = useState("Log-In / Sign-Up");
    const [showAccountModal, setShowAccountModal] = useState(false);
    const { setTasks } = useContext(Context);

    //Checking if a user is already logged in
    useLayoutEffect(() => {
        if (localStorage.getItem("USERNAME")) {
            message.info("Welcome back " + localStorage.getItem("USERNAME"));
            setButtonText("Log-Out");
        } else {
            setButtonText("Log-In / Sign-Up");
        }
    }, []);

    //Handler for button click
    const handleClick = () => {
        if (buttonText !== "Log-Out") {
            //Opening account modal
            setShowAccountModal(true);
        } else {
            //Logging user out
            setTasks({});
            setButtonText("Log-In / Sign-Up");
            message.info("See you soon " + localStorage.getItem("USERNAME"));
            localStorage.clear();
        }
    };

    return (
        <>
            <Button className="header-button" type="primary" size="large" onClick={handleClick}>{buttonText}</Button>
            <AccountModal showAccountModal={showAccountModal} setShowAccountModal={setShowAccountModal} setButtonText={setButtonText} />
        </>
    );
}

export default HeaderButton;