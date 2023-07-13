import { useState } from "react";
import { Modal, Menu, Input, Space, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons"

function Account({ showAccount, setShowAccount, setText }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState("login");
    const menuItems = [{ label: "Log-In", key: "login" }, { label: "Sign-Up", key: "signup" }];

    const selectItem = (item) => { 
        setSelectedItem(item.key);
        setShowError(false);
        setError("");
    };

    const closeModal = () => {
        if (!loading) {
            setShowAccount(false);
            setShowError(false);
            setError("");
            setUsername("");
            setPassword("");
        }
    }

    //Function to make request to server
    const submit = async () => {
        setLoading(true);

        //Waiting for submit animation
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
            localStorage.setItem("JWT", "Bearer " + await response.text());
            localStorage.setItem("DATE", Date.now());
            setLoading(false);
            setText(username);
            setUsername("");
            setPassword("");
            setError("");
            setShowAccount(false);
            setShowError(false);
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

export default Account