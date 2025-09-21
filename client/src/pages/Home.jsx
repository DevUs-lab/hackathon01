// src/pages/Home.jsx
import React from "react";
import CampaignList from "../components/CampaignList";

const Home = () => (
  <div style={{ padding: 12 }}>
    <h1>Welcome to DonateHub</h1>
    <CampaignList />
  </div>
);

export default Home;
