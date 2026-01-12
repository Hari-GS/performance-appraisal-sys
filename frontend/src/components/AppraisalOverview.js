import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ForceMoveModel from './ForceMoveModel';
import { request } from '../helpers/axios_helpers';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import ProtectedView from './ProtectedView';

const stageDisplayMap = {
  CREATED: 'Created',
  SELF_REVIEW: 'Self Review',
  REPORTING_REVIEW: 'Reporting Person Review',
  HR_REVIEW: 'HR Review',
  CLOSED: 'Closed',
};

const stageOrder = ['CREATED', 'SELF_REVIEW', 'REPORTING_REVIEW', 'HR_REVIEW', 'CLOSED'];

export default function AppraisalOverview({ appraisal, setAppraisal }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportingReviewData, setReportingReviewData] = useState([]); // ⬅️ state for backend data
  const [loadingReviewData, setLoadingReviewData] = useState(false);
  const navigate = useNavigate();

  if (!appraisal) return null;

  const currentStageIndex = stageOrder.indexOf(appraisal.stage);
  const nextStage = stageOrder[currentStageIndex + 1] || null;

  const handleForceMove = async () => {
    await forceMoveAppraisal(appraisal.id);
    setShowModal(false);
  };

  const forceMoveAppraisal = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      await request('PUT', `/api/appraisals/${appraisal.id}/force-move`);
      const res = await request('GET', `/api/appraisals/${appraisal.id}`);
      setAppraisal(res.data);

      if(appraisal?.stage!=='CLOSED'){
        toast.success('Appraisal moved to next stage successfully');
      }
    
    } catch (error) {
      console.error(error);
      toast.error('Failed to move appraisal. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // 🧩 Fetch Reporting Review Data from Backend (only when stage is REPORTING_REVIEW)
  useEffect(() => {
    const fetchReportingReviewData = async () => {
      if (appraisal?.stage !== 'REPORTING_REVIEW' && appraisal?.stage !== 'HR_REVIEW' && appraisal?.stage !== 'CLOSED') return;
      setLoadingReviewData(true);
      if(appraisal?.stage=='CLOSED'){
        toast.success('Appraisal closed. View reports tab for report');
        navigate("/reviews")
      }
      try {
        const res = await request('GET', `/api/reporting/reviewers-summary/${appraisal.id}`);
        setReportingReviewData(res.data || []);
      } catch (error) {
        console.error('Failed to fetch reporting review data:', error);
      } finally {
        setLoadingReviewData(false);
      }
    };

    fetchReportingReviewData();
  }, [appraisal?.id, appraisal?.stage]);

  // Helper function for colored status badge
  const renderStatusBadge = (status) => {
    const formattedStatus =
      status
        ?.replaceAll('_', ' ')
        ?.toLowerCase()
        ?.replace(/\b\w/g, (char) => char.toUpperCase()) || 'Unknown';

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold 
          ${status === 'NOT_STARTED' && 'bg-red-100 text-red-700'}
          ${status === 'IN_PROGRESS' && 'bg-yellow-100 text-yellow-700'}
          ${status === 'SUBMITTED' && 'bg-green-100 text-green-700'}
        `}
      >
        {formattedStatus}
      </span>
    );
  };

  return (
    <div className="bg-primary text-black font-sans py-6 px-10">
      
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed  inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
          <SyncLoader color="#ff9700" size={12} />
          <p className="text-white mt-4 text-lg font-semibold">
            Moving appraisal to next stage, please wait...
          </p>
        </div>
      )}

      {/* Header */}
      <div className="bg-primary border-2 rounded-2xl  p-6 mb-12">
        <div className="text-black space-y-3">
          <h1 className="text-3xl font-bold">{appraisal.title} - {appraisal.type}</h1>

          <p className="text-sm text-gray-700">
            <span className="font-semibold">Created On:</span> {appraisal.createdAt}
          </p>

          <div className="mt-4 space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Self-Appraisal Starts:</span> {appraisal.startDate}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Self-Appraisal Ends / Manager Review Starts:</span> {appraisal.selfAppraisalEndDate}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Manager Review Ends:</span> {appraisal.endDate}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar currentStage={appraisal.stage} />
        </div>

        {/* Force Move Button */}
        <ProtectedView allowedRoles={["hr"]}>
          {nextStage && (
            <div className="mt-6">
              <button
                className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-accent-dark transition"
                onClick={() => setShowModal(true)}
              >
                Move to Next Phase
              </button>
            </div>
          )}
        </ProtectedView>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ForceMoveModel
          handleForceMove={handleForceMove}
          stageDisplayMap={stageDisplayMap}
          appraisal={appraisal}
          stageOrder={stageOrder}
          setShowModal={setShowModal}
        />
      )}

      {/* 🧾 Reporting Review Table (only in REPORTING_REVIEW stage) */}
      {(appraisal.stage === 'REPORTING_REVIEW' || appraisal.stage === 'HR_REVIEW' || appraisal?.stage === 'CLOSED') && (
        <div className="bg-primary mb-12">
          <h2 className="text-lg font-semibold mb-4 text-black">Reporting Person Review Status</h2>
          {loadingReviewData ? (
            <p className="text-gray-600 text-sm">Loading...</p>
          ) : reportingReviewData.length > 0 ? (
            <div className="overflow-x-auto sm:overflow-visible">
              <table className="min-w-full text-left border border-gray-300 rounded-md ">
                <thead className="bg-gray-100">
                  <tr className="text-gray-700 border-b border-gray-300">
                    <th className="px-4 py-2">Reviewer Pt ID</th>
                    <th className="px-4 py-2">Reviewer Name</th>
                    <th className="px-4 py-2">Designation</th>
                    <th className="px-4 py-2">Total Assigned</th>
                    <th className="px-4 py-2">Completed</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportingReviewData.map((rev, index) => {
                    const status = rev.allReviewsSubmitted
                      ? 'SUBMITTED'
                      : rev.completed > 0
                      ? 'IN_PROGRESS'
                      : 'NOT_STARTED';
                    return (
                      <tr key={index} className="border-b border-gray-200 transition-colors">
                        <td className="px-4 py-3">{rev.reviewerId}</td>
                        <td className="px-4 py-3">{rev.reviewerName}</td>
                        <td className="px-4 py-3">{rev.designation}</td>
                        <td className="px-4 py-3">{rev.totalAssigned}</td>
                        <td className="px-4 py-3">{rev.completed}</td>
                        <td className="px-4 py-3">{renderStatusBadge(status)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">No reviewer data found.</p>
          )}
        </div>
      )}

      {/* Employee Appraisals Table */}
      {appraisal.participants && (
        <div className="bg-primary">
          <h2 className="text-lg font-semibold mb-4 text-black">Employees Self Appraisal Status</h2>
          <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr className="text-gray-700 border-b border-gray-300">
                <th className="px-4 py-2  border-gray-300">Participant ID</th>
                <th className="px-4 py-2  border-gray-300">Name</th>
                <th className="px-4 py-2  border-gray-300">Role</th>
                <th className="px-4 py-2  border-gray-300">Manager</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {appraisal.participants.map((emp, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 transition-colors"
                >
                  <td className="px-4 py-3  border-gray-200">{emp.employeeId}</td>
                  <td className="px-4 py-3  border-gray-200">{emp.employeeName}</td>
                  <td className="px-4 py-3  border-gray-200">{emp.designation}</td>
                  <td className="px-4 py-3  border-gray-200">{emp.managerName}</td>
                  <td className="px-4 py-3">{renderStatusBadge(emp.selfAppraisalStatus)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
}
