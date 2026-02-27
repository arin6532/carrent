import "./css/login.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserHome_nav } from "./user_nav.jsx";  

function Home() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const goToBookCar = () => {
    navigate("/booking");
  };

  const goToHistory = () => {
    navigate("/history");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      fetchUserName(storedUserId);
    } else {
      alert("Please log in first.");
    }
  }, []);

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUserName(userData.full_name || userData.username);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <UserHome_nav />
      <div className="font-Roboto-Mono min-h-screen bg-gray-50 p-6">
        
        {/* Welcome Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome to PHUKET CARRENT
          </h1>
          <p className="text-lg text-center text-gray-600 mb-2">
            Hello, <span className="font-semibold text-blue-600">{userName || "User"}</span>!
          </p>
          <p className="text-center text-gray-500">
            Your gateway to exploring beautiful Phuket
          </p>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 text-white rounded-lg p-6 text-center hover:bg-blue-700 transition cursor-pointer">
            <div className="text-3xl mb-3">🚗</div>
            <a onClick={goToBookCar} className="cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Book a Car</h3>
              <p className="text-blue-100">Find your perfect vehicle</p>
            </a>
          </div>
          
          <div className="bg-green-600 text-white rounded-lg p-6 text-center hover:bg-green-700 transition cursor-pointer">
            <div className="text-3xl mb-3">📋</div>
            <a onClick={goToHistory} className="cursor-pointer">
              <h3 className="text-xl font-bold mb-2">My Bookings</h3>
              <p className="text-green-100">View your reservations</p>
            </a>
          </div>
          
          <div className="bg-purple-600 text-white rounded-lg p-6 text-center hover:bg-purple-700 transition cursor-pointer">
            <div className="text-3xl mb-3">👤</div>
            <a onClick={goToProfile} className="cursor-pointer">
              <h3 className="text-xl font-bold mb-2">Profile</h3>
              <p className="text-purple-100">Manage your account</p>
            </a>
          </div>
        </div>

        {/* Featured Cars */}
        {/* <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Popular Car Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-4xl mb-3">🚙</div>
              <h3 className="font-bold text-lg mb-2">Economy</h3>
              <p className="text-gray-600 text-sm mb-3">Perfect for city trips</p>
              <p className="text-blue-600 font-bold">From ฿800/day</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-4xl mb-3">🚐</div>
              <h3 className="font-bold text-lg mb-2">SUV</h3>
              <p className="text-gray-600 text-sm mb-3">Great for families</p>
              <p className="text-blue-600 font-bold">From ฿1,500/day</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-4xl mb-3">🏎️</div>
              <h3 className="font-bold text-lg mb-2">Luxury</h3>
              <p className="text-gray-600 text-sm mb-3">Premium experience</p>
              <p className="text-blue-600 font-bold">From ฿3,000/day</p>
            </div>
          </div>
        </div> */}

        {/* Services */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Our Services
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm font-medium">Quick Booking</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🛡️</div>
              <p className="text-sm font-medium">Full Insurance</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🕒</div>
              <p className="text-sm font-medium">24/7 Support</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm font-medium">Best Prices</p>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        {/* <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Explore Phuket
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🏖️</div>
              <h3 className="font-bold">Patong Beach</h3>
              <p className="text-sm text-blue-100">Nightlife & Entertainment</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-bold">Old Town</h3>
              <p className="text-sm text-green-100">Culture & History</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⛰️</div>
              <h3 className="font-bold">Big Buddha</h3>
              <p className="text-sm text-orange-100">Scenic Views</p>
            </div>
          </div>
        </div> */}

      </div>
    </>
  );
}

export default Home;