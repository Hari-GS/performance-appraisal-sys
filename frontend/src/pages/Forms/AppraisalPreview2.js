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
    <div className="bg-primary-dark rounded-xl shadow p-6 space-y-6">
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
          <FaClipboardList className="text-orange-400" />
          Appraisal Form Preview
        </h2>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b pb-1">
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
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b pb-1">
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
      <div className="bg-white rounded-xl shadow p-4 space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b pb-1">
          <FaQuestionCircle className="text-orange-400" /> Questions by Participant
        </h3>

        {participants.map((emp) => {
          const empQuestions = emp.questions || [];

          return (
            <div key={emp.employeeId} className="space-y-1">
              <div className="flex items-center gap-2 font-semibold text-md text-gray-700 border-b pb-1 mt-3">
                <FaFileSignature className="text-accent" />
                {emp.name} ({emp.employeeId})
              </div>

              {empQuestions.length === 0 ? (
                <p className="text-gray-500 text-sm italic ml-6">No questions assigned.</p>
              ) : (
                <ol className="list-decimal ml-6 space-y-1 text-gray-700 text-sm">
                  {empQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        {q.text || `Question ${idx + 1}`}
                        {q.showPoints && (
                          <span className="ml-2 bg-green-100 text-green-600 rounded-full text-xs px-2 py-0.5">
                            Points Shown
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={()=>navigate("/forms")}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-accent text-white px-5 py-2 rounded text-sm font-medium hover:bg-orange-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Confirm & Create"}
        </button>
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          title="Confirm Creation"
          message="Are you sure you want to create this appraisal?"
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default AppraisalPreview2;
