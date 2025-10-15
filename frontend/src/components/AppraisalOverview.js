import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import ForceMoveModel from './ForceMoveModel';
import { request } from '../helpers/axios_helpers';
import { toast } from 'react-toastify';

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

  if (!appraisal) return null;

  const currentStageIndex = stageOrder.indexOf(appraisal.stage);
  const nextStage = stageOrder[currentStageIndex + 1] || null;

  const handleForceMove = async () => {
    await forceMoveAppraisal(appraisal.id);
    setShowModal(false);
  };

  const forceMoveAppraisal = async () => {
    setLoading(true);
    try {
      await request('PUT', `/api/appraisals/${appraisal.id}/force-move`);
      const res = await request('GET', `/api/appraisals/${appraisal.id}`);
      setAppraisal(res.data);
      setShowModal(false);
      toast.success('Appraisal moved to next stage successfully');
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
    <div className="bg-primary min-h-screen text-black font-sans p-6 pt-28">
      {/* Header */}
      <div className="bg-primary-dark rounded-2xl p-6 shadow-lg mb-8">
        <div className="text-black space-y-3">
          <h1 className="text-3xl font-bold">{appraisal.title}</h1>

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
        {nextStage && (
          <div className="mt-6">
            <button
              className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
              onClick={() => setShowModal(true)}
            >
              Force Move to Next Phase
            </button>
          </div>
        )}
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
      {appraisal.stage === 'REPORTING_REVIEW' || appraisal.stage === 'HR_REVIEW' || appraisal?.stage === 'CLOSED' && (
        <div className="bg-primary-dark rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black">Reporting Person Review</h2>
          {loadingReviewData ? (
            <p className="text-gray-600 text-sm">Loading...</p>
          ) : reportingReviewData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-black">
                    <th className="px-4 py-2">Reviewer Emp ID</th>
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
                      <tr key={index} className="bg-primary rounded-xl">
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
        <div className="bg-primary-dark rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-black">Employee Self Appraisals</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-black">
                  <th className="px-4 py-2">Employee ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Manager</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appraisal.participants.map((emp, index) => (
                  <tr key={index} className="bg-primary rounded-xl">
                    <td className="px-4 py-3">{emp.employeeId}</td>
                    <td className="px-4 py-3">{emp.employeeName}</td>
                    <td className="px-4 py-3">{emp.designation}</td>
                    <td className="px-4 py-3">{emp.managerName}</td>
                    <td className="px-4 py-3">
                      {renderStatusBadge(emp.selfAppraisalStatus)}
                    </td>
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
