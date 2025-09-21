import React, { useEffect, useState } from "react";
import API from "../api/api";

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    // Fetch all campaigns
    const fetchCampaigns = async () => {
        try {
            const res = await API.get("/campaigns");
            setCampaigns(res.data);
        } catch (err) {
            console.error("Error fetching campaigns:", err);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    // Filter campaigns
    const filteredCampaigns = campaigns.filter((c) => {
        const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "all" || c.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container mt-5">
            <h2>All Campaigns</h2>

            {/* Filters */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-select"
                    >
                        <option value="all">All Categories</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="disaster">Disaster</option>
                        <option value="others">Others</option>
                    </select>
                </div>
            </div>

            {/* Campaign Cards */}
            <div className="row">
                {filteredCampaigns.length === 0 ? (
                    <p>No campaigns found.</p>
                ) : (
                    filteredCampaigns.map((c) => (
                        <div key={c._id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{c.title}</h5>
                                    <p className="card-text">{c.description.slice(0, 80)}...</p>
                                    <p>
                                        <strong>Goal:</strong> ${c.goalAmount} <br />
                                        <strong>Raised:</strong> ${c.raisedAmount}
                                    </p>
                                    <div className="progress mb-2">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: `${(c.raisedAmount / c.goalAmount) * 100}%` }}
                                        ></div>
                                    </div>
                                    <button className="btn btn-success w-100">Donate</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Campaigns;
