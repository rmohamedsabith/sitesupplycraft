import React from "react";
import { Link, useLocation } from "react-router-dom";
import "rc-tooltip/assets/bootstrap.css";
import "./AdminSideBar.css"; // Assuming you have a CSS file for styles

const AdminSideBar = () => {
  const location = useLocation(); // Gets the current location object

  // Function to determine if a link is active based on the current path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="adminSide">
      <Link
        to="/admin/dashboard"
        className={`d-block sidebarLink ${isActive("/admin/dashboard") ? "active" : ""}`}
        style={{ color: "white", cursor: "pointer", paddingBottom: "5px", paddingLeft: '8px' }}
      >
        Dashboard
      </Link>
      <Link
        to="/admin/messages"
        className={`d-block sidebarLink ${isActive("/admin/messages") ? "active" : ""}`}
        style={{ color: "white", cursor: "pointer", paddingBottom: "5px", paddingLeft: '8px' }}
      >
        Messages
      </Link>
      <Link
        to="/admin/verification"
        className={`d-block sidebarLink ${isActive("/admin/verification") ? "active" : ""}`}
        style={{ color: "white", cursor: "pointer", paddingBottom: "5px" , paddingLeft: '8px'}}
      >
        Verifications
      </Link>
      <Link
        to="/admin/payments"
        className={`d-block sidebarLink ${isActive("/admin/payments") ? "active" : ""}`}
        style={{ color: "white", cursor: "pointer", paddingBottom: "5px" , paddingLeft: '8px' }}
      >
        Payments
      </Link>
    </div>
  );
};

export default AdminSideBar;
