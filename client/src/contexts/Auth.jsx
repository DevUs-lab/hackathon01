// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem("token") || null);
//     const [loading, setLoading] = useState(true);

//     // Login function
//     const login = (userData, jwtToken) => {
//         setUser(userData);
//         setToken(jwtToken);
//         localStorage.setItem("token", jwtToken);
//     };

//     // Logout function
//     const logout = () => {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem("token");
//     };

//     // Fetch logged-in user from backend if token exists
//     useEffect(() => {
//         const fetchUser = async () => {
//             if (token) {
//                 try {
//                     const res = await axios.get("http://localhost:8000/api/auth/me", {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     setUser(res.data);
//                 } catch (err) {
//                     console.error("Auth error:", err.response?.data || err.message);
//                     logout(); // invalid token → logout
//                 }
//             }
//             setLoading(false);
//         };
//         fetchUser();
//     }, [token]);

//     return (
//         <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


// src/contexts/Auth.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem("token", jwtToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(`${API_BASE}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
            } catch (err) {
                console.error("Auth/me error:", err.response?.data || err.message);
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

