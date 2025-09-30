// // src/components/DashboardLayout.jsx
// import React, { useState } from "react";
// import { Layout, Menu } from "antd";
// import {
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     HomeOutlined,
//     CheckSquareOutlined,
//     SettingOutlined,
//     UserOutlined,
// } from "@ant-design/icons";
// import { Link, useLocation } from "react-router-dom";

// const { Header, Sider, Content } = Layout;

// const DashboardLayout = ({ children }) => {
//     const [collapsed, setCollapsed] = useState(false);
//     const location = useLocation();

//     const menuItems = [
//         {
//             key: "/dashboard",
//             label: <Link to="/dashboard">Dashboard</Link>,
//             icon: <HomeOutlined />,
//         },
//         {
//             key: "/dashboard/todos",
//             label: <Link to="/dashboard/todos">Todos</Link>,
//             icon: <CheckSquareOutlined />,
//         },
//         {
//             key: "/dashboard/settings",
//             label: <Link to="/dashboard/settings">Settings</Link>,
//             icon: <SettingOutlined />,
//         },
//         {
//             key: "/dashboard/profile",
//             label: <Link to="/dashboard/profile">Profile</Link>,
//             icon: <UserOutlined />,
//         },
//     ];

//     return (
//         <Layout style={{ minHeight: "100vh" }}>
//             <Sider trigger={null} collapsible collapsed={collapsed}>
//                 <div
//                     className="logo"
//                     style={{
//                         color: "white",
//                         fontWeight: "bold",
//                         textAlign: "center",
//                         padding: "16px",
//                     }}
//                 >
//                     {collapsed ? "App" : "My Dashboard"}
//                 </div>
//                 <Menu
//                     theme="dark"
//                     mode="inline"
//                     selectedKeys={[location.pathname]}
//                     items={menuItems}
//                 />
//             </Sider>

//             <Layout>
//                 <Header
//                     style={{
//                         padding: 0,
//                         background: "#fff",
//                         display: "flex",
//                         alignItems: "center",
//                     }}
//                 >
//                     {React.createElement(
//                         collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
//                         {
//                             className: "trigger",
//                             style: { fontSize: "18px", padding: "0 16px", cursor: "pointer" },
//                             onClick: () => setCollapsed(!collapsed),
//                         }
//                     )}
//                     <h3 style={{ marginLeft: "10px" }}>Welcome to Dashboard</h3>
//                 </Header>

//                 <Content
//                     style={{
//                         margin: "16px",
//                         padding: "24px",
//                         minHeight: 280,
//                         background: "#fff",
//                         borderRadius: "8px",
//                     }}
//                 >
//                     {children}
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// };

// export default DashboardLayout;






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
    FundOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const { user } = useAuthContext();

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

    // Add admin-only item
    if (user?.role === "admin") {
        menuItems.push({
            key: "/dashboard/campaigns",
            label: <Link to="/dashboard/campaigns">Campaigns</Link>,
            icon: <FundOutlined />,
        });
    }

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
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                style: { fontSize: "18px", padding: "0 16px", cursor: "pointer" },
                                onClick: () => setCollapsed(!collapsed),
                            }
                        )}
                        <h3 style={{ marginLeft: "10px" }}>
                            Welcome {user ? user.firstName : "Guest"}
                        </h3>
                    </div>
                    {/* Optional logout button */}
                    {user && (
                        <button
                            style={{
                                marginRight: "16px",
                                padding: "6px 12px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    )}
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
