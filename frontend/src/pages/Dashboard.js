import React from "react";
import { useAuth } from "../context/AuthContext";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserInfoCard from "../components/UserInfoCard"
// import { UserInfoCard } from "./components/UserInfoCard";
import CreateFormButton from "../components/CreateFormButton";
import PerformanceReport from "../components/PerformanceReport";

const Dashboard = () => {
//   const { logout } = useAuth();
  return (
    <div>
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<Sidebar />
			{/* Main Content */}
			<div className="flex flex-col flex-grow pl-72 p-6 pt-20 bg-gray-100">
				<UserInfoCard/>
				<CreateFormButton onClick={() => alert("Create Form Clicked")} />
				<PerformanceReport />
			</div>
		</div>
		<Navbar title="Dashboard"/>
    </div>
    
  );
};

export default Dashboard;
