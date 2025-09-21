import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaigns from "./pages/Campaigns";
// import CampaignDetails from "./pages/CampaignDetails";
// import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CampaignDetails from "./pages/CampaignDetail";

import DonorDashboard from "./pages/DonorDashboard";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute><DonorDashboard /></ProtectedRoute>} />
        import NGODashboard from "./pages/NGODashboard";

        <Route
          path="/ngo-dashboard"
          element={<ProtectedRoute><NGODashboard /></ProtectedRoute>}
        />

      </Routes>
    </>
  );
}

export default App;
