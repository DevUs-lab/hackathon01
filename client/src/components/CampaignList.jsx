// src/components/CampaignList.jsx
import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { Card, Button, InputNumber } from "antd";
import { AuthContext } from "../context/AuthContext";

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { token } = useContext(AuthContext);
    const [donateAmounts, setDonateAmounts] = useState({});

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await API.get("/campaigns");
                setCampaigns(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCampaigns();
    }, []);

    const handleDonate = async (campaignId) => {
        const amount = donateAmounts[campaignId];
        if (!amount || amount <= 0) return alert("Enter a valid amount");

        try {
            await API.post("/donations", { campaignId, amount });
            alert("Donation successful");
            // update local UI: increment raisedAmount locally (simple)
            setCampaigns((prev) => prev.map(c => c._id === campaignId ? { ...c, raisedAmount: (c.raisedAmount || 0) + Number(amount) } : c));
            setDonateAmounts((p) => ({ ...p, [campaignId]: "" }));
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "Donation failed";
            alert(msg);
        }
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {campaigns.map((c) => (
                <Card key={c._id} title={c.title}>
                    <p>{c.description}</p>
                    <p>Category: {c.category}</p>
                    <p>Goal: {c.goalAmount}</p>
                    <p>Raised: {c.raisedAmount || 0}</p>
                    <div style={{ display: "flex", gap: 8 }}>
                        <InputNumber min={1} value={donateAmounts[c._id]} onChange={(v) => setDonateAmounts(s => ({ ...s, [c._id]: v }))} />
                        <Button onClick={() => handleDonate(c._id)} disabled={!token}>Donate</Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default CampaignList;
