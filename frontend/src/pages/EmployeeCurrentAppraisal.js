import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeCurrentAppraisalsCards from "../components/EmployeeCurrentAppraisalsCards";
import TopHeader from "../components/TopHeader";

const EmployeeCurrentAppraisal = () => {

  return (
    <div>
		<TopHeader breadcrumbs={["Active Appraisals"]}/>
		<div className="flex bg-primary">
			{/* Sidebar */}
			<Sidebar role={"employee"}/>
			{/* Main Content */}
			<div className="flex flex-col flex-grow pl-64 p-0 pt-0">
				<EmployeeCurrentAppraisalsCards/>
			</div>
		</div>
    </div>
    
  );
};

export default EmployeeCurrentAppraisal;
