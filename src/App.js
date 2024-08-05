import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LoginUser from "./components/LoginUser";
import TrainList from "./components/TrainList";
import BookSeat from "./components/BookSeat";
import BookingDetails from "./components/BookingDetails";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AddTrain from "./components/AddTrain";
import ManageTrains from "./components/ManageTrains";
import Cookie from "js-cookie";
import { useState } from "react";

function App() {
  const [authToken, setAuthToken] = useState(Cookie.get("token"));
  const [adminToken, setAdminToken] = useState(Cookie.get("admin_token"));

  return (
    <Router>
      <div>
        <Navbar authToken={authToken} adminToken={adminToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route
            path="/login"
            element={
              <LoginUser authToken={authToken} setAuthToken={setAuthToken} />
            }
          />
          <Route
            path="/trains"
            element={
              <PrivateRoute authToken={authToken} element={<TrainList />} />
            }
          />
          <Route
            path="/book-seat"
            element={
              <PrivateRoute authToken={authToken} element={<BookSeat />} />
            }
          />
          <Route
            path="/booking-details"
            element={
              <PrivateRoute
                authToken={authToken}
                element={<BookingDetails />}
              />
            }
          />
          <Route
            path="/admin/login"
            element={<AdminLogin setAdminToken={setAdminToken} />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute
                authToken={adminToken}
                element={<AdminDashboard />}
              />
            }
          />
          <Route
            path="/admin/add-train"
            element={
              <PrivateRoute
                authToken={adminToken}
                element={<AddTrain adminToken={adminToken} />}
              />
            }
          />
          <Route
            path="/admin/manage-trains"
            element={
              <PrivateRoute
                authToken={adminToken}
                element={<ManageTrains adminToken={adminToken} />}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
