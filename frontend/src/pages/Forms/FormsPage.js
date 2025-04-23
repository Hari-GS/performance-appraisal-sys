import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import CreateForm from "./CreateForm"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticipantsPage from "./ParticipantsPage";
import ReviewersPage from "./ReviewersPage";

const FormsPage = () => {

  return (
    <div>
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<Sidebar />
			{/* Main Content */}
			<div className="flex flex-col flex-grow pl-72 p-6 pt-20 bg-gray-100">
                <Routes>
                    <Route path="/" element={<CreateForm/>} />
                    <Route path="/participants" element={<ParticipantsPage/>} />
                    <Route path="/reviewers" element={<ReviewersPage/>} />
                </Routes>
			</div>
		</div>
		<Navbar title="Forms"/>
    </div>
    
  );
};

export default FormsPage;
