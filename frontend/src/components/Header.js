import React, { useState, useEffect } from "react";
import { FaPlus, FaSyncAlt, FaCalendarAlt, FaCaretDown } from "react-icons/fa";
import { request } from "../helpers/axios_helpers";
import { ReactComponent as PlusIcon } from "../images/Appraisal-Icons/PlusSquare.svg";
import { ReactComponent as CloudIcon } from "../images/Appraisal-Icons/CloudArrowDown.svg";
import { useNavigate } from "react-router-dom";
import ProtectedView from "./ProtectedView";

export default function Header() {
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();
  const [year, setYear] = useState("2025");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await request("GET", "/auth/me");
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-6 py-4 bg-white border-b border-gray-200 gap-6 md:gap-3">
      {/* Left: Greeting */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Hello {userInfo.name}, Welcome Back!
        </h1>
        <p className="text-gray-500 text-sm">{userInfo.designation}</p>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:pb-0 pb-2">
        <ProtectedView allowedRoles={["hr"]}>
          {/* Add New Cycle */}
          <button className="flex items-center space-x-2 border border-gray-300 px-3 md:px-4 py-2 rounded-md hover:bg-orange-100 transition" onClick={()=>navigate("/forms/create-appraisal")}>
            <PlusIcon/>
            <span className="text-gray-500 font-medium text-sm whitespace-nowrap">Add New Cycle</span>
          </button>
        </ProtectedView>
    
        {/* Export */}
        {/* <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-orange-50 transition">
          <CloudIcon/>
          <span className="text-gray-500 font-medium text-sm">Export</span>
        </button> */}

        {/* Year Selector */}
        {/* <button className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-orange-50 transition">
          <FaCalendarAlt className="text-orange-500" />
          <span className="text-gray-500 font-medium text-sm">{year}</span>
          <FaCaretDown className="text-gray-500 text-xs" />
        </button> */}
      </div>
    </div>
  );
}
