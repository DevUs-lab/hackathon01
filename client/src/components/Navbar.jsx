import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "antd";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav style={{ padding: 12, background: "#fafafa", display: "flex", gap: 12 }}>
            <Link to="/">Home</Link>
            <Link to="/campaigns">Campaigns</Link>

            {user ? (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <span style={{ marginLeft: "auto" }}>
                        <strong>{user.name}</strong> ({user.role})
                        <Button type="link" onClick={handleLogout}>Logout</Button>
                    </span>
                </>
            ) : (
                <span style={{ marginLeft: "auto" }}>
                    <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
                    <Link to="/register">Register</Link>
                </span>
            )}

        </nav>
    );
};

export default Navbar;
