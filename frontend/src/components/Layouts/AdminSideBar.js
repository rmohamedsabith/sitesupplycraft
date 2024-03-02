import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "rc-tooltip/assets/bootstrap.css";
import { useDispatch } from "react-redux";
import { getMessagesList } from "../../actions/messagesAction";
import { getAllPayments } from "../../actions/paymentActions";

const AdminSideBar = () => {
  const location = useLocation();
const navigate=useNavigate()
  const isAdminPath = (path) => {
    const adminPaths = ["/admin/dashboard", "/admin/messages", "/admin/verifications", "/admin/verification", "/admin/payments", "/admin/payments/details"];
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
  const dispatch=useDispatch()
   const handleClick=()=>{  
    
      dispatch(getMessagesList).then(()=>navigate('/admin/messages')) 
    }
   const handlePayments=()=>{  
    
    dispatch(getAllPayments).then(()=>navigate('/admin/payments')) 
    }
  

  return (
    <center>
      <div className="adminSide" /* style={{position:'fixed',zIndex:-1}} */>
      <Link
        to="/admin/dashboard"
        className={`d-block sidebarLink ${isActive("/admin/dashboard") ? "active" : ""}`}
        style={{ cursor: "pointer" }}
      >
        Dashboard
      </Link>
      <div
        className={`d-block sidebarLink ${isActive("/admin/messages") ? "active" : ""}`}
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        Messages
      </div>
      <Link
        to="/admin/verifications"
        className={`d-block sidebarLink ${isActive("/admin/verifications")||isActive("/admin/verification") ? "active" : ""}`}
        style={{ cursor: "pointer" }}
      >
        Verifications
      </Link>
      <div
        onClick={handlePayments}
        className={`d-block sidebarLink ${isActive("/admin/payments")||isActive("/admin/payments/details") ? "active" : ""}`}
        style={{ cursor: "pointer" }}
      >
        Payments
      </div>
    </div>
    </center>
  );
};

export default AdminSideBar;
