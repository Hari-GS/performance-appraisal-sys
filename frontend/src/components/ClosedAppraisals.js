import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../helpers/axios_helpers";
import {
  FaRegFileAlt,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const ClosedAppraisals = () => {
  const [appraisals, setAppraisals] = useState([]);
  const navigate = useNavigate();

  const stageColors = {
    CREATED: "text-gray-700",
    SELF_REVIEW: "text-yellow-700",
    REPORTING_REVIEW: "text-blue-700",
    HR_REVIEW: "text-purple-700",
    CLOSED: "text-green-700",
  };

  const stageIcons = {
    CREATED: <FaRegFileAlt />,
    SELF_REVIEW: <FaArrowRight className="animate-pulse" />,
    REPORTING_REVIEW: <FaArrowRight className="animate-pulse" />,
    HR_REVIEW: <FaArrowRight />,
    CLOSED: <FaCheckCircle />,
  };

  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        const response = await request("GET", "api/new-employees/closed-appraisals");
        setAppraisals(response.data);
      } catch (error) {
        console.error("Failed to fetch appraisals", error);
      }
    };

    fetchAppraisals();
  }, []);

  const handleGoTo = (appraisal) => {
    navigate(`/employee/appraisal/${appraisal.appraisalId}`,  { state: { appraisal } });
  };

  return (
    <div className="p-6 w-full mt-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <FaRegFileAlt className="text-accent text-2xl" />
        <h2 className="text-xl font-bold text-gray-900">
          Closed Appraisals Of You
        </h2>
      </div>

      {appraisals.length === 0 ? (
        <p className="text-gray-600">No active appraisals available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appraisals.map((appraisal) => {
            const progressPercent = Math.round(
              (appraisal.questionsAnswered / appraisal.totalQuestions) * 100
            );

            return (
              <div
                key={appraisal.appraisalId}
                className="bg-primary-dark rounded-xl p-4 shadow-sm border border-gray-200"
              >
                {/* Title */}
                <div>
                  <p className="text-sm text-gray-500">Appraisal Title</p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {appraisal.title}
                  </h3>
                </div>

                {/* Deadline */}
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaClock className="text-accent" />
                    <span>{appraisal.endDate}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Current Stage</p>
                  <div
                    className={`flex items-center gap-2 font-medium w-fit px-3 py-1 rounded-full text-sm ${stageColors[appraisal.stage]}`}
                  >
                    {stageIcons[appraisal.stage]}
                    <span>{appraisal.stage.replaceAll("_", " ")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClosedAppraisals;
