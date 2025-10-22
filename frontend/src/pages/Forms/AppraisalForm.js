import React from 'react';
import { FaArrowRight, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AppraisalForm = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 space-y-8 bg-primary min-h-screen">
      {/* Title Section */}
      <h1 className="text-2xl font-bold text-black">Appraisal Tools</h1>

      {/* Action Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Create Appraisal Form Card */}
        <div
          role="button"
          aria-label="Start new appraisal form"
          onClick={() => navigate('/forms/create-appraisal')}
          className="group bg-primary-dark/80 backdrop-blur-md border border-gray-200 py-10 px-8 rounded-xl shadow-md cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-200 w-full"
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
          className="group bg-primary-dark/80 backdrop-blur-md border border-gray-200 py-10 px-8 rounded-xl shadow-md cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-200 w-full"
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
