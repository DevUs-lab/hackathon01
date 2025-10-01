import React, { useEffect, useState } from "react";
import API from "../api/api"; // This should point to your frontend api.js
import { Card, Button, InputNumber, Typography, Progress } from "antd";
import { useAuthContext } from "../contexts/Auth";

const { Title } = Typography;

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { user } = useAuthContext();
    const [donateAmounts, setDonateAmounts] = useState({});

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await API.get("/campaigns");
                setCampaigns(res.data);
            } catch (err) {
                console.error("Failed to fetch campaigns:", err);
                window.notify("Failed to load campaigns", "error");
            }
        };
        fetchCampaigns();
    }, []);

    const handleDonate = async (campaignId) => {
        const amount = donateAmounts[campaignId];
        if (!amount || amount <= 0) {
            window.notify("Enter a valid amount", "error");
            return;
        }

        try {
            await API.post("/donations", {
                campaignId,
                amount,
                anonymous: false
            });
            window.notify("Donation successful!", "success");

            // Refresh campaigns to update raised amount
            const res = await API.get("/campaigns");
            setCampaigns(res.data);
            setDonateAmounts(prev => ({ ...prev, [campaignId]: "" }));

        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.msg || "Donation failed";
            window.notify(msg, "error");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Title level={2}>Active Campaigns</Title>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
                {campaigns.map((c) => (
                    <Card key={c._id} title={c.title} style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                        <p>{c.description}</p>
                        <p><strong>Category:</strong> {c.category}</p>
                        <p><strong>Goal:</strong> ${c.targetGoal}</p>
                        <p><strong>Raised:</strong> ${c.raisedAmount || 0}</p>

                        <Progress
                            percent={Math.round(((c.raisedAmount || 0) / c.targetGoal) * 100)}
                            style={{ margin: "10px 0" }}
                        />

                        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                            <InputNumber
                                min={1}
                                value={donateAmounts[c._id]}
                                onChange={(v) => setDonateAmounts(s => ({ ...s, [c._id]: v }))}
                                placeholder="Amount"
                                style={{ width: "120px" }}
                            />
                            <Button
                                type="primary"
                                onClick={() => handleDonate(c._id)}
                                disabled={!user}
                            >
                                {user ? "Donate" : "Login to Donate"}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CampaignList;