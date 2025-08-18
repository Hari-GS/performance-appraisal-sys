import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeCurrentAppraisalsCards from "../components/EmployeeCurrentAppraisalsCards";

const EmployeeCurrentAppraisal = () => {

  return (
    <div>
		<div className="flex min-h-screen bg-primary">
			{/* Sidebar */}
			<Sidebar role={"employee"}/>
			{/* Main Content */}
			<div className="flex flex-col flex-grow pl-72 p-6 pt-20">
				<EmployeeCurrentAppraisalsCards/>
			</div>
		</div>
		<Navbar title="Current Appraisals"/>
    </div>
    
  );
};

export default EmployeeCurrentAppraisal;
