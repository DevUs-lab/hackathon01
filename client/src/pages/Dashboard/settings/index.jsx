// src/pages/dashboard/Setting.jsx
import React, { useState } from "react";
import { Card, Typography, Divider, Switch, Button, Form, Input, message } from "antd";

const { Title } = Typography;

const Setting = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSave = () => {
        message.success("Settings saved!");
    };

    const handleChangePassword = async (values) => {
        setLoading(true);
        try {
            // Replace with actual API call
            // await axios.put(`${API_BASE}/api/users/change-password`, values, { headers });
            console.log('Changing password:', values);
            message.success("Password changed successfully!");
            form.resetFields();
        } catch (err) {
            console.error(err);
            message.error("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <Title level={2}>Settings</Title>
            <Divider />
            <div style={{ marginBottom: 24 }}>
                <div>
                    <strong>Dark Mode</strong>
                    <br />
                    <Switch checked={darkMode} onChange={setDarkMode} />
                </div>
                <Divider />
                <div>
                    <strong>Enable Notifications</strong>
                    <br />
                    <Switch checked={notifications} onChange={setNotifications} />
                </div>
                <Divider />
                <Button type="primary" onClick={handleSave}>
                    Save Settings
                </Button>
            </div>

            <Divider />
            <Title level={3}>Change Password</Title>
            <Form layout="vertical" form={form} onFinish={handleChangePassword}>
                <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[{ required: true, message: "Please enter your current password" }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[{ required: true }, { min: 6 }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update Password
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Setting;