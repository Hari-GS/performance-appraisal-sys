import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import DepartmentProgressChart from "../components/DepartmentProgressChart";
import ReviewCompletionChart from "../components/ReviewCompletionChart";
import RecentActivity from "../components/RecentActivity";
import QuickActions from "../components/QuickActions";
import { request } from "../helpers/axios_helpers";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [recentAppraisal, setRecentAppraisal] = useState(null);
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    selfReviewsCompleted: 0,
    reportingReviewsCompleted: 0,
    totalReportingReviewsToDo: 0,
  });
  const navigate = useNavigate();

  // --- Fetch Dashboard Summary ---
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await request("GET", "/api/dashboard/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard summary", error);
      }
    };

    fetchSummary();
  }, []);

  const { totalEmployees, selfReviewsCompleted, reportingReviewsCompleted, totalReportingReviewsToDo } = summary;

  // --- Fetch Recent Appraisal ---
  useEffect(() => {
    const fetchRecentAppraisal = async () => {
      try {
        const response = await request("GET", "/api/appraisals/recent");
        setRecentAppraisal(response.data);
      } catch (error) {
        console.error("Failed to fetch recent appraisal:", error);
      }
    };

    fetchRecentAppraisal();
  }, []);

  return (
    <div className="flex min-h-screen bg-primary">
      {/* Sidebar */}
      <Sidebar role={"hr"} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow pl-72 p-6 pt-20">
        <Header />

        {/* ✅ Recent Appraisal Section */}
        <div className="bg-primary-dark rounded-xl shadow-md p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-2">Latest Appraisal</h2>

          {recentAppraisal ? (
            <div className="space-y-1 text-black capitalize">
              <p>
                <span className="font-semibold text-accent">Title:</span>{" "}
                {recentAppraisal.title || "_"}
              </p>
              <p>
                <span className="font-semibold text-accent">Type:</span>{" "}
                {recentAppraisal.type || "_"}
              </p>
              <p>
                <span className="font-semibold text-accent">Stage:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-md text-sm font-medium ${
                    recentAppraisal.stage === "CLOSED"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {recentAppraisal.stage || "_"}
                </span>
              </p>
              <p>
                <span className="font-semibold text-accent">Duration:</span>{" "}
                {recentAppraisal.startDate || "_"} → {recentAppraisal.endDate || "_"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <p className="text-gray-600 text-lg mb-4">
                No recent or ongoing appraisals found.
              </p>
              <button
                onClick={() => navigate("/forms")}
                className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                <FaPlusCircle /> Start Your First Appraisal
              </button>
            </div>
          )}
        </div>

        {/* Summary Cards (shows underscore placeholders) */}
        <SummaryCards/>

        {/* Charts Section */}
        <div className="flex flex-row justify-between bg-primary-dark p-6 rounded-xl mt-6 space-x-4">
          <ReviewCompletionChart
            title="Self Reviews Completion"
            completionValue={
              totalEmployees > 0
                ? (selfReviewsCompleted / totalEmployees) * 100
                : 0
            }
          />
          <ReviewCompletionChart
            title="Reporting Reviews Completion"
            completionValue={
              totalReportingReviewsToDo > 0
                ? (reportingReviewsCompleted / totalReportingReviewsToDo) * 100
                : 0
            }
          />
        </div>

        {/* Additional Sections */}
        <QuickActions />
      </div>

      <Navbar title="Dashboard" />
    </div>
  );
};

export default Dashboard;
