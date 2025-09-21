import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const NGODashboard = () => {
    const { user } = useContext(AuthContext);
    const [campaigns, setCampaigns] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", goalAmount: "" });
    const [editingId, setEditingId] = useState(null);

    // Fetch campaigns created by logged-in NGO
    const fetchCampaigns = async () => {
        try {
            const res = await API.get("/campaigns");
            // Filter only NGO's campaigns
            const myCampaigns = res.data.filter((c) => c.createdBy._id === user._id);
            setCampaigns(myCampaigns);
        } catch (err) {
            console.error("Error fetching campaigns:", err);
        }
    };

    useEffect(() => {
        if (user?.role === "ngo") {
            fetchCampaigns();
        }
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Create or Update campaign
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/campaigns/${editingId}`, form);
            } else {
                await API.post("/campaigns", form);
            }
            setForm({ title: "", description: "", goalAmount: "" });
            setEditingId(null);
            fetchCampaigns();
        } catch (err) {
            console.error("Error saving campaign:", err);
        }
    };

    // Edit
    const handleEdit = (campaign) => {
        setForm({
            title: campaign.title,
            description: campaign.description,
            goalAmount: campaign.goalAmount,
        });
        setEditingId(campaign._id);
    };

    // Delete
    const handleDelete = async (id) => {
        try {
            await API.delete(`/campaigns/${id}`);
            fetchCampaigns();
        } catch (err) {
            console.error("Error deleting campaign:", err);
        }
    };

    return (
        <div className="container mt-5">
            <h2>NGO Dashboard</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
                <h5>{editingId ? "Edit Campaign" : "Create New Campaign"}</h5>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Goal Amount</label>
                    <input
                        type="number"
                        name="goalAmount"
                        value={form.goalAmount}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editingId ? "Update Campaign" : "Create Campaign"}
                </button>
            </form>

            {/* Campaign List */}
            <h4>My Campaigns</h4>
            {campaigns.length === 0 ? (
                <p>No campaigns yet.</p>
            ) : (
                <table className="table table-bordered shadow-sm">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Goal</th>
                            <th>Raised</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((c) => (
                            <tr key={c._id}>
                                <td>{c.title}</td>
                                <td>${c.goalAmount}</td>
                                <td>${c.raisedAmount}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => handleEdit(c)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(c._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NGODashboard;
