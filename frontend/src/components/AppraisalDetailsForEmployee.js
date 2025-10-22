import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaRegCalendarAlt,
  FaClipboardList,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaHourglassStart,
  FaInfoCircle,
  FaArrowRight 
} from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import { request } from "../helpers/axios_helpers";

const AppraisalDetailsForEmployee = () => {
  const { appraisalId } = useParams();
  const navigate = useNavigate();
  const [appraisal, setAppraisal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppraisal = async () => {
      try {
        const response = await request("GET", `/api/appraisals/${appraisalId}`);
        setAppraisal(response.data);
      } catch (error) {
        console.error("Failed to fetch appraisal details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppraisal();
  }, [appraisalId]);

  const handleNavigate = () => {
    if (appraisal.stage === "SELF_REVIEW") {
      navigate(`/employee/self-appraisal/${appraisalId}`, { state: { appraisal } });
    } else if (appraisal.stage === "REPORTING_REVIEW") {
      navigate(`/employee/self-appraisal/comments/${appraisalId}`, { state: { appraisal } });
    }
  };

  const getButtonLabel = () => {
    if (appraisal.stage === "SELF_REVIEW") return "Go to Self Appraisal";
    if (appraisal.stage === "REPORTING_REVIEW") return "Go to Reporting Review";
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading appraisal details...
      </div>
    );
  }

  if (!appraisal) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        No appraisal found.
      </div>
    );
  }

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

        {/* <div>
          <p className="text-sm text-gray-500 mb-1">Self Appraisal Questions Answered</p>
          <p className="text-base font-semibold">{appraisal.selfQnsAnswered ?? "0"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Total Self Appraisal Questions</p>
          <p className="text-base font-semibold">{appraisal.totalSelfQns}</p>
        </div> */}

        {/* Action Button */}
        {getButtonLabel() && (
          <div className="sm:col-span-2 mt-6 flex justify-center">
            <button
              onClick={handleNavigate}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              {getButtonLabel()}
              <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {/* Note for CREATED stage */}
      {appraisal.stage === "CREATED" && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 mt-1" />
          <p className="text-gray-700 text-sm">
            <strong>Note:</strong> During the <em>Self Review</em> and{" "}
            <em>Reporting Person Review</em> stages (if assigned), a <strong>“Go To”</strong>{" "}
            button will appear to take you to your appraisal form.
          </p>
        </div>
      )}
    </div>
  );
};

export default AppraisalDetailsForEmployee;
