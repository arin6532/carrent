import "./css/profile.css";
import React, { useEffect, useState } from "react";
import { UserHome_nav } from "./user_nav.jsx";
import Swal from "sweetalert2";

function Profile() {
  const userId = localStorage.getItem("userId");

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    fullName: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3001/user/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setUserData({
          username: data.username || "",
          password: "", // ไม่แสดงรหัสผ่านเดิม
          fullName: data.full_name || "",
          phone: data.phone || "",
          email: data.email || "",
        });
      })
      .catch((error) => {
        console.error("Error loading user data:", error);
        Swal.fire({
          title: "Error",
          text: "Error loading user data",
          icon: "error",
          customClass: {
            title: 'swal2-title-roboto-mono'
          }
        });
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // ถ้าไม่กรอกรหัสผ่านใหม่ จะไม่ส่งไป update
      const dataToSend = { ...userData };
      if (!dataToSend.password) delete dataToSend.password;

      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const responseText = await response.text();

      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      // แสดง alert สำเร็จ
      await Swal.fire({
        title: "Update Profile",
        html: `
          <div style="text-align: center; font-family: 'Roboto Mono', monospace;">
            <p>Successfully updated!</p>
          </div>
        `,
        icon: "success",
        customClass: {
          title: 'swal2-title-roboto-mono'
        }
      });

      setUserData((prev) => ({ ...prev, password: "" })); // ล้างช่องรหัสผ่านหลังบันทึก

    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error",
        text: `Error updating profile: ${error.message}`,
        icon: "error",
        customClass: {
          title: 'swal2-title-roboto-mono'
       }
      });
    } finally {
      setSaving(false);
    }
  };

  if (!userId) return <div>Please log in first.</div>;
  if (loading) return <div>Loading user data...</div>;

  return (
    <>
      <UserHome_nav />
      <div className="font-Roboto-Mono max-w-lg mx-auto p-5 bg-white rounded shadow mt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>

        {/* Username & Password */}
        <div className="flex gap-4 mb-5">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-base">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium text-base">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Full Name & Phone */}
        <div className="flex gap-4 mb-5">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-base">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium text-base">Phone</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-1 font-medium text-base">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-40 mx-auto bg-gray-500 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-60 transition text-base block"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
}

export default Profile;