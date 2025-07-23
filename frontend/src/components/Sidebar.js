import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaCommentDots, FaFolder, FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Initialize navigation function

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/dashboard" },
    { name: "Employees", icon: <FaUsers />, path: "/employees" },
    { name: "Heirarchy", icon: <FaUsers />, path: "/heirarchy" },
    { name: "New Appraisal", icon: <FaFolder />, path: "/forms" },
    { name: "Manage Appraisals", icon: <FaCommentDots />, path: "/reviews" }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-secondary text-white flex flex-col justify-between py-6">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold"></h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-8">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);// Check if the current route matches the menu path

          return (
            <button
              key={item.name}
              className={`flex items-center py-1 pl-10 text-lg font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-white to-secondary text-secondary rounded-l-full ml-4 pl-4"
                  : "hover:bg-white hover:text-secondary"
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
