import { useEffect } from "react";
import citLogo from "../images/cit-logo.jpg";
import placeholder from "../images/dp-default-preview.png"
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export default function TopHeader() {
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
        <header className="flex justify-end items-center px-6 py-3 bg-primary shadow-sm border-b border-gray-200">
        {/* Left Section */}
        {/* <div className="flex items-center space-x-6"> */}
            {/* Logo */}
            {/* <div className="flex items-center justify-center space-x-1 w-[200px] h-[26px]">
                <img src={citLogo} alt="cit-logo" className="h-[28px] w-auto"/>
            </div>
        </div> */}

        {/* Right Section */}
        <div className="flex items-center space-x-6">
            {/* Profile */}
            <div className="flex items-center space-x-2 cursor-pointer group px-2 py-0 rounded-md hover:bg-orange-50 hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] transition">
            <img
                src={placeholder}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800 group-hover:text-accent transition">
                {user.name}
            </span>
            <FaCaretDown className="text-gray-600 group-hover:text-orange-500 text-sm transition" />
            </div>
        </div>
        </header>
  );
}
