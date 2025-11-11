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
    if (appraisal.stage === "SELF_REVIEW") return "Proceed to Self Appraisal";
    if (appraisal.stage === "REPORTING_REVIEW") return "Proceed to Manager Review";
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
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-800">
            Participate Appraisal
          </h2>
          <p className="text-sm text-gray-500">
            — Complete your assigned self or managerial appraisals.
          </p>
        </div>
      </div>

      {/* Appraisal Details Card */}
      <div className="bg-primary rounded p-6 grid gap-y-4 gap-x-8 m-8 grid-cols-1 sm:grid-cols-2 border-2">
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
              className="flex items-center justify-center gap-2 px-6 py-2 bg-accent text-white font-semibold text-base rounded hover:bg-accent-dark"
            >
              {getButtonLabel()}
              <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      {/* Note for CREATED stage */}
      {appraisal.stage === "CREATED" && (
        <div className="mt-6 mx-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 mt-1" />
          <p className="text-gray-700 text-sm">
            <strong>Note:</strong> During the <em>Self Review</em> and{" "}
            <em>Manager Review</em> stages (if assigned), a <strong>“Go To”</strong>{" "}
            button will appear to take you to your appraisal form.
          </p>
        </div>
      )}
    </div>
  );
};

export default AppraisalDetailsForEmployee;
