import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaCommentDots, FaFolder, FaUserCircle, FaWpforms, FaClipboardCheck, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // 👈 get loading state

  if (loading) {
    return (
      <div className="w-64 h-screen bg-secondary text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: user.role === 'employee' || 'director' ? "/employee-dashboard" : "/hr-dashboard", roles: ["hr", "employee","director"] },
    { name: "Participants", icon: <FaUsers />, path: "/employees", roles: ["hr","director"] },
    // { name: "Heirarchy", icon: <FaUsers />, path: "/heirarchy", roles: ["hr"] },
    { name: "New Appraisal", icon: <FaFolder />, path: "/forms", roles: ["hr"] },
    { name: "Manage Appraisals", icon: <FaCommentDots />, path: "/reviews", roles: ["hr","director"] },
    { name: "Active Appraisals", icon: <FaWpforms/>, path: "/employee/appraisal", roles:["employee","hr","director"]},
    { name: "Reports", icon: <FaWpforms/>, path: "/reports", roles:["hr","director"]},
    { name: "Closed Appraisals", icon: <FaClipboardCheck />, path: "/employee/closed-appraisals", roles:["employee","director"]},
    // { name: "My Appraisals", icon: <FaCommentDots />, path: "/employee-appraisals", roles: ["employee"] },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-secondary text-white flex flex-col justify-between py-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold"></h1>
      </div>

      <nav className="flex flex-col space-y-8">
        {menuItems
          .filter((item) => item.roles.includes(user.role.toLowerCase()))
          .map((item) => {
            const isActive = location.pathname.startsWith(item.path);

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

      <div className="flex items-center space-x-3 pl-12 pb-4">
        <FaUserCircle className="text-4xl" />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-200">
            {user.role.toLowerCase() === "employee" ? "Participant" : "HR Manager"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
