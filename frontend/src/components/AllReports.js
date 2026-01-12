import React, { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineFileText, AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { request } from "../helpers/axios_helpers";

const AllReports = () => {
  const [completedAppraisals, setCompletedAppraisals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClosedAppraisals = async () => {
      try {
        const response = await request("GET","/api/reports/closed-appraisals");
        setCompletedAppraisals(response.data);
      } catch (err) {
        setError("Failed to fetch closed appraisals. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClosedAppraisals();
  }, []);

  const renderStatusBadge = (status) => {
    const formattedStatus =
      status
        ?.replaceAll("_", " ")
        ?.toLowerCase()
        ?.replace(/\b\w/g, (char) => char.toUpperCase()) || "Unknown";

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${
          status === "CLOSED" || status === "COMPLETED"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {formattedStatus}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        <p>Loading closed appraisals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-primary text-black font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between 
                      border-b border-gray-200 px-4 sm:px-6 py-3 gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <h2 className="text-base font-semibold text-gray-800">
            Closed Appraisals
          </h2>
          <p className="text-sm text-gray-500">
            — View and download the appraisal reports of the participants
          </p>
        </div>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {completedAppraisals.map((appraisal) => (
          <div
            key={appraisal.id}
            className="bg-primary rounded p-6 border-2"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold mb-3 flex items-center capitalize">
              {appraisal.title} - {appraisal.type}
            </h2>

            {/* Dates */}
            <p className="text-sm flex items-center mb-1">
              <AiOutlineCalendar className="text-accent mr-2" />
              <span className="font-semibold">Start Date:</span>&nbsp;
              {appraisal.startDate}
            </p>

            <p className="text-sm flex items-center mb-3">
              <AiOutlineCalendar className="text-accent mr-2" />
              <span className="font-semibold">End Date:</span>&nbsp;
              {appraisal.endDate}
            </p>

            {/* Status */}
            <div className="flex items-center mb-5">
              {renderStatusBadge(appraisal.stage)}
            </div>

            {/* View Report Button */}
            <button
              onClick={() => navigate(`/reports/${appraisal.id}`)}
              className="bg-accent text-white font-semibold px-4 py-2 rounded-md hover:bg-accent-dark transition"
            >
              View Report
            </button>
          </div>
        ))}
      </div>

      {completedAppraisals.length === 0 && (
        <p className="text-center text-gray-700 mt-10">
          No completed appraisals available yet.
        </p>
      )}
    </div>
  );
};

export default AllReports;
