// src/contexts/Auth.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // Called after successful login (from your login component)
    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);
        // set axios default header so future requests have the token
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];
        setLoading(false);
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            if (!token) {
                // no token → guest user
                setUser(null);
                delete axios.defaults.headers.common['Authorization'];
                setLoading(false);
                return;
            }

            try {
                // ensure axios uses token
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const res = await axios.get(`${API_BASE}/api/auth/me`);
                setUser(res.data);
            } catch (err) {
                console.error("Auth/me error:", err.response?.data || err.message);
                // invalid token → clear everything
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// helper hook
export const useAuthContext = () => useContext(AuthContext);
