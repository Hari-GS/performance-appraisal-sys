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

const Dashboard = () => {
  const [recentAppraisal, setRecentAppraisal] = useState(null);

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

        {/* ✅ Recent Appraisal Summary Section */}
        {recentAppraisal && (
          <div className="bg-primary-dark rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-2">Recent Appraisal</h2>
            <div className="text-gray-200 space-y-1">
              <p>
                <span className="font-semibold text-accent">Title:</span>{" "}
                {recentAppraisal.title}
              </p>
              <p>
                <span className="font-semibold text-accent">Type:</span>{" "}
                {recentAppraisal.type}
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
                  {recentAppraisal.stage}
                </span>
              </p>
              <p>
                <span className="font-semibold text-accent">Duration:</span>{" "}
                {recentAppraisal.startDate} → {recentAppraisal.endDate}
              </p>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <SummaryCards />

        {/* Charts Section */}
        <div className="flex flex-row justify-between bg-primary-dark p-6 rounded-xl mt-6 space-x-4">
          <DepartmentProgressChart />
          <ReviewCompletionChart />
        </div>

        {/* Additional Sections */}
        <RecentActivity />
        <QuickActions />
      </div>

      <Navbar title="Dashboard" />
    </div>
  );
};

export default Dashboard;
