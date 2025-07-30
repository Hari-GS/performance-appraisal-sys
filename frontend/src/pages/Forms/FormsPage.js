import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import CreateForm from "./CreateForm"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParticipantsPage from "./ParticipantsPage";
import ReviewersPage from "../../components/ReviewersPage";
import AppraisalForm from "./AppraisalForm";
import CreateAppraisalFormPage from "./CreateAppraisalFormPage";
import TemplatesPage from "./TemplatesPage";
import TemplatesListPage from "./TemplatesListPage";
import TemplateEditPage from "./TemplateEditPage";

const FormsPage = () => {

  return (
    <div>
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<Sidebar role={"hr"}/>
			{/* Main Content */}
			<div className="flex flex-col flex-grow pl-72 p-6 pt-20 bg-primary">
                <Routes>
                    <Route path="/" element={<AppraisalForm/>} />
                    {/* <Route path="/participants" element={<ParticipantsPage/>} />
                    <Route path="/reviewers" element={<ReviewersPage/>} /> */}
                    <Route path="/create-appraisal" element={<CreateAppraisalFormPage/>}/>
                    <Route path="/form-templates" element={<TemplatesPage/>}/>
                    <Route path="/templates" element={<TemplatesListPage />} />
                    <Route path="/templates/:id" element={<TemplateEditPage />} />
                </Routes>
			</div>
		</div>
		<Navbar title="Forms"/>
    </div>
    
  );
};

export default FormsPage;
