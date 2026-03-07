// RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const userId = localStorage.getItem("userId");
  const location = useLocation();

  if (!userId) {
    // ถ้าไม่มี userId ให้ redirect ไปหน้า login พร้อมเก็บ path ที่พยายามเข้าถึงไว้ใน state
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;