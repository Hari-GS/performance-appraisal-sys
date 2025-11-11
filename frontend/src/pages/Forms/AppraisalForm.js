import React from 'react';
import { FaArrowRight, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AppraisalForm = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 bg-primary">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-800">
            New Appraisal
          </h2>
          <p className="text-sm text-gray-500">
            — Make sure you have required templates and participants before starting appraisal  
          </p>
        </div>
      </div>
      {/* Action Cards */}
      <div className="grid sm:grid-cols-2 gap-6 p-8">
        {/* Create Appraisal Form Card */}
        <div
          role="button"
          aria-label="Start new appraisal form"
          onClick={() => navigate('/forms/create-appraisal')}
          className="group border border-gray-300 py-10 px-8 rounded-xl cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-all duration-200 w-full"
        >
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-black text-xl">Start New Appraisal</span>
              <p className="text-sm text-gray-600 mt-1">Launch a performance review</p>
            </div>
            <FaArrowRight className="text-accent text-2xl group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Templates Card */}
        <div
          role="button"
          aria-label="View templates"
          onClick={() => navigate('/forms/templates')}
          className="group border border-gray-300 py-10 px-8 rounded-xl cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] transition-all duration-200 w-full"
        >
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-black text-xl">Templates</span>
              <p className="text-sm text-gray-600 mt-1">Use or modify saved questions</p>
            </div>
            <FaFileAlt className="text-accent text-2xl group-hover:rotate-[8deg] transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppraisalForm;
