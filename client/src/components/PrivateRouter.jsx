// import React from "react";
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../contexts/Auth";

// const PrivateRouter = ({ Component }) => {
//     const { user, token, loading } = useContext(AuthContext);

//     // Jab tak loading ho rahi hai, tab tak kuch mat dikhao ya loader dikhao
//     if (loading) return <p>Loading...</p>;

//     // Agar token nahi hai to login page par bhej do
//     if (!token || !user) return <Navigate to="/auth/login" replace />;

//     // Agar token valid hai aur user available hai to component render karo
//     return <Component />;
// };

// export default PrivateRouter;




import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth";

const PrivateRouter = ({ Component }) => {
    const { user, token, loading } = useAuthContext();

    if (loading) return <div>Loading...</div>;
    if (!token || !user) return <Navigate to="/auth/login" replace />;

    return <Component />;
};

export default PrivateRouter;
