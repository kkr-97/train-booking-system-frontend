import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

function Navbar({ authToken, adminToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("admin_token");
    navigate("/login");
    window.location.reload();
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!authToken && !adminToken && (
          <>
            <li>
              <Link to="/login">User Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/admin/login">Admin Login</Link>
            </li>
          </>
        )}
        {authToken && (
          <>
            <li>
              <Link to="/trains">Trains</Link>
            </li>
            <li>
              <Link to="/book-seat">Book Seat</Link>
            </li>
            <li>
              <Link to="/booking-details">Booking Details</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
        {adminToken && (
          <>
            <li>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
