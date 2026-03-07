import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login_home from "./login_home";
import Login from "./login";
import Register from "./register";
import Home from "./Home";
import Booking from "./Booking";
import History from "./history";
import Rent_cars from "./rent_cars";
import Profile from "./profile";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login_home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ห่อหน้าเหล่านี้ด้วย RequireAuth เพื่อบังคับล็อกอิน */}
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/booking"
          element={
            <RequireAuth>
              <Booking />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <History />
            </RequireAuth>
          }
        />
        <Route
          path="/rent_cars"
          element={
            <RequireAuth>
              <Rent_cars />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
