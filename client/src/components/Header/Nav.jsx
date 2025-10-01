// import React from "react";
// import { Space } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../contexts/Auth";

// const Nav = () => {
//     const { user, token, logout } = useAuthContext();
//     const navigate = useNavigate();

//     return (
//         <nav className="navbar navbar-expand-lg border-bottom align-items-center">
//             <div className="container d-flex align-items-center justify-content-between">
//                 {/* Logo */}
//                 <Link to={'/'} className="navbar-brand d-flex align-items-center fs-1">
//                     <img
//                         src="https://demo.ovathemewp.com/charihope/wp-content/uploads/2019/05/Logo.svg"
//                         alt="logo"
//                         height={60}
//                     />
//                 </Link>

//                 {/* Toggler button (for small screens) */}
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarNav"
//                     aria-controls="navbarNav"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 {/* Links */}
//                 <div className="collapse navbar-collapse mt-1" id="navbarNav">
//                     <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
//                         <li className="nav-item li">
//                             <Link to={'/about'} className="nav-link">About</Link>
//                         </li>
//                         <li className="nav-item li">
//                             <Link to={'/contact'} className="nav-link">Contact</Link>
//                         </li>
//                     </ul>

//                     {/* Auth Buttons */}
//                     <div className="d-flex align-items-center justify-content-center justify-content-lg-end ms-auto mt-3 mt-lg-0">
//                         <Space>
//                             {!token ? (
//                                 <>
//                                     <Link to='/auth/login' className="navbarBtn py-3 px-4 btn rounded-0 border">Login</Link>
//                                     <Link to='/auth/register' className="navbarBtn py-3 px-4 btn rounded-0 border">Register</Link>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Link to='/dashboard' className="btn btn-outline-info">Dashboard</Link>
//                                     <button
//                                         onClick={() => { logout(); navigate('/'); }}
//                                         className="btn btn-outline-danger"
//                                     >
//                                         Logout
//                                     </button>
//                                 </>
//                             )}
//                         </Space>
//                     </div>

//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Nav;




import React from "react";
import { Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth";

const Nav = () => {
    const { user, token, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        window.location.reload(); // Force refresh to update UI
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom align-items-center">
            <div className="container d-flex align-items-center justify-content-between">
                {/* Logo */}
                <Link to={'/'} className="navbar-brand d-flex align-items-center fs-1">
                    <img
                        src="https://demo.ovathemewp.com/charihope/wp-content/uploads/2019/05/Logo.svg"
                        alt="logo"
                        height={60}
                    />
                </Link>

                {/* Toggler button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse mt-1" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item li">
                            <Link to={'/about'} className="nav-link">About</Link>
                        </li>
                        <li className="nav-item li">
                            <Link to={'/contact'} className="nav-link">Contact</Link>
                        </li>
                    </ul>

                    {/* Auth Buttons */}
                    <div className="d-flex align-items-center justify-content-center justify-content-lg-end ms-auto mt-3 mt-lg-0">
                        <Space>
                            {!token ? ( // Use token instead of user for consistency
                                <>
                                    <Link to='/auth/login' className="navbarBtn py-3 px-4 btn rounded-0 border">Login</Link>
                                    <Link to='/auth/register' className="navbarBtn py-3 px-4 btn rounded-0 border">Register</Link>
                                </>
                            ) : (
                                <>
                                    <span className="text-dark me-2">Welcome, {user?.firstName}</span>
                                    <Link to='/dashboard' className="btn btn-outline-info me-2">Dashboard</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-outline-danger"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </Space>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;