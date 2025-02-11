import { useState } from "react";
import { FaHome, FaUsers, FaCommentDots, FaFolder, FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Employees", icon: <FaUsers /> },
    { name: "Feedback", icon: <FaCommentDots /> },
    { name: "Forms", icon: <FaFolder /> },
  ];

  return (
    <div className="h-screen w-64 bg-orange-500 text-white flex flex-col justify-between py-6">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold">JSTS</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center py-3 pl-16 text-lg font-medium transition-all duration-300 ${
              active === item.name ? "bg-gradient-to-r from-white to-orange-500 text-black rounded-l-full ml-10 pl-7" : "hover:bg-orange-600"
            }`}
            onClick={() => setActive(item.name)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="flex items-center space-x-3 pl-12 pb-4">
        <FaUserCircle className="text-4xl" />
        <div>
          <p className="font-semibold">Grace</p>
          <p className="text-sm text-gray-200">Developer</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
