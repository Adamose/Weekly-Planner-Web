import { useState } from "react";
import { Modal, Menu, Input, Space, Alert, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

function Account({ showAccount, setShowAccount, setButtonText }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState("login");
    const menuItems = [{ label: "Log-In", key: "login" }, { label: "Sign-Up", key: "signup" }];

    //Handler for changing request type (login / signup)
    const selectItem = (item) => { 
        setSelectedItem(item.key);
        setShowError(false);
        setError("");
        setUsername("");
        setPassword("");
    };

    //Handler for closing account modal
    const closeModal = () => {
        if (!loading) {
            setShowAccount(false);
            setShowError(false);
            setError("");
            setUsername("");
            setPassword("");
            setLoading(false);
            setSelectedItem("login");
        }
    }

    //Function to make request to server
    const submit = async () => {
        //Validating input
        if (username.length == 0) {
            setError("Please enter an username");
            setShowError(true);
            return;
        }

        if (password.length == 0) {
            setError("Please enter a password");
            setShowError(true);
            return;
        }

        if (username.indexOf(' ') >= 0 ||  password.indexOf(' ') >= 0) {
            setError("Username and password can not contain spaces");
            setShowError(true);
            return;
        }

        //Waiting for loading animation
        setLoading(true);
        await new Promise(r => setTimeout(r, 500));

        //Making request
        const response = await fetch(`https://api-weeklyplanner.adamose.com/${selectedItem}`, {
            "method": "POST",
            "headers": { "Content-Type": "application/json", "x-api-key": "ObYIVP54zf35RbJsVO1i785wLdLTiswQ2JU3MAwu" },
            "body": JSON.stringify({ "username": username, "password": password })
        });

        //Checking if response is bad
        if (response.status !== 200) {
            setLoading(false);
            setError(await response.text());
            setShowError(true);
        } else {
            //Store user info in local storage
            localStorage.setItem("JWT", "Bearer " + await response.text());
            localStorage.setItem("USERNAME", username);
            localStorage.setItem("DATE", Date.now());

            //Update state
            setLoading(false);
            setButtonText("Log-Out");
            setUsername("");
            setPassword("");
            setError("");
            setShowError(false);
            setShowAccount(false);
            
            //Waiting for closing animation
            await new Promise(r => setTimeout(r, 250));

            //Checking which message to show
            if (selectedItem === "login")
                message.info("Welcome back " + username);
            else
                message.info("Welcome " + username);
        }
    }

    return (
        <Modal
            className="accountModal"
            okText="Submit"
            centered="true"
            open={showAccount}
            confirmLoading={loading}
            onOk={submit}
            onCancel={closeModal}
        >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Menu
                  className="accountMenu"
                  mode="horizontal"
                  items={menuItems}
                  defaultSelectedKeys={[selectedItem]}
                  onSelect={selectItem}
                />

                <Input
                  className="accountInput"
                  size="large"
                  placeholder="Enter your username"
                  prefix={<UserOutlined />}
                  value={username}
                  onChange={ e => setUsername(e.target.value) }
                />

                <Input.Password
                  className="accountInput"
                  size="large"
                  placeholder="Enter your password"
                  prefix={<LockOutlined />}
                  value={password}
                  onChange={ e => setPassword(e.target.value) }
                />

                {showError && <Alert message={error} type="error" showIcon />}
            </Space>
        </Modal>
    );
}

export default Account;