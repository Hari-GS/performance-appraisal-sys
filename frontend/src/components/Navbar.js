import { FaBell, FaCog, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between ">
      {/* Left Section: Logo and Menu */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu (for future responsiveness) */}
        <button className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100">
          <FaBars size={24} />
        </button>
        {/* Company Logo */}
        <h1 className="text-2xl font-bold text-black">Home</h1>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <button className="relative text-gray-700 hover:text-orange-500">
          <FaBell size={24} />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            1
          </span>
        </button>

        {/* Settings Icon */}
        <button className="text-gray-700 hover:text-orange-500">
          <FaCog size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
