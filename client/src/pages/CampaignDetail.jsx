import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await API.get(`/campaigns/${id}`);
                setCampaign(res.data);
            } catch (err) {
                console.error("Error fetching campaign:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id]);

    const handleDonate = async (e) => {
        e.preventDefault();
        try {
            if (!user) {
                setMessage("Please login to donate.");
                return;
            }
            const res = await API.post("/donations", { campaignId: id, amount: Number(amount) });
            setMessage("Donation successful! 🎉");
            setCampaign((prev) => ({
                ...prev,
                raisedAmount: prev.raisedAmount + Number(amount),
            }));
            setAmount("");
        } catch (err) {
            console.error("Donation error:", err);
            setMessage("Error donating. Please try again.");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading campaign...</div>;
    if (!campaign) return <div className="text-center mt-5">Campaign not found</div>;

    const progress = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2>{campaign.title}</h2>
                    <p>{campaign.description}</p>
                    <p>
                        <strong>Category:</strong> {campaign.category}
                    </p>

                    <div className="mb-3">
                        <div className="progress" style={{ height: "10px" }}>
                            <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                        <small>
                            ${campaign.raisedAmount} / ${campaign.goalAmount}
                        </small>
                    </div>

                    {/* Donation form */}
                    {user?.role === "donor" ? (
                        <form onSubmit={handleDonate}>
                            <div className="mb-3">
                                <label className="form-label">Donation Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Donate</button>
                        </form>
                    ) : (
                        <p className="text-muted">Only donors can donate to campaigns.</p>
                    )}

                    {message && <div className="alert alert-info mt-3">{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
