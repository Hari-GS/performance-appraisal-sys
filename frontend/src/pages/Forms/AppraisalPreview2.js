import React, { useState } from 'react';
import {
  FaUser, FaUsers, FaFileAlt, FaClipboardList,
  FaQuestionCircle, FaInbox, FaFileSignature
} from 'react-icons/fa';
import ConfirmationModal from '../../components/ConfirmationModel';
import { request } from '../../helpers/axios_helpers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppraisalPreview2 = ({ formData, onBack, onSubmit }) => {
  const { basicInfo, participants } = formData;
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setIsLoading(true);
    const payload = {
      title: basicInfo.title,
      type: basicInfo.type,
      startDate: basicInfo.startDate,
      endDate: basicInfo.endDate,
      description: basicInfo.description,
      selfAppraisalEndDate: basicInfo.selfAppraisalEndDate,
      createdAt: new Date().toISOString().split('T')[0],

      participants: participants.map((p) => ({
        employeeId: p.employeeId,
        employeeName: p.name,
        questions: p.questions.map((ques) => ({
          text: ques.text,
          showPoints: ques.showPoints,
          orderIndex: ques.orderIndex,
        }))
      }))
    };
    

    try {
      const res = await request('POST', '/api/appraisals', payload);
      if (res.status === 200) {
        console.log('Appraisal Created:', res.data);
        // ✅ Show success toast
        toast.success('Appraisal created successfully!');
        setTimeout(() => navigate('/reviews'), 1000);
        onSubmit?.(); // optional callback
      } else {
        toast.error('Failed to create appraisal.');
      }
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-primary border-2 rounded-xl p-6 space-y-6 shadow-[0_0_8px_rgba(0,0,0,0.15)]">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-md flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mb-3"></div>
            <p className="text-gray-700 font-medium">
              Creating Appraisal, Please Wait..
            </p>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black flex items-center gap-2">
          Appraisal Form Preview
        </h2>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl border-2 p-4 space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b-2 pb-1">
          <FaFileAlt className="text-orange-400" /> Basic Information
        </h3>
        <p className="text-gray-600"><strong>Title:</strong> {basicInfo.title || '-'}</p>
        <p className="text-gray-600"><strong>Type:</strong> {basicInfo.type || '-'}</p>
        <p className="text-gray-600"><strong>Start Date:</strong> {basicInfo.startDate || '-'}</p>
        <p className="text-gray-600"><strong>Self Review End / Reporting Review Start Date:</strong> {basicInfo.selfAppraisalEndDate || '-'}</p>
        <p className="text-gray-600"><strong>End Date:</strong> {basicInfo.endDate || '-'}</p>
        <p className="text-gray-600"><strong>Welcome Message:</strong> {basicInfo.description || '-'}</p>
      </div>

      {/* Participants */}
      <div className="bg-white rounded-xl border-2 p-4 space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b-2 pb-1">
          <FaUsers className="text-orange-400" /> Participants
        </h3>
        {participants.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            <FaInbox className="text-2xl mx-auto mb-1" />
            No participants added.
          </div>
        ) : (
          <ul className="list-disc ml-6 text-gray-600 text-sm">
            {participants.map((p) => (
              <li key={p.employeeId}>{p.name || `Employee ${p.employeeId}`}</li>
            ))}
          </ul>
        )}
      </div>
      {/* Individual Questions by Participant */}
      <div className="bg-white rounded-xl border-2 p-4 space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b-2 pb-1">
          <FaQuestionCircle className="text-orange-400" /> Self Appraisal Questions for Participants
        </h3>

        {participants.map((emp) => {
          const empQuestions = emp.questions || [];

          return (
            <div key={emp.employeeId} className="space-y-1">
              <div className="flex items-center gap-2 font-semibold text-md text-gray-700 border-b-2 pb-1 mt-3">
                {emp.name} ({emp.employeeId})
              </div>

              <p className="text-gray-700 text-sm ml-6">
                Total Questions:{" "}
                <span className="font-semibold">{empQuestions.length}</span>
              </p>
            </div>
          );
        })}

      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={()=>navigate("/forms")}
          className=" px-4 py-2 rounded hover:bg-orange-50 text-sm font-medium border-2"
        >
          Cancel
        </button>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-accent text-white px-5 py-2 rounded text-sm font-medium hover:bg-accent-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Confirm & Create"}
        </button>
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          title="Confirm Creation"
          message="Are you sure you want to create this appraisal? Email notifications will be sent for all participants"
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default AppraisalPreview2;
