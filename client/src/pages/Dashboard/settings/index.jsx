// import React, { useState } from 'react';
// import { Typography, Switch, Divider, Card, Button, message, Form, Input } from 'antd';
// import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
// import { auth } from '../../../config/firebase';

// const { Title, Paragraph, Text } = Typography;

// const Setting = () => {
//     const [darkMode, setDarkMode] = useState(false);
//     const [notifications, setNotifications] = useState(true);
//     const [loading, setLoading] = useState(false);

//     // Password change state
//     const [form] = Form.useForm();

//     const handleSave = () => {
//         message.success('Settings saved successfully!');
//         console.log({ darkMode, notifications });
//     };

//     const handleChangePassword = async (values) => {
//         const user = auth.currentUser;
//         const { currentPassword, newPassword } = values;

//         if (!user) return message.error('No user is logged in.');

//         setLoading(true);
//         try {
//             // Reauthenticate first
//             const credential = EmailAuthProvider.credential(user.email, currentPassword);
//             await reauthenticateWithCredential(user, credential);

//             // Update password
//             await updatePassword(user, newPassword);

//             message.success('Password changed successfully!');
//             form.resetFields();
//         } catch (error) {
//             console.error(error);
//             if (error.code === 'auth/wrong-password') {
//                 message.error('Incorrect current password.');
//             } else {
//                 message.error('Failed to change password.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Card>
//             <Title level={2}>Settings</Title>
//             <Paragraph>You can update your preferences and account password here.</Paragraph>

//             <Divider />

//             {/* Preferences */}
//             <div style={{ marginBottom: 24 }}>
//                 <Text strong>Dark Mode</Text>
//                 <br />
//                 <Switch checked={darkMode} onChange={setDarkMode} />

//                 <Divider />

//                 <Text strong>Enable Notifications</Text>
//                 <br />
//                 <Switch checked={notifications} onChange={setNotifications} />

//                 <Divider />

//                 <Button type="primary" onClick={handleSave}>
//                     Save Settings
//                 </Button>
//             </div>

//             {/* Change Password */}
//             <Divider />
//             <Title level={3}>Change Password</Title>
//             <Form layout="vertical" form={form} onFinish={handleChangePassword}>
//                 <Form.Item
//                     label="Current Password"
//                     name="currentPassword"
//                     rules={[{ required: true, message: 'Please enter your current password' }]}
//                 >
//                     <Input.Password />
//                 </Form.Item>

//                 <Form.Item
//                     label="New Password"
//                     name="newPassword"
//                     rules={[
//                         { required: true, message: 'Please enter a new password' },
//                         { min: 6, message: 'Password must be at least 6 characters' }
//                     ]}
//                 >
//                     <Input.Password />
//                 </Form.Item>

//                 <Form.Item>
//                     <Button type="primary" htmlType="submit" loading={loading}>
//                         Update Password
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </Card>
//     );
// };

// export default Setting;




import React, { useState } from "react";
import { Card, Typography, Divider, Switch, Button, Form, Input, message } from "antd";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
const { Title } = Typography;

const Setting = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [loading, setLoading] = useState(false);
    const { token } = useAuthContext();
    const [form] = Form.useForm();

    const handleSave = () => {
        message.success("Settings saved!");
    };

    const handleChangePassword = async (values) => {
        setLoading(true);
        try {
            await axios.put(`${API_BASE}/api/users/change-password`, values, { headers: { Authorization: `Bearer ${token}` } });
            message.success("Password changed successfully!");
            form.resetFields();
        } catch (err) {
            console.error(err);
            message.error(err.response?.data?.msg || "Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <Title level={2}>Settings</Title>
            <Divider />
            <div style={{ marginBottom: 24 }}>
                <div><strong>Dark Mode</strong><br /><Switch checked={darkMode} onChange={setDarkMode} /></div>
                <Divider />
                <div><strong>Enable Notifications</strong><br /><Switch checked={notifications} onChange={setNotifications} /></div>
                <Divider />
                <Button type="primary" onClick={handleSave}>Save Settings</Button>
            </div>

            <Divider />
            <Title level={3}>Change Password</Title>
            <Form layout="vertical" form={form} onFinish={handleChangePassword}>
                <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true, message: "Please enter your current password" }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="New Password" name="newPassword" rules={[{ required: true }, { min: 6 }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Update Password</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Setting;
