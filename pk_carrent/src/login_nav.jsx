import "./css/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "./assets/logo_pk_carrent.png";

function Home_nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goToLogin = () => {
    navigate("/login"); // เปลี่ยนเส้นทางไปยังหน้า Login
    setIsMenuOpen(false); // ปิดเมนูหลังจากคลิก
  };

  const goToLogin_home = () => {
    navigate("/");
    setIsMenuOpen(false); // ปิดเมนูหลังจากคลิก
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="font-Roboto-Mono bg-gray-800 !important border-gray-700 dark:bg-gray-900 dark:border-gray-700 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-15" alt="Flowbite Logo" />
          <span
            className="self-center font-semibold whitespace-nowrap dark:text-black font-size-loginNav"
          >
            PHUKET CARRENT
          </span>
        </a>

        {/* Hamburger menu button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
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

        {/* Navigation menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto absolute md:relative top-full left-0 md:top-auto md:left-auto z-50 md:z-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <a
                href="#"
                onClick={goToLogin_home}
                className="py-2 px-3 text-gray-900 bg-white dark:hover:text-gray-500 md:dark:bg-transparent"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={goToLogin} // เรียกใช้ฟังก์ชัน goToLogin เมื่อคลิก
                className="py-2 px-3 md:p-0 dark:text-black dark:hover:bg-gray-700 dark:hover:text-gray-500 md:dark:hover:bg-transparent"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Home_nav };