import "./css/cardcars.css";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { UserHome_nav } from "./user_nav.jsx";

function Booking() {
  const [carData, setCarData] = useState([]); // ข้อมูลรถทั้งหมดจาก API
  const [searchTerm, setSearchTerm] = useState(""); // เก็บข้อความค้นหา

  const navigate = useNavigate();

  const goToRentCars = (cars_id) => {
     navigate("/rent_cars", { state: { cars_id } });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3001/car_list");
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        setCarData(data);

      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // กรองข้อมูลรถตาม searchTerm
  const filteredCars = carData.filter(car => {
    const term = searchTerm.toLowerCase();
    return (
      car.brand.toLowerCase().includes(term) ||
      car.model.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <UserHome_nav />
      <div className="booking-container car-list-wrapper font-Roboto-Mono">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="car-list">
          {filteredCars.length === 0 ? (
            <p style={{ textAlign: "center" }}>No results found.</p>
          ) : (
            filteredCars.map((car, index) => (
              <div key={index} className="car-card">
                <img
                  src={car.image_url}
                  alt={`${car.brand} ${car.model}`}
                  className="car-image"
                />
                <div className="car-details">
                  <h3>{car.brand} {car.model}</h3>
                  <p>ปี {car.year}</p>
                  <p className="price">฿{car.price_per_day} / day</p>
                  <p className="price">฿{car.price_per_week} / week</p>

                  <button onClick={() => goToRentCars(car.cars_id)} className="rent-button">
                    Rent
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Booking;
