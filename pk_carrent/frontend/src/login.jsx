import "./css/login.css";
import React, { useState, useEffect } from "react";
import { Home_nav } from "./login_nav.jsx";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register"); // เปลี่ยนเส้นทางไปยังหน้า register
  };

  // ฟังก์ชันสำหรับการล็อกอิน
const handleLogin = async (e) => {
  e.preventDefault(); // ป้องกันการ reload หน้าเมื่อ submit form

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }), // ส่ง username และ password
    });
    const result = await response.json();
    if (response.ok) {
      // alert("Login successful!");

      // เก็บ JWT token ใน localStorage
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("token", result.token); // เก็บ JWT token

      // อาจจะทำการเปลี่ยนเส้นทางไปหน้าหลังจากล็อกอินสำเร็จ
      navigate("/home");
    } else {
      alert(result.message); // ถ้าเกิดข้อผิดพลาด แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again later.");
  }
};

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  // ตรวจสอบ token ทุกครั้งที่โหลดหน้าเว็บ
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // ตรวจสอบว่า JWT token หมดอายุหรือไม่
      const tokenExpiration = jwtDecode(storedToken).exp * 1000; // เปลี่ยนจาก jwt_decode เป็น jwtDecode
      const currentTime = new Date().getTime();

      if (tokenExpiration < currentTime) {
        // หาก token หมดอายุ ให้ให้ผู้ใช้ล็อกอินใหม่
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token"); // ลบ token ที่หมดอายุ
        navigate("/");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Home_nav />
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="login_height bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 font-Roboto-Mono">
            Login to Your Account
          </h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-gray-500 focus:ring-2 focus:ring-gray-500"
              required
            />
            <button
              type="submit"
              className={`btn-save w-full py-2 rounded-md transition-colors ${
                isFormValid ? "btn-active" : "btn-disabled"
              }`}
              disabled={!isFormValid}
            >
              Login
            </button>
            <div className="flex items-center justify-center">
              <a
                href="#"
                onClick={goToRegister} // เรียกใช้ฟังก์ชัน goToRegister เมื่อคลิก
                className="px-3 hover:text-gray-500"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;