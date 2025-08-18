// SelfAppraisalProgressCard.jsx
import { FaTasks, FaArrowRight, FaClock } from "react-icons/fa";
import React from "react";

const SelfAppraisalProgressCard = () => {
  // --- static demo data ---
  const answered   = 6;   // number of questions the employee has answered
  const total      = 10;  // total questions
  const percentage = Math.round((answered / total) * 100);

  return (
    <div className="bg-primary-dark rounded-2xl shadow-md p-6 flex flex-col gap-4 w-[50%] mt-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <FaTasks className="text-secondary text-2xl" />
        <h2 className="text-xl font-bold text-secondary">Self Appraisal Progress</h2>
      </div>
      <p className="text-sm text-gray-500 mt-3">Deadline</p>
        <div className="flex items-center gap-2 text-black">
          <FaClock />
          <span>11/12/2025</span>
        </div>

      {/* Stats */}
      <p className="text-secondary-dark font-semibold">
        {answered} of {total} questions answered
      </p>

      {/* Progress bar */}
      <div className="w-full h-3 bg-primary-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-500">{percentage}% complete</span>

      {/* CTA */}
      <button className="mt-3 px-4 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg self-start flex items-center gap-2 transition-all duration-300">
        Continue Answering <FaArrowRight className="text-sm" />
      </button>
    </div>
  );
};

export default SelfAppraisalProgressCard;
