import { useState, useLayoutEffect } from 'react';
import { Button, message } from 'antd';
import Account from './Account.jsx';

function HeaderButton() {

    const [buttonText, setButtonText] = useState("Log-In / Sign-Up");
    const [showAccount, setShowAccount] = useState(false);

    //Checking which user is already logged in
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
            setShowAccount(true);
        } else {
            //Logging user out
            setButtonText("Log-In / Sign-Up");
            message.info("See you soon " + localStorage.getItem("USERNAME"));
            localStorage.clear();
        }
    };

    return (
        <>
            <Button className="headerButton" type="primary" size="large" onClick={handleClick}>{buttonText}</Button>
            <Account showAccount={showAccount} setShowAccount={setShowAccount} setButtonText={setButtonText} />
        </>
    );
}

export default HeaderButton;