// src/pages/dashboard/index.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/Auth';
import DashboardHome from './DashboardHome';
import Todos from './Todos';
import UserProfile from './Profile';
import Setting from './settings';
import DashboardLayout from '../../components/DashboardLayout';
import Campaigns from './Campaigns';
// import { useAuthContext } from '../../contexts/Auth';
// import DashboardLayout from '../../components/DashboardLayout';
// import DashboardHome from './DashboardHome';
// import Todos from './Todos';
// import UserProfile from './UserProfile';
// import Setting from './Setting';

const Dashboard = () => {
    const { user } = useAuthContext();


    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <DashboardLayout>
            <Routes>
                <Route index element={<DashboardHome />} />
                <Route path="todos" element={<Todos />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="settings" element={<Setting />} />
                <Route path="campaign" element={<Campaigns />} />
            </Routes>
        </DashboardLayout>
    );
};

export default Dashboard;