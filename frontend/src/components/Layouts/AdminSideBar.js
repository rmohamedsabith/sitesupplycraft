import React from "react";
import { Link, useLocation } from "react-router-dom";
import "rc-tooltip/assets/bootstrap.css";

const AdminSideBar = () => {
  const location = useLocation();

  const isAdminPath = (path) => {
    const adminPaths = ["/admin/dashboard", "/admin/messages", "/admin/verifications", "/admin/payments", "/admin/payments/details"];
    return adminPaths.includes(location.pathname);
  };

 
  const isActive = (path) => {
    if (location.pathname === path) {
      return true;
    }
    if (path === "/admin/dashboard" && !isAdminPath(location.pathname)) {
      return true;
    }
    return false;
  };

  return (
    <div className="adminSide">
      <Link
        to="/admin/dashboard"
        className={`d-block sidebarLink ${isActive("/admin/dashboard") ? "active" : ""}`}
        style={{ cursor: "pointer" }}
      >
        Dashboard
      </Link>
      <Link
        to="/admin/messages"
        className={`d-block sidebarLink ${isActive("/admin/messages") ? "active" : ""}`}
        style={{ cursor: "pointer" }}
      >
        Messages
      </Link>
      <Link
        to="/admin/verifications"
        className={`d-block sidebarLink ${isActive("/admin/verifications") ? "active" : ""}`}
        style={{ cursor: "pointer" }}
      >
        Verifications
      </Link>
      <Link
        to="/admin/payments"
        className={`d-block sidebarLink ${isActive("/admin/payments") ? "active" : ""}`}
        style={{ cursor: "pointer" }}
      >
        Payments
      </Link>
    </div>
  );
};

export default AdminSideBar;
