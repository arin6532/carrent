import "./css/cardcars.css";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Home_nav } from "./login_nav";

function Login_home() {
  const [carData, setCarData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/login_car_list");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCarData(Array.isArray(data) ? data : []);
      } catch {
        setCarData([]);
      }
    })();
  }, []);

  const filteredCars = carData.filter((car) => {
    const term = searchTerm.toLowerCase();
    return (
      (car.brand || "").toLowerCase().includes(term) ||
      (car.model || "").toLowerCase().includes(term)
    );
  });

  return (
    <>
      <Home_nav />
      <div className="booking-container car-list-wrapper font-Roboto-Mono">
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
            filteredCars.map((car) => (
              <div key={car.cars_id} className="car-card">
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
                  <button onClick={() => navigate("/login")} className="rent-button">
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

export default Login_home;
