import { useEffect, useRef } from "react";
import placeholder from "../images/dp-default-preview.png";
import { FaCaretDown, FaSignOutAlt, FaUser, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { logout } from "../helpers/axios_helpers";

export default function TopHeader({ breadcrumbs = [] }) {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => logout();

  if (loading) {
    return (
      <div className="w-64 h-screen bg-white text-gray-700 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <header className="
        flex flex-col sm:flex-row 
        justify-between items-start sm:items-center
        px-4 md:px-6 py-2 
        bg-white shadow-sm border-b border-gray-200
      "
    >
      {/* --- BREADCRUMBS (Moves below on mobile) --- */}
      <nav
        className="
          flex flex-wrap items-center text-sm font-medium text-gray-600 space-x-2         
          order-2 sm:order-1
          mt-2 sm:mt-0
          w-full sm:w-auto
          pl-2 sm:pl-64
        "
      >
        {breadcrumbs.length > 0 ? (
          breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "text-accent font-semibold"
                    : ""
                }
              >
                {crumb}
              </span>

              {index < breadcrumbs.length - 1 && (
                <FaChevronRight className="mx-2 text-gray-400 text-xs" />
              )}
            </div>
          ))
        ) : (
          <span></span>
        )}
      </nav>

      {/* --- PROFILE SECTION (Stays right on desktop, top on mobile) --- */}
      <div
        className="
          relative flex items-center space-x-6 
          order-1 sm:order-2
          w-full sm:w-auto justify-end
        "
        ref={dropdownRef}
      >
        <div
          className="
            flex items-center space-x-2 cursor-pointer px-2 py-1 
            rounded-md hover:bg-orange-50 hover:shadow transition
          "
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            src={placeholder}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-800">{user.name}</span>

          <FaCaretDown
            className={`text-gray-600 text-sm transition-transform ${
              isOpen ? "rotate-180 text-accent" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="
              absolute right-0 top-12 w-40 bg-white z-50
              border border-gray-300 rounded-md shadow transition
            "
          >
            <ul className="py-1 text-sm text-gray-700">
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 cursor-pointer border-b">
                <FaUser className="text-base text-accent" />
                Profile
              </li>
              <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-base text-accent" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
