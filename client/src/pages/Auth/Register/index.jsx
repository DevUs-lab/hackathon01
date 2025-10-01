// import React, { useState } from "react";
// import { Input, Button, Typography, Row, Col, Card, Form } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { CloseOutlined } from "@ant-design/icons";
// import axios from "axios";

// const Register = () => {
//     const { Title, Paragraph } = Typography;
//     const [isLoading, setIsLoading] = useState(false);
//     const [form] = Form.useForm();
//     const navigate = useNavigate();

//     const handleSubmit = async (values) => {
//         const { firstName, lastName, email, password, confirmPassword } = values;

//         if (password !== confirmPassword) {
//             window.notify("Passwords do not match", "error");
//             return;
//         }

//         setIsLoading(true);

//         try {
//             await axios.post("http://localhost:8000/api/auth/register", {
//                 firstName,
//                 lastName,
//                 email,
//                 password,
//             });

//             window.notify("Registration successful!", "success");
//             form.resetFields();
//             navigate("/auth/login"); // ✅ after register go to login page
//         } catch (error) {
//             window.notify(
//                 error.response?.data?.msg || "Registration failed",
//                 "error"
//             );
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleClose = () => {
//         navigate("/");
//     };

//     return (
//         <main className="register-page p-3 p-md-4">
//             <Card className="register-card p-3 p-md-4">
//                 <Button
//                     type="text"
//                     icon={<CloseOutlined />}
//                     onClick={handleClose}
//                     style={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}
//                 />

//                 <Title level={2} className="text-center">
//                     Create Account
//                 </Title>
//                 <Form layout="vertical" form={form} onFinish={handleSubmit}>
//                     <Row gutter={16}>
//                         <Col xs={24} md={12}>
//                             <Form.Item
//                                 name="firstName"
//                                 label="First Name"
//                                 rules={[{ required: true, message: "Please enter your first name" }]}
//                             >
//                                 <Input placeholder="Enter your first name" size="large" />
//                             </Form.Item>
//                         </Col>
//                         <Col xs={24} md={12}>
//                             <Form.Item name="lastName" label="Last Name">
//                                 <Input placeholder="Enter your last name" size="large" />
//                             </Form.Item>
//                         </Col>
//                         <Col xs={24}>
//                             <Form.Item
//                                 name="email"
//                                 label="Email"
//                                 rules={[
//                                     { required: true, message: "Please enter your email" },
//                                     { type: "email", message: "Invalid email format" },
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
//                         <Col xs={24}>
//                             <Form.Item
//                                 name="confirmPassword"
//                                 label="Confirm Password"
//                                 rules={[
//                                     { required: true, message: "Please confirm your password" },
//                                     { min: 6, message: "Password must be at least 6 characters" },
//                                 ]}
//                             >
//                                 <Input.Password placeholder="Confirm your password" size="large" />
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
//                                 Register
//                             </Button>
//                         </Col>
//                         <Col span={24} style={{ textAlign: "center", marginTop: "16px" }}>
//                             <Paragraph className="mb-0 mt-1">
//                                 Already have an account?{" "}
//                                 <Link
//                                     to="/auth/login"
//                                     style={{
//                                         color: "#1890ff",
//                                         fontWeight: "500",
//                                         textDecoration: "underline",
//                                     }}
//                                 >
//                                     Login
//                                 </Link>
//                             </Paragraph>
//                         </Col>
//                     </Row>
//                 </Form>
//             </Card>
//         </main>
//     );
// };

// export default Register;










import React, { useState } from "react";
import { Input, Button, Typography, Row, Col, Card, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Register = () => {
    const { Title } = Typography;
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const { firstName, lastName, email, password, confirmPassword } = values;

        // Client-side validation
        if (password !== confirmPassword) {
            window.notify("Passwords do not match", "error");
            return;
        }

        if (password.length < 6) {
            window.notify("Password must be at least 6 characters", "error");
            return;
        }

        setIsLoading(true);

        try {
            console.log("Sending registration request..."); // Debug log

            const response = await axios.post(`${API_BASE}/api/auth/register`, {
                firstName: firstName.trim(),
                lastName: lastName?.trim() || "",
                email: email.trim().toLowerCase(),
                password: password
            });

            console.log("Registration response:", response.data); // Debug log

            window.notify("Registration successful!", "success");
            form.resetFields();
            navigate("/auth/login");

        } catch (error) {
            console.error("Registration error details:", error); // Detailed error log

            const errorMessage = error.response?.data?.msg ||
                error.response?.data?.error ||
                "Registration failed. Please try again.";

            window.notify(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="register-page p-3 p-md-4">
            <Card className="register-card p-3 p-md-4">
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => navigate("/")}
                    style={{ position: "absolute", top: 16, right: 16 }}
                />
                <Title level={2} className="text-center">Create Account</Title>

                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[{ required: true, message: "Please enter your first name" }]}
                            >
                                <Input placeholder="Enter your first name" size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item name="lastName" label="Last Name">
                                <Input placeholder="Enter your last name" size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: "Please enter your email" },
                                    { type: "email", message: "Invalid email format" }
                                ]}
                            >
                                <Input placeholder="Enter your email" size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: "Please enter your password" },
                                    { min: 6, message: "Password must be at least 6 characters" }
                                ]}
                            >
                                <Input.Password placeholder="Enter your password" size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                rules={[
                                    { required: true, message: "Please confirm your password" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Passwords do not match');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Confirm your password" size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={isLoading}
                            >
                                Register
                            </Button>
                        </Col>
                        <Col span={24} style={{ textAlign: "center", marginTop: 16 }}>
                            <Link to="/auth/login">Already have an account? Login</Link>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </main>
    );
};

export default Register;