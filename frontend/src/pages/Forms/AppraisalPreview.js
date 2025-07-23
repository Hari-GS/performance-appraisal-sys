import React from 'react';
import { FaUser, FaUsers, FaFileAlt, FaClipboardList, FaQuestionCircle, FaInbox } from 'react-icons/fa';
import ConfirmationModal from '../../components/ConfirmationModel';
import { request } from '../../helpers/axios_helpers';
import { useState } from 'react';

const AppraisalPreview = ({ formData, onBack, onSubmit }) => {
  const { basicInfo, participants, assignedRoles, questions } = formData;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);

      // Transform formData
  const payload = {
    title: basicInfo.title,
    type: basicInfo.type,
    startDate: basicInfo.startDate,
    endDate: basicInfo.endDate,
    description: basicInfo.description,

    hrId: assignedRoles.hr.id,
    managerId: assignedRoles.manager.id,
    teamLeaderId: assignedRoles.teamLeader.id,

    participants: participants.map(p => p.employeeId),  // or p.name if backend expects names

    questions: questions.map(q => ({
      text: q.text,
      showPoints: q.showPoints,
      orderIndex: q.orderIndex
    }))
  };

    try {
      const response = await request(
        'POST',
        '/api/appraisals',
        payload  // send the entire formData object
      );
  
      if (response.status === 200) {
        alert('Appraisal created successfully!');
        console.log('Appraisal Created:', response.data);
      } else {
        alert('Failed to create appraisal. Please try again.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('An error occurred while creating the appraisal.');
    }finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
    }
  };  

  return (
    <div className="bg-primary-dark rounded-xl shadow p-6 space-y-6">
      
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
        <p className="text-gray-600"><span className="font-semibold">Title:</span> {basicInfo.title || '-'}</p>
        <p className="text-gray-600"><span className="font-semibold">Type:</span> {basicInfo.type || '-'}</p>
        <p className="text-gray-600"><span className="font-semibold">Start Date:</span> {basicInfo.startDate || '-'}</p>
        <p className="text-gray-600"><span className="font-semibold">End Date:</span> {basicInfo.endDate || '-'}</p>
        <p className="text-gray-600"><span className="font-semibold">Description:</span> {basicInfo.description || '-'}</p>
      </div>

      {/* Divider */}
      <hr />

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
            {participants.map((p, idx) => (
              <li key={idx}>{p.name || `Participant ${idx + 1}`}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Divider */}
      <hr />

      {/* Assigned Roles */}
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b pb-1">
          <FaUser className="text-orange-400" /> Assigned Roles
        </h3>
        <p className="text-gray-600"><span className="font-semibold">HR:</span> {assignedRoles.hr.name || '-'}</p>
        <p className="text-gray-600"><span className="font-semibold">Manager:</span> {assignedRoles.manager.name || '-'}</p>
        <p className="text-gray-600"><span className="font-semibold">Team Leader:</span> {assignedRoles.teamLeader.name || '-'}</p>
      </div>

      {/* Divider */}
      <hr />

      {/* Questions */}
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b pb-1">
          <FaQuestionCircle className="text-orange-400" /> Appraisal Questions
        </h3>
        {questions.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            <FaInbox className="text-2xl mx-auto mb-1" />
            No questions added yet.
          </div>
        ) : (
          <ol className="list-decimal ml-6 text-gray-700 text-sm space-y-1">
            {questions.map((q, idx) => (
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

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={onBack}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm font-medium"
        >
          Back
        </button>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-accent text-white px-5 py-2 rounded text-sm font-medium hover:bg-orange-600"
        >
          Confirm & Submit
        </button>
      </div>
      {showConfirmModal && (
        <ConfirmationModal
          title="Confirm Submission"
          message="Are you sure you want to submit this appraisal? This action cannot be undone."
          onConfirm={handleSubmit}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
};

export default AppraisalPreview;
