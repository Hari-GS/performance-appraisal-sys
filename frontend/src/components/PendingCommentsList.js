import React, { useEffect, useState } from 'react';
import { AiOutlineUser, AiOutlineIdcard } from 'react-icons/ai';
import { request } from '../helpers/axios_helpers';
import { useNavigate, useParams } from 'react-router-dom';

const PendingCommentsList = () => {
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();
  const { appraisalId } = useParams();

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await request('GET', `/api/reporting/summary/${appraisalId}`);
      setPeople(response.data || []);
    } catch (error) {
      console.error('Failed to fetch pending comments list', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-black text-2xl font-bold mb-6 mt-16">Pending Comments</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-primary-dark rounded-xl shadow-lg p-5 transition border border-gray-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-black text-xl font-semibold flex items-center">
                <AiOutlineUser className="mr-2 text-accent" />
                {person.employeeName}
              </h2>

              {/* ✅ Status badge */}
              {person.reviewAppraisalStatus === 'SUBMITTED' ? (
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Completed
                </span>
              ) : (
                <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                  Pending
                </span>
              )}
            </div>

            <p className="text-black text-sm mb-1 flex items-center">
              <AiOutlineIdcard className="mr-2 text-accent" />
              Employee ID: {person.employeeId}
            </p>

            <p className="text-black text-sm mb-4 flex items-center">
              <AiOutlineIdcard className="mr-2 text-accent" />
              Designation: {person.designation}
            </p>
            <button onClick={() => navigate(`/employee/self-appraisal/comments/${appraisalId}/${person.employeeId}`)} 
            className="bg-accent text-white font-semibold px-4 py-2 rounded-md hover:bg-accent-dark transition" > 
              Give Comment 
            </button>
          </div>
        ))}
      </div>

      {people.length === 0 && (
        <p className="text-black text-center mt-10">No pending comments found.</p>
      )}
    </div>
  );
};

export default PendingCommentsList;
