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
    <div className="w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 px-6 py-2 gap-1">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
          <h2 className="text-base md:text-base font-semibold text-gray-800">
            Comment Subordinates
          </h2>

          <p className="text-xs md:text-sm text-gray-500">
            — Give comment to your subordinate's self appraisal
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        gap-4 
        md:gap-6 
        p-4 
        md:p-8
      ">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-primary rounded p-4 md:p-5 border-2 transition"
          >
            {/* Title + Status */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-2">
              
              <h2 className="text-black text-lg md:text-xl font-semibold flex items-center">
                <AiOutlineUser className="mr-2 text-accent" />
                {person.employeeName}
              </h2>

              {/* Status */}
              {person.reviewAppraisalStatus === 'SUBMITTED' ? (
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit">
                  Completed
                </span>
              ) : (
                <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full w-fit">
                  Pending
                </span>
              )}
            </div>

            {/* Employee ID */}
            <p className="text-black text-sm mb-1">
              Employee ID: {person.employeeId}
            </p>

            {/* Designation */}
            <p className="text-black text-sm mb-4">
              Designation: {person.designation}
            </p>

            {/* Button */}
            <button
              onClick={() =>
                navigate(`/employee/self-appraisal/comments/${appraisalId}/${person.employeeId}`)
              }
              className="
                bg-accent 
                text-white 
                font-semibold 
                px-4 py-2 
                rounded-md 
                hover:bg-accent-dark 
                transition 
                w-full md:w-auto
              "
            >
              Give Comment
            </button>
          </div>
        ))}
      </div>

      {people.length === 0 && (
        <p className="text-gray-500 text-center mt-36">You have no subordinates to comment</p>
      )}
    </div>
  );
};

export default PendingCommentsList;
