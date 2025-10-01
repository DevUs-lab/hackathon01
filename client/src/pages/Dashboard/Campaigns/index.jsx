import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth";
import { List, Button, Modal, Input, message } from "antd";

const Campaigns = () => {
    const { user } = useAuthContext();
    const API = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const token = localStorage.getItem("token");

    const [campaigns, setCampaigns] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newCampaign, setNewCampaign] = useState({ title: "", description: "", targetGoal: 0 });

    const fetchCampaigns = async () => {
        try {
            const res = await axios.get(`${API}/api/campaigns`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCampaigns(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user?.role === "admin") fetchCampaigns();
    }, [user]);

    const createCampaign = async () => {
        try {
            const res = await axios.post(`${API}/api/campaigns`, newCampaign, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCampaigns([res.data, ...campaigns]);
            setModalOpen(false);
            message.success("Campaign created");
        } catch (err) {
            message.error(err.response?.data?.msg || "Failed to create campaign");
        }
    };

    const deleteCampaign = async (id) => {
        try {
            await axios.delete(`${API}/api/campaigns/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCampaigns(campaigns.filter(c => c._id !== id));
            message.success("Campaign deleted");
        } catch (err) {
            message.error("Delete failed");
        }
    };

    return (
        <div>
            <h2>Campaigns (Admin Only)</h2>
            <Button type="primary" onClick={() => setModalOpen(true)}>New Campaign</Button>

            <List
                style={{ marginTop: "20px" }}
                bordered
                dataSource={campaigns}
                renderItem={c => (
                    <List.Item
                        actions={[
                            <Button type="link" danger onClick={() => deleteCampaign(c._id)}>Delete</Button>
                        ]}
                    >
                        <strong>{c.title}</strong> - {c.description} | Goal: ${c.targetGoal} | Raised: ${c.raisedAmount}
                    </List.Item>
                )}
            />

            <Modal
                title="Create Campaign"
                open={modalOpen}
                onOk={createCampaign}
                onCancel={() => setModalOpen(false)}
            >
                <Input
                    placeholder="Title"
                    value={newCampaign.title}
                    onChange={e => setNewCampaign(prev => ({ ...prev, title: e.target.value }))}
                    style={{ marginBottom: "8px" }}
                />
                <Input
                    placeholder="Description"
                    value={newCampaign.description}
                    onChange={e => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                    style={{ marginBottom: "8px" }}
                />
                <Input
                    type="number"
                    placeholder="Target Goal"
                    value={newCampaign.targetGoal}
                    onChange={e => setNewCampaign(prev => ({ ...prev, targetGoal: Number(e.target.value) }))}
                />
            </Modal>
        </div>
    );
};

export default Campaigns;
