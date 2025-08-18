import React from "react";
import { FaUserTie, FaArrowRight, FaUserEdit, FaRegComments, FaClipboardCheck } from "react-icons/fa";

const EvaluatorsCard = () => {
  // --- Static evaluator data ---
  const evaluators = [
    { name: "Anita Sharma", designation: "Reporting Manager" },
    { name: "Rajesh Patel", designation: "HR Manager" }
  ];

  return (
    <div className="bg-primary-dark rounded-2xl shadow-md p-6 flex flex-col gap-4 w-full mt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <FaUserTie className="text-black text-2xl" />
        <h2 className="text-xl font-bold text-black">Evaluators</h2>
      </div>

      {/* Evaluator list */}
      <div className="flex gap-12 flex-wrap text-black">
        {evaluators.map((evaluator, index) => (
          <div key={index} className="min-w-[180px]">
            <p className="font-semibold">{evaluator.name}</p>
            <p className="text-sm text-gray-500">{evaluator.designation}</p>
          </div>
        ))}
      </div>

      <hr className="my-3 border-gray-500" />

      {/* Appraisal Flow */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto text-black text-sm">
        {/* Step 1 */}
        <div className="flex flex-col items-center min-w-[100px] text-center">
          <FaUserEdit className="text-accent text-xl mb-1" />
          <span>Self Appraisal</span>
          <span className="text-xs text-gray-500">by you</span>
        </div>

        <FaArrowRight className="text-gray-400 text-lg" />

        {/* Step 2 */}
        <div className="flex flex-col items-center min-w-[100px] text-center">
          <FaRegComments className="text-accent-dark text-xl mb-1" />
          <span>Manager Review</span>
          <span className="text-xs text-gray-500">Reporting Manager</span>
        </div>

        <FaArrowRight className="text-gray-400 text-lg" />

        {/* Step 3 */}
        <div className="flex flex-col items-center min-w-[100px] text-center">
          <FaRegComments className="text-secondary-dark text-xl mb-1" />
          <span>HR Comments</span>
          <span className="text-xs text-gray-500">HR</span>
        </div>

        <FaArrowRight className="text-gray-400 text-lg" />

        {/* Step 4 */}
        <div className="flex flex-col items-center min-w-[100px] text-center">
          <FaClipboardCheck className="text-green-600 text-xl mb-1" />
          <span>Submitted</span>
          <span className="text-xs text-gray-500">Final Report</span>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorsCard;
