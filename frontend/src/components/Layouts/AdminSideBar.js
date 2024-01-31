import React from "react";
import { Link } from "react-router-dom";
import "rc-tooltip/assets/bootstrap.css";

const AdminSideBar = () => {
  return (
    <div className="adminSide">
      <Link
        to="/admin/dashboard"
        className={`d-block sidebarLink`}
        style={{ color: "white", cursor: "pointer", paddingBottom: "5px" }}
      >
        Dashboard
      </Link>
      <Link
        to="/admin/messages"
        className={`d-block sidebarLink`}
        style={{ color: "white", cursor: "pointer", paddingBottom: "5px" }}
      >
        Messages
      </Link>
    </div>
  );
};

export default AdminSideBar;
