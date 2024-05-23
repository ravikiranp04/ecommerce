import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../Redux/slices/userLoginSLice";
export default function Navigation() {
  let dispatch = useDispatch();
  const { currentuser, loginStatus } = useSelector((state) => state.userLogin);

  function logout() {
    //remove token from browser storage
    sessionStorage.removeItem("token");
    //reset state
    let actionobj = resetState();
    dispatch(actionobj);
  }
  return (
    <div
      style={{ display: "flex", "justify-content": "space-around" }}
      className="bg-dark"
    >
      <img
        src="https://play-lh.googleusercontent.com/Z1gy3SDNLW4Nk3lz4yrvNoa4lA1if7NtlPgMJtntVLbONpu6GMM-Mv-5itive-nnzWM"
        alt="Logo"
        width="50"
        height="50"
        className="m-2"
      />
      <div className="text-info d-inline fs-4">
        <em>Foodie</em>
      </div>
      <ul className="nav justify-content-end ms-auto">
        {loginStatus == false ? (
          <>
            <li className="nav-item">
              <Link className="nav-link text-info" to="">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-info" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-info" to="/cart">
                My Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-info" to="/login">
                Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-info" to="/register">
                Signup
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link className="nav-link text-info" to="" onClick={logout}>
              <span className="lead fs-3 text-warning m-4">
                {currentuser.username}
                
              </span>
              SignOut
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
