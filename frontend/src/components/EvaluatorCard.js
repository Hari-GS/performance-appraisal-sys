import React, { useEffect, useState } from "react";
import {
  FaUserTie,
  FaArrowRight,
  FaUserEdit,
  FaRegComments,
  FaClipboardCheck,
} from "react-icons/fa";
import { request } from "../helpers/axios_helpers";

const EvaluatorsCard = () => {
  const [evaluators, setEvaluators] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluators = async () => {
      try {
        const response = await request("GET", "/api/new-employees/evaluators");
        const data = response.data;
        setEvaluators(data);
      } catch (error) {
        console.error("Failed to fetch evaluators:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluators();
  }, []);

  if (loading) {
    return (
      <div className="bg-primary rounded shadow p-6 flex flex-col items-center justify-center w-full mt-6 text-gray-500">
        Loading evaluator details...
      </div>
    );
  }

  return (
    <div className="bg-primary p-6 flex flex-col gap-4 w-full border-t-2">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <FaUserTie className="text-black text-xl" />
        <h2 className="text-xl font-semibold text-black">Your Evaluators</h2>
      </div>

      {/* Evaluator list */}
      <div className="flex flex-row">
              <div className="min-w-[180px] pl-5">
                <p className="font-semibold">{evaluators?.myHrManager}</p>
                <p className="text-sm text-gray-500">HR Manager</p>
              </div>
              <div className="min-w-[180px]">
                <p className="font-semibold">{evaluators?.reportingPerson == "_" ? "Not Assigned" : evaluators?.reportingPerson}</p>
                <p className="text-sm text-gray-500">{evaluators?.reportingPersonDesignation == "_" ? "Not Assigned" : evaluators?.reportingPersonDesignation} (Reporting Manager)</p>
              </div>
      </div>
      
      <hr className="my-3 border-gray-300" />

      {/* Appraisal Flow */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto text-black text-sm">
        <div className="flex flex-col items-center min-w-[100px] text-center">
          <FaUserEdit className="text-accent text-xl mb-1" />
          <span>Self Appraisal</span>
          <span className="text-xs text-gray-500">by you</span>
        </div>

        <FaArrowRight className="text-gray-400 text-lg" />

        <div className="flex flex-col items-center min-w-[100px] text-center">
          <FaRegComments className="text-accent text-xl mb-1" />
          <span>Manager Comments</span>
          <span className="text-xs text-gray-500">by Reporting Manager</span>
        </div>

        <FaArrowRight className="text-gray-400 text-lg" />

        <div className="flex flex-col items-center min-w-[100px] text-center">
          <FaRegComments className="text-accent text-xl mb-1" />
          <span>HR Review</span>
          <span className="text-xs text-gray-500">by HR Manager</span>
        </div>

        <FaArrowRight className="text-gray-400 text-lg" />

        <div className="flex flex-col items-center min-w-[100px] text-center">
          <FaClipboardCheck className="text-accent text-xl mb-1" />
          <span>Submitted</span>
          <span className="text-xs text-gray-500">Final Report</span>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorsCard;
