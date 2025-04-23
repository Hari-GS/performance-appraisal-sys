import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaCommentDots, FaFolder, FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Initialize navigation function

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/dashboard" },
    { name: "Employees", icon: <FaUsers />, path: "/employees" },
    { name: "Forms", icon: <FaFolder />, path: "/forms" },
    { name: "Reviews", icon: <FaCommentDots />, path: "/reviews" }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-orange-500 text-white flex flex-col justify-between py-6">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold"></h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);// Check if the current route matches the menu path

          return (
            <button
              key={item.name}
              className={`flex items-center py-3 pl-16 text-lg font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-white to-orange-500 text-black rounded-l-full ml-10 pl-7"
                  : "hover:bg-orange-600"
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          );
        })}
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
