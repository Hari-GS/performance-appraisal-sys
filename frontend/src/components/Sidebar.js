import { useLocation, useNavigate } from "react-router-dom";
import {
  FaWpforms,
  FaClipboardCheck
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import citLogo from "../images/cit-logo.jpg";
import { ReactComponent as CubeIcon } from "../images/Appraisal-Icons/3dcube.svg";
import { ReactComponent as DashIcon } from "../images/Appraisal-Icons/element-3.svg";
import { ReactComponent as Profile2Icon } from "../images/Appraisal-Icons/profile-2user.svg";
import { ReactComponent as EditIcon } from "../images/Appraisal-Icons/edit.svg";
import { ReactComponent as Swatches } from "../images/Appraisal-Icons/Swatches.svg";
import { ReactComponent as StackOverflowLogo } from "../images/Appraisal-Icons/StackOverflowLogo.svg";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-64 h-screen bg-white text-gray-700 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    { name: "Dashboard", icon: <DashIcon />, path: user.role === "employee" ? "/employee-dashboard" : "/hr-dashboard", roles: ["hr", "employee", "director"]},
    { name: "Participants", icon: <Profile2Icon />, path: "/employees", roles: ["hr", "director"] },
    { name: "New", icon: <CubeIcon />, path: "/forms", roles: ["hr"] },
    { name: user.role === "hr" ? "Manage" : "Monitor", icon: <EditIcon />, path: "/reviews", roles: ["hr", "director"] },
    { name: "Participate", icon: <Swatches />, path: "/employee/appraisal", roles: ["employee", "hr", "director"] },
    { name: "Closed", icon: <StackOverflowLogo />, path: "/reports", roles: ["hr", "director"] },
    { name: "Closed", icon: <StackOverflowLogo />, path: "/employee/closed-appraisals", roles: ["employee"] },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-start py-4">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-1 w-[200px] h-[26px] ">
        <img src={citLogo} alt="cit-logo" className="h-[28px] w-auto pl-16"/>
      </div>
      <div className=" border mt-3.5"></div>
      {/* Navigation */}
      <nav className="flex flex-col space-y-2 mt-8">
        {menuItems
          .filter((item) => item.roles.includes(user.role.toLowerCase()))
          .map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`relative flex items-center py-3 pl-14 pr-8 text-[15px] font-medium transition-all duration-300 overflow-visible 
                  ${isActive
                    ? "text-accent hover:bg-orange-50"
                    : "text-gray-800 hover:text-accent hover:bg-orange-50"
                  }`}
              >
                {/* left curved pill (outside the button) */}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute -left-0 top-1/2 -translate-y-1/2 w-1 h-11 rounded-l-full rounded-r-[50%] bg-accent"
                  />
                )}

                {/* icon */}
                <span className={`mr-3 text-lg ${isActive ? "text-accent" : "text-gray-700"}`}>
                  {item.icon}
                </span>

                {/* label */}
                <span className="flex-1 text-left">{item.name}</span>

                {/* right curved pill (outside the button) */}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute -right-0 top-1/2 -translate-y-1/2 w-1 h-11 rounded-r-full rounded-l-[50%] bg-accent"
                  />
                )}
              </button>
            );
          })}
      </nav>
    </div>
  );
};

export default Sidebar;
