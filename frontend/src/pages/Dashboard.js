import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UserInfoCard from "../components/UserInfoCard"
// import { UserInfoCard } from "./components/UserInfoCard";
import CreateFormButton from "../components/CreateFormButton";
// import { PerformanceReport } from "./components/PerformanceReport";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex flex-col flex-grow p-6 bg-gray-100">
        <Navbar/>
        <UserInfoCard name="Lingesvaran.R" role="UI/UX Designer" />
        <CreateFormButton onClick={() => alert("Create Form Clicked")} />
        {/*<PerformanceReport /> */}
      </div>
    </div>
  );
};

export default Dashboard;
