import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../helpers/axios_helpers";

const AppraisalParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const { appraisalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await request(
        "GET",
        `/api/reporting/${appraisalId}/participants`
      );
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
    <div className="bg-primary text-black font-sans">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between 
                      border-b border-gray-200 px-4 sm:px-6 py-3 gap-1">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <h2 className="text-base font-semibold text-gray-800">Appraisal Participants</h2>
          <p className="text-sm text-gray-500">
            — List of all participants participating in this appraisal cycle.
          </p>
        </div>
      </div>

      {/* WRAP GRID IN RESPONSIVE CONTAINER */}
      <div className="w-full px-4 sm:px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {participants.map((p) => (
            <div
              key={p.employeeId}
              className="bg-primary rounded p-6 border-2"
            >
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <AiOutlineUser className="text-accent mr-2" />
                {p.employeeName}
              </h2>

              <p className="text-sm mb-1">
                <span className="font-semibold">Employee ID:</span> {p.employeeId}
              </p>

              <p className="text-sm mb-1">
                <span className="font-semibold">Designation:</span> {p.designation}
              </p>

              <p className="text-sm mb-3">
                <span className="font-semibold">Reporting Manager:</span>{" "}
                {p.managerName || "N/A"}
              </p>

              {/* STATUS */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <span className="font-semibold text-sm mr-2">Self Appraisal:</span>
                  {renderStatusBadge(p.selfAppraisalStatus)}
                </div>

                <div className="flex items-center">
                  <span className="font-semibold text-sm mr-2">
                    Reporting Manager Review:
                  </span>
                  {renderStatusBadge(p.reviewAppraisalStatus)}
                </div>
              </div>

              <button
                onClick={() => navigate(`/reports/${appraisalId}/${p.id}`)}
                className="bg-accent text-white font-semibold px-4 py-2 rounded-md 
                           hover:bg-accent-dark transition mt-4"
              >
                View Report
              </button>
            </div>
          ))}
        </div>

        {/* NO DATA */}
        {participants.length === 0 && (
          <p className="text-center text-gray-700 mt-10">No participants found.</p>
        )}
      </div>
    </div>
  );
};

export default AppraisalParticipants;
