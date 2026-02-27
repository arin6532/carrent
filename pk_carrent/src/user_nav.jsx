import "./css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo_pk_carrent.png";
import { Link } from "react-router-dom";

function UserHome_nav() {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:3001/nav_username/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFullName(data.fullName);
      })
      .catch((error) => {
        console.error("Error fetching user name:", error);
      });
  }, []);

  const goTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ฟังก์ชัน logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };
  
  return (
    <nav className="font-Roboto-Mono bg-gray-800 border-gray-700 dark:bg-gray-900 dark:border-gray-700 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-15" alt="Logo" />
          <span className="self-center font-semibold whitespace-nowrap dark:text-black font-size-loginNav">
            PHUKET CARRENT
          </span>
        </Link>

        {/* ปุ่ม hamburger เมนูมือถือ */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 "
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* เมนูหลัก */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto absolute md:relative top-full left-0 md:top-auto md:left-auto z-50 md:z-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-white md:space-x-8 md:flex-row md:mt-0">
            <li>
              <button
                onClick={() => goTo("/home")}
                className="py-2 px-3 text-gray-900 bg-white hover:text-gray-500"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => goTo("/booking")}
                className="py-2 px-3 text-gray-900 bg-white hover:text-gray-500"
              >
                Booking
              </button>
            </li>
            <li>
              <button
                onClick={() => goTo("/history")}
                className="py-2 px-3 text-gray-900 bg-white hover:text-gray-500"
              >
                History
              </button>
            </li>

            {/* Desktop: แสดงชื่อผู้ใช้ พร้อม dropdown */}
            {!isMobile && (
              <li className="relative">
                <button
                  onClick={toggleMenu}
                  className="py-2 px-3 text-gray-900 bg-white hover:text-gray-500 flex items-center gap-2"
                >
                  <span>{fullName || "Loading..."}</span>
                  <FontAwesomeIcon icon={faCircleUser} className="text-2xl text-gray-700" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                    <button
                      onClick={() => goTo("/profile")}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}

            {/* Mobile: ไม่แสดงชื่อผู้ใช้ แต่แสดง Profile กับ Logout เป็นปุ่มแยก */}
            {isMobile && (
              <>
                <li>
                  <button
                    onClick={() => goTo("/profile")}
                    className="py-2 px-3 text-gray-900 bg-white hover:text-gray-500"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-3 text-gray-900 bg-white hover:text-gray-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { UserHome_nav };
