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
import TopHeader from "../components/TopHeader";
import { ReactComponent as ChartBarHorizontal } from "../images/Appraisal-Icons/ChartBarHorizontal.svg";

const Dashboard = () => {
  const [recentAppraisal, setRecentAppraisal] = useState(null);
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    selfReviewsCompleted: 0,
    reportingReviewsCompleted: 0,
    totalReportingReviewsToDo: 0,
  });
  const navigate = useNavigate();

  const appraisal = {
    startDate: "25 Oct",
    endDate: "20 Nov",
    status: "Active",
  };

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

  function formatStageName(stage) {
    if (!stage) return "";
    return stage
      .toLowerCase()
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="w-full min-h-screen">
      <TopHeader breadcrumbs={["Dashboard"]}/>
    
      <div className="flex bg-primary">
        {/* Sidebar */}
        <Sidebar role={"hr"} /> 

        {/* Main Content */}
        <div className="flex flex-col flex-grow pt-0 pl-0 md:pl-64 transition-all">          
          <Header />
          <div className="flex flex-col md:flex-row md:items-start overflow-x-auto p-2 md:p-0">
            <div className="bg-white border border-gray-200 shadow-sm py-5 w-full md:w-80 shrink-0">
              {recentAppraisal ? 
              (
                <div className=" pl-6">
                {/* Icon */}
                <ChartBarHorizontal/>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {recentAppraisal.title} - {recentAppraisal.type}
                </h2>

                {/* Dates */}
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Start Date</span> - {recentAppraisal.startDate}
                </p>
                <p className="text-sm text-gray-800 mb-4">
                  <span className="font-medium">End Date</span> - {recentAppraisal.endDate}
                </p>

                {/* Stage Badge */}
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    appraisal.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {formatStageName(recentAppraisal.stage)}
                </span>
                </div>
              ):
              (
                <div className="p-6 h-40 flex items-center justify-center text-center">
                  <p className="text-gray-600 text-sm font-medium">
                    No recent or ongoing appraisals found.
                  </p>
                </div>
              )

              }
              
              
            </div>
            {/* Summary Cards (shows underscore placeholders) */}
            <SummaryCards/>
          </div>
          
    

          

          {/* Charts Section */}
          <div className="flex flex-col md:flex-row justify-between md:p-0">
            <ReviewCompletionChart
              title="Self Reviews Completion"
              totalEmployees={totalEmployees}
              textLabel="Total Participants"
              completionValue={
                totalEmployees > 0
                  ? (selfReviewsCompleted / totalEmployees) * 100
                  : 0
              }
            />
            <ReviewCompletionChart
              title="Reporting Reviews Completion"
              totalEmployees={totalReportingReviewsToDo}
              textLabel="Total Reporting Reviews"
              completionValue={
                totalReportingReviewsToDo > 0
                  ? (reportingReviewsCompleted / totalReportingReviewsToDo) * 100
                  : 0
              }
            />
          </div>

          {/* Additional Sections */}
          {/* <QuickActions /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
