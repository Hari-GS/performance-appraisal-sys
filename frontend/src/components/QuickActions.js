import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {

  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 p-4 rounded-md shadow-sm mt-6">
      <h3 className="font-semibold mb-4">Quick action</h3>

      <div className="flex justify-around flex-wrap gap-4">
        {/* Start New Cycle Button */}
        <button className="bg-white px-10 py-2 rounded-md shadow text-blue-600 font-medium hover:bg-blue-50 transition" onClick={()=>{navigate("/forms/create-appraisal")}}>
          Start New cycle
        </button>

        {/* Export Reports Button */}
        <button className="bg-white px-10 py-2 rounded-md shadow text-green-600 font-medium hover:bg-green-50 transition" onClick={()=>{navigate("/forms/templates")}}>
          Edit Templates
        </button>

        {/* Settings Button */}
        <button className="bg-white px-10 py-2 rounded-md shadow text-red-500 font-medium hover:bg-red-50 transition" onClick={()=>{navigate("/reports")}}>
          Export Reports
        </button>
      </div>
    </div>
  );
}
