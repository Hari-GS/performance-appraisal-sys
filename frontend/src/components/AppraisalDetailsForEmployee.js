import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegCalendarAlt,
  FaClipboardList,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaHourglassStart,
} from "react-icons/fa";
import ProgressBar from "./ProgressBar";

const AppraisalDetailsForEmployee = ({ appraisal }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (appraisal.stage === "SELF_REVIEW") {
      navigate(`/employee/self-appraisal/${appraisal.appraisalId}`, { state: { appraisal } });
    } else if (appraisal.stage === "REPORTING_REVIEW") {
      navigate(`/employee/self-appraisal/comments/${appraisal.appraisalId}`, { state: { appraisal } });
    }
  };

  const getButtonLabel = () => {
    if (appraisal.stage === "SELF_REVIEW") return "Go to Self Appraisal";
    if (appraisal.stage === "REPORTING_REVIEW") return "Go to Reporting Review";
    return null;
  };

  return (
    <div className="p-8 mt-14 w-full mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
          <FaClipboardList className="text-accent text-xl" />
          Appraisal Overview
        </h2>
      </div>

      {/* Appraisal Details Card */}
      <div className="bg-primary-dark shadow-md rounded-xl p-6 grid gap-y-4 gap-x-8 grid-cols-1 sm:grid-cols-2 text-gray-800">
        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <FaClipboardList /> Title
          </p>
          <p className="text-base font-semibold">{appraisal.title}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <FaHourglassStart /> Type
          </p>
          <p className="text-base font-semibold">{appraisal.type}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <FaRegCalendarAlt /> Start Date
          </p>
          <p className="text-base font-semibold">{appraisal.startDate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <FaRegCalendarAlt /> Self-Appraisal Ends At
          </p>
          <p className="text-base font-semibold">{appraisal.selfAppraisalEndDate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <FaRegCalendarAlt /> End Date
          </p>
          <p className="text-base font-semibold">{appraisal.endDate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <FaClock /> Created At
          </p>
          <p className="text-base font-semibold">{appraisal.createdAt}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <FaUser /> Created By
          </p>
          <p className="text-base font-semibold">{appraisal.createdBy}</p>
        </div>

        <div className="sm:col-span-2 space-y-4">
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
            <FaCheckCircle /> Current Appraisal Stage
          </p>
          <ProgressBar currentStage={appraisal.stage} />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Self Appraisal Questions Answered</p>
          <p className="text-base font-semibold">{appraisal.selfQnsAnswered ?? "0"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Total Self Appraisal Questions</p>
          <p className="text-base font-semibold">{appraisal.totalSelfQns}</p>
        </div>

        {/* Action Button */}
        {getButtonLabel() && (
          <div className="sm:col-span-2 mt-6">
            <button
              onClick={handleNavigate}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {getButtonLabel()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppraisalDetailsForEmployee;
