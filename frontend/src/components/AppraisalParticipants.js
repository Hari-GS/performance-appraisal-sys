import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineIdcard, AiOutlineTeam, AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../helpers/axios_helpers"; // Adjust path if needed

const AppraisalParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const { appraisalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await request("GET", `/api/reporting/${appraisalId}/participants`);
      setParticipants(response.data || []);
    } catch (error) {
      console.error("Failed to fetch participants", error);
    }
  };

  const renderStatusBadge = (status) => {
    const formatted = status
      ?.replaceAll("_", " ")
      ?.toLowerCase()
      ?.replace(/\b\w/g, (char) => char.toUpperCase()) || "Unknown";

    const colorClass =
      status === "SUBMITTED"
        ? "bg-green-100 text-green-700"
        : status === "NOT_STARTED"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700";

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}>
        {formatted}
      </span>
    );
  };

  return (
    <div className="bg-primary min-h-screen text-black font-sans p-6 pt-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-0 mt-0">Appraisal Participants</h1>
        <p className="text-gray-700">
          List of all employees participating in this appraisal cycle.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {participants.map((p) => (
          <div
            key={p.employeeId}
            className="bg-primary-dark rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-[1.02] hover:shadow-xl"
          >
            {/* Employee Name */}
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <AiOutlineUser className="text-accent mr-2" />
              {p.employeeName}
            </h2>

            {/* Employee ID */}
            <p className="text-sm flex items-center mb-1">
              <AiOutlineIdcard className="text-accent mr-2" />
              <span className="font-semibold">Employee ID:</span>&nbsp;
              {p.employeeId}
            </p>

            {/* Designation */}
            <p className="text-sm flex items-center mb-1">
              <AiOutlineIdcard className="text-accent mr-2" />
              <span className="font-semibold">Designation:</span>&nbsp;
              {p.designation}
            </p>

            {/* Manager Name */}
            <p className="text-sm flex items-center mb-3">
              <AiOutlineTeam className="text-accent mr-2" />
              <span className="font-semibold">Manager:</span>&nbsp;
              {p.managerName || "N/A"}
            </p>

            {/* Status Badges */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <AiOutlineCheckCircle className="text-accent mr-2" />
                <span className="font-semibold text-sm mr-2">Self Appraisal:</span>
                {renderStatusBadge(p.selfAppraisalStatus)}
              </div>
              <div className="flex items-center">
                <AiOutlineCheckCircle className="text-accent mr-2" />
                <span className="font-semibold text-sm mr-2">Reporting Manager Review:</span>
                {renderStatusBadge(p.reviewAppraisalStatus)}
              </div>
            </div>
            {/* View Report Button */}
            <button
              onClick={() => navigate(`/reports/${appraisalId}/${p.id}`)}
              className="bg-accent text-white font-semibold px-4 py-2 rounded-md hover:bg-accent-dark transition mt-4"
            >
              View Report
            </button>
          </div>
        ))}
      </div>

      {participants.length === 0 && (
        <p className="text-center text-gray-700 mt-10">No participants found.</p>
      )}
    </div>
  );
};

export default AppraisalParticipants;
