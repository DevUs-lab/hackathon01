// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './config/global.js'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { ThemeProvider } from './contexts/ThemeContext.jsx'
// import { AuthProvider } from './contexts/Auth.jsx'
// import "antd/dist/reset.css";
// // Ant Design reset styles

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter future={{ v7_startTransition: true }}>
//       <ThemeProvider>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/Auth";

import "antd/dist/reset.css"; // Ant Design reset styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
