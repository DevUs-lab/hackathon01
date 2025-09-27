import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Typography, Row, Col, Card, Form, message } from 'antd';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../../config/firebase';
import { CloseOutlined } from '@ant-design/icons'; // Added close icon


const ForgetPassword = () => {
    const { Title, Paragraph } = Typography;
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        const { email } = values;

        setIsLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                message.success('Password reset email sent! Check your inbox.');
                form.resetFields();
            })
            .catch((error) => {
                let errorMessage = "Password reset failed";
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = "No account found with this email";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "Invalid email format";
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = "Too many attempts. Try again later";
                        break;
                    default:
                        console.error("Password reset error:", error);
                }
                message.error(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleClose = () => { navigate('/') }

    return (
        <main className="register-page p-2 p-md-3">
            <Card className="register-card p-2 p-md-3">
                <Button type="text" icon={<CloseOutlined />} onClick={handleClose} style={{ position: 'absolute', top: 16, right: 16, zIndex: 1, border: 'none' }} />

                <Title level={2} className="register-title">Forgot Password</Title>

                <Form layout='vertical' form={form} onFinish={handleSubmit}>
                    <Row gutter={16}>
                        <Col xs={24}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Enter a valid email' }
                                ]}
                            >
                                <Input placeholder="Enter your email" size="large" />
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
                                Send Reset Link
                            </Button>
                        </Col>

                        <Col span={24} className='text-center mt-3'>
                            <Paragraph className='mb-0 mt-1'>
                                Remember your password?{' '}
                                <Link
                                    to="/auth/login"
                                    style={{
                                        color: '#1890ff',
                                        fontWeight: '500',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Login
                                </Link>
                            </Paragraph>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </main>
    );
};

export default ForgetPassword;