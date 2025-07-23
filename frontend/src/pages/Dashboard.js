import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserInfoCard from "../components/UserInfoCard"
import CreateFormButton from "../components/CreateFormButton";
import PerformanceReport from "../components/PerformanceReport";
import { getUserId } from "../helpers/axios_helpers";
import PieChartCard from "../components/PieChartCard";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import DepartmentProgressChart from "../components/DepartmentProgressChart";
import ReviewCompletionChart from "../components/ReviewCompletionChart";
import RecentActivity from "../components/RecentActivity";
import QuickActions from "../components/QuickActions";

const Dashboard = () => {

  return (
    <div>
		<div className="flex min-h-screen bg-primary">
			{/* Sidebar */}
			<Sidebar />
			{/* Main Content */}
			<div className="flex flex-col flex-grow pl-72 p-6 pt-20">
				<Header/>
				<SummaryCards />
				<div className="flex flex-row justify-between bg-primary-dark p-6 rounded-xl mt-6 space-x-4">
					<DepartmentProgressChart/>
					<ReviewCompletionChart/>
				</div>
				<RecentActivity/>
				<QuickActions/>
			</div>
		</div>
		<Navbar title="Dashboard"/>
    </div>
    
  );
};

export default Dashboard;
