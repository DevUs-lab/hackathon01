// import { Button, Space } from 'antd'
// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useAuthContext } from '../../contexts/Auth'

// const Nav = () => {

//     const { isAuth, handleLogout } = useAuthContext()

//     console.log('isAuth', isAuth)

//     return (
//         <>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary">
//                 <div className="container">
//                     <Link to={'/'} className="navbar-brand">Folder - Structure</Link>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to={'/about'} className="nav-link active" aria-current="page">About</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to={'/contact'} className="nav-link active" aria-current="page">Contact</Link>
//                             </li>

//                         </ul>
//                         <div className="d-flex" role="search">
//                             <Space>
//                                 {!isAuth
//                                     ? <>
//                                         <Link to='/auth/login' className="btn btn-outline-success">Login</Link>
//                                         <Link to='/auth/register' className="btn btn-outline-success">Regester</Link>
//                                     </>
//                                     : <>
//                                         <Link to='/dashboard' className="btn btn-outline-info">Dashboard</Link>
//                                         <button type="primary" onClick={handleLogout} className=" btn btn-outline-danger">
//                                             Logout
//                                         </button>
//                                     </>
//                                 }
//                             </Space>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     )
// }

// export default Nav\




















import React from "react";
import { Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth";

const Nav = () => {
    const { user, token, logout } = useAuthContext();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg" style={{ background: "#FFFFFF", height: 97 }}>
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    <img src="https://demo.ovathemewp.com/charihope/wp-content/uploads/2019/05/Logo.svg" alt="logo" height={50} /></Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to={'/'} className="nav-link"><img className="border" src="https://demo.ovathemewp.com/charihope/wp-content/uploads/2019/05/Logo.svg" alt="logo" /></Link></li>
                        <li className="nav-item"><Link to={'/about'} className="nav-link">About</Link></li>
                        <li className="nav-item"><Link to={'/contact'} className="nav-link">Contact</Link></li>
                    </ul>
                    <div className="d-flex">
                        <Space>
                            {!token ? (
                                <>
                                    <Link to='/auth/login' className="btn btn-outline-success">Login</Link>
                                    <Link to='/auth/register' className="btn btn-outline-success">Register</Link>
                                </>
                            ) : (
                                <>
                                    <Link to='/dashboard' className="btn btn-outline-info">Dashboard</Link>
                                    <button onClick={() => { logout(); navigate('/'); }} className="btn btn-outline-danger">Logout</button>
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
