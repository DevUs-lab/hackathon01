// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Input, Button, Typography, Row, Col, Card, Form } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import axios from "axios";

// const Login = () => {
//     const { Title, Paragraph } = Typography;
//     const [isLoading, setIsLoading] = useState(false);
//     const [form] = Form.useForm();
//     const navigate = useNavigate();

//     const handleSubmit = async (values) => {
//         const { email, password } = values;
//         setIsLoading(true);

//         try {
//             const res = await axios.post("http://localhost:8000/api/auth/login", {
//                 email,
//                 password,
//             });

//             // Save token to localStorage
//             localStorage.setItem("token", res.data.token);

//             window.notify("Login successful!", "success");
//             navigate("/"); // ✅ redirect after login
//         } catch (error) {
//             window.notify(error.response?.data?.msg || "Login failed", "error");
//         } finally {
//             setIsLoading(false);
//             form.resetFields();
//         }
//     };

//     const handleClose = () => {
//         navigate("/");
//     };

//     return (
//         <main className="register-page p-3 p-md-4">
//             <Card className="register-card p-2 p-md-3">
//                 <Button
//                     type="text"
//                     icon={<CloseOutlined />}
//                     onClick={handleClose}
//                     style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
//                 />
//                 <Title level={2} className="register-title">
//                     Login
//                 </Title>

//                 <Form layout="vertical" form={form} onFinish={handleSubmit}>
//                     <Row gutter={16}>
//                         <Col xs={24}>
//                             <Form.Item
//                                 name="email"
//                                 label="Email"
//                                 rules={[
//                                     { required: true, message: "Please enter your email" },
//                                     { type: "email", message: "Enter a valid email" },
//                                 ]}
//                             >
//                                 <Input placeholder="Enter your email" size="large" />
//                             </Form.Item>
//                         </Col>
//                         <Col xs={24}>
//                             <Form.Item
//                                 name="password"
//                                 label="Password"
//                                 rules={[
//                                     { required: true, message: "Please enter your password" },
//                                     { min: 6, message: "Password must be at least 6 characters" },
//                                 ]}
//                             >
//                                 <Input.Password placeholder="Enter your password" size="large" />
//                             </Form.Item>
//                         </Col>
//                         <Col span={24}>
//                             <Button
//                                 type="primary"
//                                 htmlType="submit"
//                                 block
//                                 size="large"
//                                 loading={isLoading}
//                             >
//                                 Login
//                             </Button>
//                         </Col>
//                         <Col span={12} className="text-center mt-3">
//                             <Paragraph className="mb-0 mt-1">
//                                 Don't have an account?{" "}
//                                 <Link
//                                     to="/auth/register"
//                                     style={{
//                                         color: "#1890ff",
//                                         fontWeight: "300",
//                                         textDecoration: "underline",
//                                     }}
//                                 >
//                                     Register
//                                 </Link>
//                             </Paragraph>
//                         </Col>
//                         <Col span={12} className="text-center mt-3">
//                             <Paragraph className="mb-0 mt-1">
//                                 Forgot{" "}
//                                 <Link
//                                     to="/auth/forget-password"
//                                     style={{
//                                         color: "#1890ff",
//                                         fontWeight: "300",
//                                         textDecoration: "underline",
//                                     }}
//                                 >
//                                     Password?
//                                 </Link>
//                             </Paragraph>
//                         </Col>
//                     </Row>
//                 </Form>
//             </Card>
//         </main>
//     );
// };

// export default Login;













import React, { useState } from "react";
import { Input, Button, Typography, Row, Col, Card, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Login = () => {
    const { Title } = Typography;
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/api/auth/login`, values);
            const { token, user } = res.data;
            login(user, token); // set context and localStorage
            window.notify("Login successful!", "success");
            navigate("/");
        } catch (error) {
            window.notify(error.response?.data?.msg || "Login failed", "error");
        } finally {
            setIsLoading(false);
            form.resetFields();
        }
    };

    return (
        <main className="register-page p-3 p-md-4">
            <Card className="register-card p-2 p-md-3">
                <Button type="text" icon={<CloseOutlined />} onClick={() => navigate("/")} style={{ position: "absolute", top: 16, right: 16 }} />
                <Title level={2} className="register-title">Login</Title>
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Row gutter={16}>
                        <Col xs={24}><Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}><Input placeholder="Enter your email" size="large" /></Form.Item></Col>
                        <Col xs={24}><Form.Item name="password" label="Password" rules={[{ required: true }, { min: 6 }]}><Input.Password placeholder="Enter your password" size="large" /></Form.Item></Col>
                        <Col span={24}><Button type="primary" htmlType="submit" block size="large" loading={isLoading}>Login</Button></Col>
                        <Col span={24} style={{ textAlign: "center", marginTop: 16 }}><Link to="/auth/register">Don't have an account? Register</Link></Col>
                    </Row>
                </Form>
            </Card>
        </main>
    );
};

export default Login;
