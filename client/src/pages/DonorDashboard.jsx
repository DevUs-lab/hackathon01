import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const res = await API.get("/donations/my");
                setDonations(res.data);
            } catch (err) {
                console.error("Error fetching donations:", err);
            }
        };
        if (user?.role === "donor") {
            fetchDonations();
        }
    }, [user]);

    return (
        <div className="container mt-5">
            <h2>My Donations</h2>
            {donations.length === 0 ? (
                <p>No donations yet.</p>
            ) : (
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Campaign</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((d) => (
                            <tr key={d._id}>
                                <td>{d.campaign.title}</td>
                                <td>${d.amount}</td>
                                <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DonorDashboard;
