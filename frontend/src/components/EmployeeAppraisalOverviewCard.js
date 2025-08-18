import { FaRegFileAlt, FaClock, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import React from 'react'

const EmployeeAppraisalOverviewCard = () => {
  // Static data
  const appraisal = {
    title: "Mid-Year Performance Review",
    deadline: "31 Aug 2025",
    status: "In Progress", // Options: Not Started / In Progress / Submitted
  };

  const statusColors = {
    "Not Started": "text-accent-darker",
    "In Progress": "text-accent",
    "Submitted": "text-green-600",
  };

  return (
    <div className="bg-primary-dark rounded-2xl shadow-md p-6 flex flex-col gap-4 mt-6 w-[50%]">
      <div className="flex items-center gap-3">
        <FaRegFileAlt className="text-black text-2xl" />
        <h2 className="text-xl font-bold text-black">Current Appraisal</h2>
      </div>

      <div className="space-y-2 pl-1">
        <p className="text-sm text-gray-500">Appraisal Title</p>
        <h3 className="text-lg font-semibold text-black">{appraisal.title}</h3>

        <p className="text-sm text-gray-500 mt-3">Deadline</p>
        <div className="flex items-center gap-2 text-black">
          <FaClock />
          <span>{appraisal.deadline}</span>
        </div>

        <p className="text-sm text-gray-500 mt-3">Status</p>
        <div className={`flex items-center gap-2 font-medium ${statusColors[appraisal.status]}`}>
          {appraisal.status === "Submitted" ? (
            <FaCheckCircle />
          ) : (
            <FaArrowRight />
          )}
          <span>{appraisal.status}</span>
        </div>
      </div>

      <button className="mt-4 px-4 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg self-start transition-all duration-300">
        Go to Appraisal
      </button>
    </div>
  );
};

export default EmployeeAppraisalOverviewCard;
