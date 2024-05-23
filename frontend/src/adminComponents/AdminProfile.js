import React from "react";
import { NavLink,Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function AdminProfile() {
    const navigate=useNavigate();
  return (
    <div>
      <NavLink className="nav-link text-info" to="add-product"  >
        <button className="btn btn-success">
        Add a Product
        </button>
      </NavLink>
    </div>
  );
}

export default AdminProfile;
