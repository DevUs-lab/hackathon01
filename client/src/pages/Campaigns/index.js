import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { getToken, getUser } from "../utils/auth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8002";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);
  const [form] = Form.useForm();

  const token = getToken();
  const user = getUser();

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/campaigns`);
      setCampaigns(res.data);
    } catch (err) {
      message.error(err.response?.data?.msg || "Error loading campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleFinish = async (values) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (editCampaign) {
        await axios.put(`${API_BASE}/api/campaigns/${editCampaign._id}`, values, { headers });
        message.success("Campaign updated");
      } else {
        await axios.post(`${API_BASE}/api/campaigns`, values, { headers });
        message.success("Campaign created");
      }
      setModalOpen(false);
      setEditCampaign(null);
      form.resetFields();
      fetchCampaigns();
    } catch (err) {
      message.error(err.response?.data?.msg || "Error saving campaign");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Campaign deleted");
      fetchCampaigns();
    } catch (err) {
      message.error(err.response?.data?.msg || "Error deleting campaign");
    }
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Description", dataIndex: "description" },
    { title: "Target Goal", dataIndex: "targetGoal" },
    {
      title: "Created By",
      render: (_, record) =>
        record.createdBy ? `${record.createdBy.firstName} ${record.createdBy.lastName}` : "N/A",
    },
    {
      title: "Actions",
      render: (_, record) => {
        if (!user) return null;
        const canManage = user.role === "admin";
        return canManage ? (
          <>
            <Button type="link" onClick={() => { setEditCampaign(record); form.setFieldsValue(record); setModalOpen(true); }}>Edit</Button>
            <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
          </>
        ) : null;
      },
    },
  ];

  return (
    <div>
      <h1>Campaigns</h1>
      {user?.role === "admin" && (
        <Button type="primary" onClick={() => setModalOpen(true)}>New Campaign</Button>
      )}
      <Table
        dataSource={campaigns}
        rowKey="_id"
        columns={columns}
        loading={loading}
        style={{ marginTop: 20 }}
      />

      <Modal
        open={modalOpen}
        title={editCampaign ? "Edit Campaign" : "New Campaign"}
        onCancel={() => { setModalOpen(false); setEditCampaign(null); form.resetFields(); }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="targetGoal" label="Target Goal" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Campaigns;
