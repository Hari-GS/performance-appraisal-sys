import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { request } from '../helpers/axios_helpers';
import { useNavigate } from 'react-router-dom';

const SentAppraisalsList = () => {
  const [appraisals, setAppraisals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppraisals();
  }, []);

  const fetchAppraisals = async () => {
    try {
      const response = await request('GET', '/api/appraisals');
      setAppraisals(response.data || []);
    } catch (error) {
      console.error('Failed to fetch appraisals', error);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 px-4 sm:px-6 py-3 gap-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <h2 className="text-base font-semibold text-gray-800">
            Manage Appraisals
          </h2>
          <p className="text-sm text-gray-500 leading-tight sm:leading-normal">
            — Track and manage active appraisals
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        gap-4 
        px-4 
        sm:px-6 
        py-6
      ">
        {appraisals.map((appraisal) => (
          <div
            key={appraisal.id}
            className="bg-primary rounded border-2 p-4 sm:p-5 transition w-full"
          >
            <h2 className="text-black text-lg sm:text-xl font-semibold mb-2 flex items-center">
              {appraisal.title} - {appraisal.type}
            </h2>

            <p className="text-black text-sm mb-1 flex items-center">
              <AiOutlineCalendar className="mr-2 text-accent" />
              Starts at {appraisal.startDate}
            </p>

            <p className="text-black text-sm mb-4 flex items-center">
              <AiOutlineCalendar className="mr-2 text-accent" />
              Ends at {appraisal.endDate}
            </p>

            <button
              onClick={() => navigate(`/reviews/manage/${appraisal.id}`)}
              className="bg-accent w-full sm:w-auto text-white font-semibold px-4 py-2 rounded-md hover:bg-accent-dark transition"
            >
              View / Manage
            </button>
          </div>
        ))}
      </div>

      {appraisals.length === 0 && (
        <p className="text-black text-center mt-10 px-4">
          No active appraisals found. View reports tab for closed ones
        </p>
      )}
    </div>
  );
};

export default SentAppraisalsList;
