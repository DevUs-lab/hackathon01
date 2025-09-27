import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, DashboardOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Todos from './Todos';
// import Profile from './profile';
// import Profile from './Profile';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/Auth';
import DashboardHome from './DashboardHome';
import Settings from './settings';

const { Content, Footer, Sider } = Layout;

const Dashboard = () => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const { handleLogout } = useAuthContext();
    const navigate = useNavigate();

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => navigate('/dashboard')
        },
        {
            key: 'todos',
            icon: <UserOutlined />, // Or use a Todo icon if you prefer
            label: 'Todos',
            onClick: () => navigate('/dashboard/todos')
        },
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Profile',
            onClick: () => navigate('/dashboard/profile')
        },
        {
            key: 'media',
            icon: <VideoCameraOutlined />,
            label: 'Media',
            onClick: () => navigate('/dashboard/media')
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
            onClick: () => navigate('/dashboard/settings')
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            danger: true,
            onClick: handleLogout
        }
    ];

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => console.log(broken)}
                onCollapse={(collapsed, type) => console.log(collapsed, type)}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}>
                        <Routes>
                            <Route path="" element={<DashboardHome />} />
                            <Route path="todos" element={<Todos />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} />
                            {/* Add other routes as needed */}
                        </Routes>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    All Rights Reserved ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;


// in App.jsx or where routes are defined
import PrivateRouter from './components/PrivateRouter';
import Dashboard from './pages/dashboard/Dashboard'; // your layout file
// ...
<Routes>
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/register" element={<Register />} />
    <Route path="/dashboard/*" element={<PrivateRouter Component={Dashboard} />} />
</Routes>
