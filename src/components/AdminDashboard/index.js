import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/add-train">Add Train</Link>
        </li>
        <li>
          <Link to="/admin/manage-trains">Manage Trains</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
