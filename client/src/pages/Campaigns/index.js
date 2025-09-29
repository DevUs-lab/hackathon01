// src/pages/Campaigns.jsx
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/Auth";
import { Table, Button, Modal, Input, Select, Form, message } from "antd";

const { Option } = Select;

const Campaigns = () => {
  const { token, user } = useAuthContext();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/campaigns");
      const data = await res.json();
      setCampaigns(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateOrUpdate = async (values) => {
    try {
      setLoading(true);
      const url = editCampaign
        ? `http://localhost:8000/api/campaigns/${editCampaign._id}`
        : "http://localhost:8000/api/campaigns";
      const method = editCampaign ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (editCampaign) {
        message.success("Campaign updated successfully!");
      } else {
        message.success("Campaign created successfully!");
      }

      setModalOpen(false);
      setEditCampaign(null);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      message.error("Error creating/updating campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/campaigns/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Campaign deleted!");
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      message.error("Error deleting campaign");
    }
  };

  return (
    <div className="container mt-4">
      <h1>NGO Campaigns</h1>
      {token && (
        <Button type="primary" onClick={() => setModalOpen(true)} className="mb-3">
          Add Campaign
        </Button>
      )}

      <Table
        dataSource={campaigns.map(c => ({ ...c, key: c._id }))}
        columns={[
          { title: "Title", dataIndex: "title" },
          { title: "Description", dataIndex: "description" },
          { title: "Target Goal", dataIndex: "targetGoal" },
          { title: "Raised Amount", dataIndex: "raisedAmount" },
          { title: "Category", dataIndex: "category" },
          {
            title: "Actions",
            render: (_, record) =>
              token && (user._id === record.createdBy._id || user.role === "admin") && (
                <>
                  <Button
                    type="link"
                    onClick={() => {
                      setEditCampaign(record);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button type="link" danger onClick={() => handleDelete(record._id)}>
                    Delete
                  </Button>
                </>
              ),
          },
        ]}
      />

      <Modal
        title={editCampaign ? "Edit Campaign" : "Add Campaign"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditCampaign(null);
        }}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editCampaign || { category: "Other" }}
          onFinish={handleCreateOrUpdate}
        >
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Target Goal" name="targetGoal" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Option value="Health">Health</Option>
              <Option value="Education">Education</Option>
              <Option value="Relief">Relief</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editCampaign ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Campaigns;
