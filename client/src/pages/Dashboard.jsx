// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import CreateCampaign from "../components/CreateCampaign";
import CampaignList from "../components/CampaignList";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [myDonations, setMyDonations] = useState([]);
  const [myCampaigns, setMyCampaigns] = useState([]);

  useEffect(() => {
    const fetchMyDonations = async () => {
      if (!user) return;
      if (user.role === "donor") {
        try {
          const res = await API.get("/donations/my");
          setMyDonations(res.data);
        } catch (err) { console.error(err); }
      }
    };

    const fetchMyCampaigns = async () => {
      if (!user) return;
      if (user.role === "ngo") {
        try {
          // backend doesn't have 'my campaigns' endpoint in our example.
          // We'll fetch all campaigns and filter by createdBy (works if campaigns include createdBy id)
          const res = await API.get("/campaigns");
          setMyCampaigns(res.data.filter(c => c.createdBy?._id === user._id || c.createdBy === user._id));
        } catch (err) { console.error(err); }
      }
    };

    fetchMyDonations();
    fetchMyCampaigns();
  }, [user]);

  return (
    <div style={{ padding: 12 }}>
      <h2>Dashboard</h2>
      {user?.role === "ngo" && (
        <>
          <h3>Your Campaigns</h3>
          <CreateCampaign onCreated={(c) => setMyCampaigns(prev => [c, ...prev])} />
          <div>
            {myCampaigns.length === 0 ? <p>No campaigns yet</p> : myCampaigns.map(c => (
              <div key={c._id} style={{ border: "1px solid #eee", padding: 8, marginBottom: 8 }}>
                <h4>{c.title}</h4>
                <p>Raised: {c.raisedAmount || 0} / {c.goalAmount}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {user?.role === "donor" && (
        <>
          <h3>Your Donations</h3>
          {myDonations.length === 0 ? <p>No donations yet</p> : myDonations.map(d => (
            <div key={d._id} style={{ border: "1px solid #eee", padding: 8, marginBottom: 8 }}>
              <p>Campaign: {d.campaign?.title || d.campaign}</p>
              <p>Amount: {d.amount}</p>
              <p>Date: {new Date(d.createdAt || d.donatedAt).toLocaleString()}</p>
            </div>
          ))}
        </>
      )}

      <hr />
      <h3>All Campaigns</h3>
      <CampaignList />
    </div>
  );
};

export default Dashboard;
