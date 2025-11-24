import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../helpers/axios_helpers";
import {
  FaRegFileAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const EmployeeCurrentAppraisalsCards = () => {
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
        const response = await request("GET", "api/new-employees/active-appraisals");
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
    <div className="w-full mt-0">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 px-4 md:px-6 py-3 md:py-2 gap-1">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
          <h2 className="text-base font-semibold text-gray-800">
            Active Appraisals
          </h2>
          <p className="text-sm text-gray-500">
            — Appraisal cycles where you are a participant
          </p>
        </div>
      </div>

      {appraisals.length === 0 ? (
        <p className="text-gray-600 px-4">No active appraisals available.</p>
      ) : (
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-4 
          p-4 
          md:p-10
        ">
          {appraisals.map((appraisal) => {

            return (
              <div
                key={appraisal.appraisalId}
                className="bg-primary rounded p-4 border-2"
              >
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {appraisal.title} - {appraisal.type}
                </h3>

                {/* Deadline */}
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span>{appraisal.endDate}</span>
                  </div>
                </div>

                {/* Stage */}
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Current Stage</p>
                  <div
                    className={`flex items-center gap-2 font-medium w-fit px-3 py-1 rounded-full text-sm ${stageColors[appraisal.stage]}`}
                  >
                    {stageIcons[appraisal.stage]}
                    <span>{appraisal.stage.replaceAll("_", " ")}</span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleGoTo(appraisal)}
                  className="mt-4 flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-semibold transition-all group w-full md:w-auto justify-center"
                >
                  Go to Appraisal
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmployeeCurrentAppraisalsCards;
