import { useEffect, useRef } from "react";
import citLogo from "../images/cit-logo.jpg";
import placeholder from "../images/dp-default-preview.png"
import { FaCaretDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaChevronRight } from "react-icons/fa";
import { logout } from "../helpers/axios_helpers";


export default function TopHeader({breadcrumbs = []}) {
    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
  };

    if (loading) {
        return (
        <div className="w-64 h-screen bg-white text-gray-700 flex items-center justify-center">
            <p>Loading...</p>
        </div>
        );
    }

    if (!user) return null;
    
    return (
        <header className="flex justify-between items-center px-6 py-3 bg-white shadow-sm border-b border-gray-200">
        {/* Breadcrumbs - Left Section */}
        <nav className="flex items-center text-sm font-medium text-gray-600 space-x-2 pl-64">
            {breadcrumbs.length > 0 ? (
            breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                <span
                    className={`${
                    index === breadcrumbs.length - 1
                        ? "text-accent font-semibold"
                        : ""
                    }`}
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

        {/* Profile - Right Section */}
        {/* <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 cursor-pointer group px-2 py-0 rounded-md hover:bg-orange-50 hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] transition">
            <img
                src={placeholder}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800 group-hover:text-orange-600 transition">
                {user.name}
            </span>
            <FaCaretDown className="text-gray-600 group-hover:text-orange-500 text-sm transition" />
            </div>
        </div> */}
        {/* Profile - Right Section */}
        <div className="relative flex items-center space-x-6" ref={dropdownRef}>
            {/* Profile Button */}
            <div
            className="flex items-center space-x-2 cursor-pointer px-2 py-0 rounded-md hover:bg-orange-50 hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] transition"
            onClick={() => setIsOpen((prev) => !prev)}
            >
            <img
                src={placeholder}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800 transition">
                {user.name}
            </span>
            <FaCaretDown
                className={`text-gray-600 text-sm transform transition-transform ${
                isOpen ? "rotate-180 text-accent" : ""
                }`}
            />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
            <div className="absolute right-0 top-12 w-40 bg-white border border-gray-300 rounded-md shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-all duration-200 ease-in-out animate-fade-in">
                <ul className="py-1 text-sm text-gray-700">
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 cursor-pointer border-b">
                    <FaUser className="text-base text-accent" />
                    Profile
                </li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 cursor-pointer" onClick={handleLogout}>
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
