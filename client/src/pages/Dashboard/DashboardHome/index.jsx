// // src/pages/dashboard/DashboardHome.jsx
// import React from 'react';
// import { Card } from 'antd';
// import DashboardAnalatics from './DashboardAnalatics';
// import { useNavigate } from 'react-router-dom';


// const DashboardHome = () => (

//     const Navigate = useNavigate()
//     return (

//     <>
//         <DashboardAnalatics />
//         <Card title="Welcome" style={{ marginTop: 16 }}>
//             <p>This is your dashboard home. You can navigate to different sections using the sidebar menu.</p>
//         </Card>
//         <button onClick={() => { Navigate("/") }}>Go Back Home</button>
//     </>

// )
// );

// export default DashboardHome;


// src/pages/dashboard/DashboardHome.jsx
import React from "react";
import { Card } from "antd";
import DashboardAnalatics from "./DashboardAnalatics";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
    const navigate = useNavigate();

    return (
        <>
            <DashboardAnalatics />
            <Card title="Welcome" style={{ marginTop: 16 }}>
                <p>
                    This is your dashboard home. You can navigate to different sections
                    using the sidebar menu.
                </p>
            </Card>
            <button className="btn btn-info mt-3" onClick={() => navigate("/")}>Go Back Home</button>
        </>
    );
};

export default DashboardHome;
