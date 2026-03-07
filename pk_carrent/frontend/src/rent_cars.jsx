// Rent_cars.jsx
import "./css/login.css";
import "./css/rentcars_detial.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserHome_nav } from "./user_nav.jsx";
import Swal from "sweetalert2";

function Rent_cars() {
  // ดึงข้อมูล location เพื่ออ่านค่า cars_id ที่ส่งมาจากหน้าอื่น
  const location = useLocation();
  // useNavigate สำหรับเปลี่ยนหน้าไปยังหน้าอื่น
  const navigate = useNavigate();
  // ดึง cars_id จาก location.state (ถ้าไม่มีให้เป็น undefined)
  const { cars_id } = location.state || {};
  // เก็บข้อมูลรายละเอียดรถใน state
  const [car_details, setCarDetails] = useState(null);

  // useEffect เรียก fetchCarDetails เมื่อ component โหลดและเมื่อ cars_id เปลี่ยน
  useEffect(() => {
    if (!cars_id) {
      console.error("No cars_id provided in state");
      return;
    }

    // ฟังก์ชันดึงรายละเอียดรถจาก backend
    const fetchCarDetails = async () => {
      try {
        // เรียก API backend ดึงรายละเอียดรถตาม cars_id
        const response = await fetch(`http://localhost:3001/car_details/${cars_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }
        // แปลงผลลัพธ์เป็น JSON
        const data = await response.json();
        // เก็บข้อมูลรถไว้ใน state
        setCarDetails(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [cars_id]); // สังเกตใส่ cars_id ใน dependency เพื่อให้ fetch ใหม่เมื่อ cars_id เปลี่ยน

  // ฟังก์ชันจัดการเมื่อกดเช่ารถ (day หรือ week)
  const handleRent = async (type) => {
    if (!car_details) return;

    // ตรวจสอบว่าผู้ใช้ล็อกอินไหม (เก็บ userId ไว้ใน localStorage)
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // ถ้าไม่ล็อกอิน แจ้งเตือนให้ล็อกอินก่อนเช่า
      Swal.fire({
        title: 'Error',
        text: 'Please login first to rent a car.',
        icon: 'error',
        confirmButtonColor: "#d33",
        customClass: {
          title: 'swal2-title-roboto-mono'
        }
      });
      return;
    }

    // รีเฟรชสถานะล่าสุดของรถก่อนเช่า เพื่อป้องกันจองซ้ำ
    const statusCheck = await fetch(`http://localhost:3001/car_details/${cars_id}`);
    if (!statusCheck.ok) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to check car status.",
      });
      return;
    }
    const latestCar = await statusCheck.json();

    // ถ้ารถสถานะไม่ใช่ available แสดงเตือนว่าเช่าไม่ได้
    if (latestCar.status !== "available") {
      Swal.fire({
        icon: "error",
        title: "Car Unavailable",
        text: "This car has already been reserved by another user.",
      });
      // อัปเดตข้อมูลรถในหน้าเพื่อแสดงสถานะล่าสุด
      setCarDetails(latestCar);
      return;
    }

    // คำนวณราคาตามประเภทการเช่า day หรือ week
    const price = type === "day" ? car_details.price_per_day : car_details.price_per_week;
    const durationText = type === "day" ? "per day" : "per week";

    // แสดงหน้าต่าง confirm เช่ารถ พร้อมรายละเอียดรถและราคา
    Swal.fire({
      title: 'Confirm Car Rental',
      html: `
        <div style="text-align: left; font-family: 'Roboto Mono', monospace;">
          <p><strong>Model:</strong> ${car_details.brand} ${car_details.model}</p>
          <p><strong>Year:</strong> ${car_details.year}</p>
          <p><strong>Price:</strong> ฿${price} ${durationText}</p>
        </div>
      `,
      imageUrl: car_details.image_url,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: "#5d5e5eff",
      confirmButtonText: 'CONFIRM',
      cancelButtonColor: "#d33",
      cancelButtonText: 'CANCEL',
      customClass: {
        title: 'swal2-title-roboto-mono'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        // ใช้เวลาปัจจุบัน + คำนวณวัน/สัปดาห์ พร้อมเวลาที่แน่นอน
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (type === "day" ? 1 : 7));

        // ส่งเป็น ISO string แบบเต็ม (วันที่ + เวลา)
        const startDateISO = startDate.toISOString();
        const endDateISO = endDate.toISOString();

        // ข้อมูลเช่ารถที่ส่งไป backend
        const rentalData = {
          user_id: parseInt(userId),
          cars_id: parseInt(cars_id),
          rental_type: type,
          start_date: startDateISO,
          end_date: endDateISO,
          price: parseFloat(price),
        };

        try {
          // ส่งข้อมูลเช่ารถไป backend ด้วย POST method
          const response = await fetch("http://localhost:3001/user_rent_cars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rentalData),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Server error: ${response.status}`);
          }

          Swal.fire({
            title: 'Success!',
            text: 'Thank you! Your reservation is confirmed.',
            confirmButtonColor: "#5d5e5eff",
            icon: 'success',
            customClass: {
              title: 'swal2-title-roboto-mono'
            }
          }).then(() => {
            navigate('/booking');
          });

        } catch (error) {
          console.error("Reservation error:", error);
          Swal.fire({
            title: 'Error',
            text: `Reservation failed: ${error.message}`,
            icon: 'error',
            confirmButtonColor: "#d33",
              customClass: {
              title: 'swal2-title-roboto-mono'
            }
          });
        }
      }
    });
  };

  return (
    <>
      {/* แสดง navbar */}
      <UserHome_nav />
      {/* กล่องรายละเอียดรถ */}
      <div className="font-Roboto-Mono max-w-lg mx-auto p-5 bg-white rounded shadow mt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Rental details</h2>

        {/* แสดงรายละเอียดรถ ถ้าข้อมูลโหลดเสร็จ */}
        {car_details ? (
          <div>
            <img
              src={car_details.image_url}
              alt={`${car_details.brand} ${car_details.model}`}
              className="car-image-detail"
            />
            <p>Brand: {car_details.brand}</p>
            <p>Model: {car_details.model}</p>
            <p>Year: {car_details.year}</p>
            <p>Status: {car_details.status}</p> {/* แสดงสถานะรถ */}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading car details...</p>
        )}

        {/* ปุ่มเลือกเช่ารายวัน และรายสัปดาห์ */}
        <div className="flex justify-center gap-4 mt-6 mb-4">
          {["day", "week"].map((type) => (
            <button
              key={type}
              className="w-60 bg-gray-500 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-60 transition text-base"
              disabled={!car_details || car_details.status !== "available"} // ปิดปุ่มถ้ารถไม่ว่าง
              onClick={() => handleRent(type)}
            >
              {type === "day" ? "Day" : "Week"}
              <p>฿{car_details ? car_details[`price_per_${type}`] : "-"}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Rent_cars;