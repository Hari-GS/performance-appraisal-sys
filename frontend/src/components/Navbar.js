import { useState } from "react";
import { FaBell, FaCog, FaBars } from "react-icons/fa";
import { logout, setUserId } from "../helpers/axios_helpers"; // ✅ Import logout function

const Navbar = (props) => {
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-[100%] bg-white shadow-md px-6 py-4 flex items-center justify-between absolute top-5 left-0">
      {/* Left Section: Logo and Menu */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu (for future responsiveness) */}
        <button className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100">
          <FaBars size={24} />
        </button>
        {/* Company Logo */}
        <h1 className="text-2xl font-bold text-black pl-[305px]">{props.title}</h1>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-6 relative">
        {/* Notification Icon */}
        <button className="relative text-gray-700 hover:text-orange-500">
          <FaBell size={24} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            0
          </span>
        </button>

        {/* Settings Icon (with Logout Popup) */}
        <div className="relative">
          <button
            className="text-gray-700 hover:text-orange-500"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaCog size={24} />
          </button>

          {/* Logout Popup */}
          {showLogout && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg p-2">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
