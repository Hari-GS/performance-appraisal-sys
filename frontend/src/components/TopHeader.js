import { useEffect } from "react";
import citLogo from "../images/cit-logo.jpg";
import placeholder from "../images/dp-default-preview.png"
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaChevronRight } from "react-icons/fa";


export default function TopHeader({breadcrumbs = []}) {
    const { user, loading } = useAuth();

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
                        : "hover:text-accent-dark cursor-pointer transition"
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
            <span className="text-gray-500">Dashboard</span>
            )}
        </nav>

        {/* Profile - Right Section */}
        <div className="flex items-center space-x-6">
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
        </div>
        </header>
  );
}
