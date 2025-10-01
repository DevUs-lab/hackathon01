// src/components/CreateCampaign.jsx
import React, { useState, useContext } from "react";
import { Form, Input, Button, Card } from "antd";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const CreateCampaign = ({ onCreated }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const onFinish = async (values) => {
        if (!user) return alert("Login required");
        setLoading(true);
        try {
            const body = {
                title: values.title,
                description: values.description,
                targetGoal: values.goalAmount, // Your backend uses targetGoal, not goalAmount
                category: values.category
            };
            const res = await API.post("/campaigns", body);
            alert("Campaign created");
            form.resetFields();
            if (onCreated) onCreated(res.data);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error creating campaign");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ maxWidth: 800, margin: "12px auto" }}>
            <h3>Create Campaign</h3>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Input placeholder='health | education | disaster | others' />
                </Form.Item>
                <Form.Item name="goalAmount" label="Goal Amount" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Create</Button>
            </Form>
        </Card>
    );
};

export default CreateCampaign;
