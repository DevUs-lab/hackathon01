// src/components/DashboardLayout.jsx
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    CheckSquareOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            key: "/dashboard",
            label: <Link to="/dashboard">Dashboard</Link>,
            icon: <HomeOutlined />,
        },
        {
            key: "/dashboard/todos",
            label: <Link to="/dashboard/todos">Todos</Link>,
            icon: <CheckSquareOutlined />,
        },
        {
            key: "/dashboard/settings",
            label: <Link to="/dashboard/settings">Settings</Link>,
            icon: <SettingOutlined />,
        },
        {
            key: "/dashboard/profile",
            label: <Link to="/dashboard/profile">Profile</Link>,
            icon: <UserOutlined />,
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div
                    className="logo"
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "16px",
                    }}
                >
                    {collapsed ? "App" : "My Dashboard"}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            style: { fontSize: "18px", padding: "0 16px", cursor: "pointer" },
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                    <h3 style={{ marginLeft: "10px" }}>Welcome to Dashboard</h3>
                </Header>

                <Content
                    style={{
                        margin: "16px",
                        padding: "24px",
                        minHeight: 280,
                        background: "#fff",
                        borderRadius: "8px",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;