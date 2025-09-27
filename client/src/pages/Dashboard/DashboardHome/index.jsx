// import React from 'react'
// import DashboardAnalatics from './DashboardAnalatics'

// const DashboardHome = () => {
//     return (
//         <DashboardAnalatics />
//     )
// }

// export default DashboardHome



import React from 'react';
import { Card } from 'antd';
import DashboardAnalatics from './DashboardAnalatics';

const DashboardHome = () => (
    <>
        <DashboardAnalatics />
        <Card title="Welcome">This is your dashboard home.</Card>
    </>
);

export default DashboardHome;
