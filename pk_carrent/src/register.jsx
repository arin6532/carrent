import "./css/login.css";
import React, { useState } from "react";
import { Home_nav } from "./login_nav.jsx";
import { useNavigate } from "react-router-dom";

function Register() {
  const [regis_username, setregis_Username] = useState("");
  const [regis_password, setregis_Password] = useState("");
  const [regis_fullname, setregis_Fullname] = useState("");
  const [regis_email, setregis_Email] = useState("");
  const [regis_phone, setregis_Phone] = useState("");

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          regis_Username: regis_username,
          regis_Password: regis_password,
          regis_Fullname: regis_fullname,
          regis_Email: regis_email,
          regis_Phone: regis_phone,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert("Registration failed: " + result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Home_nav />
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="login_height bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 font-Roboto-Mono">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={regis_username}
              onChange={(e) => setregis_Username(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={regis_password}
              onChange={(e) => setregis_Password(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Your Name"
              value={regis_fullname}
              onChange={(e) => setregis_Fullname(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={regis_email}
              onChange={(e) => setregis_Email(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={regis_phone}
              onChange={(e) => setregis_Phone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-neutral-600 text-white py-2 rounded-md hover:bg-neutral-700 transition-colors"
            >
              Register
            </button>
            <div className="flex items-center justify-center">
              <a href="#" onClick={goToLogin} className="px-3 hover:text-gray-500">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;