// // // // src/contexts/Auth.jsx
// // // import React, { createContext, useState, useEffect, useContext } from "react";
// // // import axios from "axios";

// // // const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// // // export const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //     const [user, setUser] = useState(null);
// // //     const [token, setToken] = useState(localStorage.getItem("token") || null);
// // //     const [loading, setLoading] = useState(true);

// // //     // Called after successful login (from your login component)
// // //     const login = (userData, jwtToken) => {
// // //         setUser(userData);
// // //         setToken(jwtToken);
// // //         localStorage.setItem("token", jwtToken);
// // //         // set axios default header so future requests have the token
// // //         axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
// // //         setLoading(false);
// // //     };

// // //     const logout = () => {
// // //         setUser(null);
// // //         setToken(null);
// // //         localStorage.removeItem("token");
// // //         delete axios.defaults.headers.common['Authorization'];
// // //         setLoading(false);
// // //     };

// // //     useEffect(() => {
// // //         const fetchUser = async () => {
// // //             setLoading(true);
// // //             if (!token) {
// // //                 // no token → guest user
// // //                 setUser(null);
// // //                 delete axios.defaults.headers.common['Authorization'];
// // //                 setLoading(false);
// // //                 return;
// // //             }

// // //             try {
// // //                 // ensure axios uses token
// // //                 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// // //                 const res = await axios.get(`${API_BASE}/api/auth/me`);
// // //                 setUser(res.data);
// // //             } catch (err) {
// // //                 console.error("Auth/me error:", err.response?.data || err.message);
// // //                 // invalid token → clear everything
// // //                 logout();
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchUser();
// // //     }, [token]);

// // //     return (
// // //         <AuthContext.Provider value={{ user, token, login, logout, loading }}>
// // //             {children}
// // //         </AuthContext.Provider>
// // //     );
// // // };

// // // // helper hook
// // // export const useAuthContext = () => useContext(AuthContext);







// // import React, { createContext, useState, useEffect } from "react";
// // import axios from "axios";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //     const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

// //     const [user, setUser] = useState(null); // logged in user
// //     const [loading, setLoading] = useState(true);

// //     // Load user from localStorage on first render
// //     useEffect(() => {
// //         const token = localStorage.getItem("token");
// //         const userData = localStorage.getItem("user");
// //         if (token && userData) {
// //             setUser(JSON.parse(userData));
// //         }
// //         setLoading(false);
// //     }, []);

// //     // Login
// //     const login = async (email, password) => {
// //         try {
// //             const res = await axios.post(`${API}/api/auth/login`, { email, password });
// //             const { token, user } = res.data;

// //             localStorage.setItem("token", token);
// //             localStorage.setItem("user", JSON.stringify(user));
// //             setUser(user);
// //             return { success: true };
// //         } catch (err) {
// //             return { success: false, message: err.response?.data?.message || "Login failed" };
// //         }
// //     };

// //     // Register
// //     const register = async (name, email, password) => {
// //         try {
// //             const res = await axios.post(`${API}/api/auth/register`, { name, email, password });
// //             return { success: true, message: res.data.message };
// //         } catch (err) {
// //             return { success: false, message: err.response?.data?.message || "Register failed" };
// //         }
// //     };

// //     // Logout
// //     const logout = () => {
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("user");
// //         setUser(null);
// //     };

// //     return (
// //         <AuthContext.Provider value={{ user, loading, login, register, logout }}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };


// // src/contexts/Auth.jsx
// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

//     const [user, setUser] = useState(null); // logged in user
//     const [loading, setLoading] = useState(true);

//     // Load user from localStorage on first render and set axios header
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const userData = localStorage.getItem("user");
//         if (token && userData) {
//             setUser(JSON.parse(userData));
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         }
//         setLoading(false);
//     }, []);

//     // Login
//     const login = async (email, password) => {
//         try {
//             const res = await axios.post(`${API}/api/auth/login`, { email, password });
//             const { token, user } = res.data;

//             localStorage.setItem("token", token);
//             localStorage.setItem("user", JSON.stringify(user));
//             setUser(user);

//             // Set axios default header for all future requests
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//             return { success: true };
//         } catch (err) {
//             return { success: false, message: err.response?.data?.msg || "Login failed" };
//         }
//     };

//     // Register
//     const register = async (firstName, lastName, email, password) => {
//         try {
//             const res = await axios.post(`${API}/api/auth/register`, { firstName, lastName, email, password });
//             return { success: true, message: res.data.msg };
//         } catch (err) {
//             return { success: false, message: err.response?.data?.msg || "Register failed" };
//         }
//     };

//     // Logout
//     const logout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);

//         // Remove axios default header
//         delete axios.defaults.headers.common['Authorization'];
//     };

//     // return (
//     //     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//     //         {children}
//     //     </AuthContext.Provider>
//     // );

//     return (
//         <AuthContext.Provider value={{
//             user,
//             token: localStorage.getItem("token"),
//             loading,
//             login,
//             register,
//             logout
//         }}>
//             {children}
//         </AuthContext.Provider>
//     );

// };

// // 🔹 helper hook for easy use in components
// export const useAuthContext = () => useContext(AuthContext);





// src/contexts/Auth.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token")); // Add token state
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on first render and set axios header
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            setUser(JSON.parse(userData));
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    // Login function - FIXED
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API}/api/auth/login`, { email, password });
            const { token: newToken, user: userData } = res.data;

            // Save to localStorage
            localStorage.setItem("token", newToken);
            localStorage.setItem("user", JSON.stringify(userData));

            // Update state
            setUser(userData);
            setToken(newToken);

            // Set axios default header
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            return { success: true, user: userData };
        } catch (err) {
            console.error("Login error:", err.response?.data);
            return {
                success: false,
                message: err.response?.data?.msg || "Login failed"
            };
        }
    };

    // Register function
    const register = async (firstName, lastName, email, password) => {
        try {
            const res = await axios.post(`${API}/api/auth/register`, {
                firstName,
                lastName,
                email,
                password
            });
            return { success: true, message: res.data.msg };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.msg || "Register failed"
            };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    // Add isAuth for easier checking
    const isAuth = !!token;

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuth, // Add this
            loading,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Helper hook
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }
    return context;
};