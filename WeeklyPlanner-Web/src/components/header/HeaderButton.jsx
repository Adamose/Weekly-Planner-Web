import { useState } from 'react';
import { Button } from 'antd'
import Account from './Account.jsx'

function HeaderButton() {

    const [text, setText] = useState("Log-In / Sign-Up");
    const [showAccount, setShowAccount] = useState(false);
    const openAccount = () => setShowAccount(true);

    return (
        <>
            <Button className="headerButton" type="primary" size="large" onClick={openAccount}>{text}</Button>
            <Account showAccount={showAccount} setShowAccount={setShowAccount} setText={setText} />
        </>
    );
}

export default HeaderButton