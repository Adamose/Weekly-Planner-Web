import { Context } from "../../GlobalContext.jsx"
import { Modal, Menu, Input, Space, Alert, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";

function AccountModal({ showAccountModal, setShowAccountModal, setButtonText }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState("login");
    const menuItems = [{ label: "Log-In", key: "login" }, { label: "Sign-Up", key: "signup" }];
    const { fetchTasks, notifyFailedRequest } = useContext(Context);

    //Handler for changing request type (login / signup)
    const selectItem = (item) => {
        setSelectedItem(item.key);
        setShowError(false);
        setErrorMessage("");
        setUsername("");
        setPassword("");
    };

    //Handler for closing account modal
    const closeModal = () => {
        if (!loading) {
            setShowAccountModal(false);
            setShowError(false);
            setErrorMessage("");
            setUsername("");
            setPassword("");
            setLoading(false);
            setSelectedItem("login");
        }
    };

    //Function to make request to server
    const submit = async () => {

        //Validating input
        if (username.length === 0) {
            setErrorMessage("Please enter an username");
            setShowError(true);
            return;
        }

        if (password.length === 0) {
            setErrorMessage("Please enter a password");
            setShowError(true);
            return;
        }

        if (username.indexOf(' ') >= 0 || password.indexOf(' ') >= 0) {
            setErrorMessage("Username and password can not contain spaces");
            setShowError(true);
            return;
        }

        //Waiting for loading animation
        setLoading(true);
        await new Promise(r => setTimeout(r, 500));

        try {

            //Making request
            const response = await fetch(`https://api-weeklyplanner.adamose.com/${selectedItem}`, {
                "method": "POST",
                "headers": { "Content-Type": "application/json", "x-api-key": "ObYIVP54zf35RbJsVO1i785wLdLTiswQ2JU3MAwu" },
                "body": JSON.stringify({ "username": username, "password": password })
            });

            //Checking if response is bad
            if (response.status !== 200) {
                setLoading(false);
                setErrorMessage(await response.text());
                setShowError(true);
            } else {
                //Store user info in local storage
                localStorage.setItem("JWT", "Bearer " + await response.text());
                localStorage.setItem("USERNAME", username);
                localStorage.setItem("DATE", Date.now());

                //Update state
                setButtonText("Log-Out");
                closeModal();

                //Waiting for closing animation
                await new Promise(r => setTimeout(r, 250));

                //Checking which message to show and if to fetchTasks
                if (selectedItem === "login") {
                    message.info("Welcome back " + username);
                    fetchTasks();
                } else {
                    message.info("Welcome " + username);
                }
            }

        } catch (error) {
            notifyFailedRequest();
        }
    };

    return (
        <Modal
            okText="Submit"
            centered="true"
            open={showAccountModal}
            confirmLoading={loading}
            onOk={submit}
            onCancel={closeModal}
        >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Menu
                    className="modal-menu"
                    mode="horizontal"
                    items={menuItems}
                    defaultSelectedKeys={[selectedItem]}
                    onSelect={selectItem}
                />

                <Input
                    size="large"
                    placeholder="Enter your username"
                    prefix={<UserOutlined />}
                    value={username}
                    maxLength={20}
                    onChange={e => setUsername(e.target.value)}
                />

                <Input.Password
                    size="large"
                    placeholder="Enter your password"
                    prefix={<LockOutlined />}
                    value={password}
                    maxLength={20}
                    onChange={e => setPassword(e.target.value)}
                />

                {showError && <Alert message={errorMessage} type="error" showIcon />}
            </Space>
        </Modal>
    );
}

export default AccountModal;