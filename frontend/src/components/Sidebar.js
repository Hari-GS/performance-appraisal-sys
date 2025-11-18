import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useState } from "react";
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
  const [open, setOpen] = useState(false); // MOBILE ONLY

  if (loading) return null;
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
    <>
      {/* === MOBILE HAMBURGER (Top Left) === */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-white p-2 rounded-md shadow"
        onClick={() => setOpen(true)}
      >
        <FaBars className="text-xl text-gray-800" />
      </button>

      {/* === MOBILE OVERLAY MENU === */}
      <div
        className={`fixed top-0 left-0 h-full w-56 bg-white z-50 shadow-md border-r transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`
        }
      >
        {/* Close Icon */}
        <button
          className="absolute right-3 top-3 text-xl text-gray-700"
          onClick={() => setOpen(false)}
        >
          <FaTimes />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center mt-10 mb-4">
          <img src={citLogo} alt="logo" className="h-8" />
        </div>

        <nav className="flex flex-col space-y-2 mt-4 px-4">
          {menuItems
            .filter((item) => item.roles.includes(user.role.toLowerCase()))
            .map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-4 py-3 text-[15px] font-medium ${
                    isActive
                      ? "text-accent bg-orange-50"
                      : "text-gray-800 hover:bg-orange-50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              );
            })}
        </nav>
      </div>

      {/* === DESKTOP SIDEBAR (unchanged layout) === */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r flex-col py-4">
        <div className="flex items-center justify-center">
          <img src={citLogo} alt="cit-logo" className="h-8" />
        </div>
        <div className="border mt-3.5"></div>

        <nav className="flex flex-col space-y-2 mt-8">
          {menuItems
            .filter((item) => item.roles.includes(user.role.toLowerCase()))
            .map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center py-3 pl-14 pr-8 text-[15px] font-medium 
                    ${isActive ? "text-accent" : "text-gray-800"}`}
                >
                  <span className={`mr-5`}>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
