import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar, AiOutlineTag, AiOutlineFileText } from 'react-icons/ai';
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
    <div className="p-6 min-h-screen">
      <h1 className="text-black text-2xl font-bold mb-6 mt-16">Active Appraisals</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {appraisals.map((appraisal) => (
          <div key={appraisal.id} className="bg-primary-dark rounded-xl shadow-lg p-5 transition">
            
            <h2 className="text-black text-xl font-semibold mb-2 flex items-center">
              <AiOutlineFileText className="mr-2 text-accent" />
              {appraisal.title}
            </h2>

            <p className="text-black text-sm mb-1 flex items-center">
              <AiOutlineTag className="mr-2 text-accent" />
              Type: {appraisal.type}
            </p>

            <p className="text-black text-sm mb-1 flex items-center">
              <AiOutlineCalendar className="mr-2 text-accent" />
              Start: {appraisal.startDate}
            </p>

            <p className="text-black text-sm mb-4 flex items-center">
              <AiOutlineCalendar className="mr-2 text-accent" />
              End: {appraisal.endDate}
            </p>

            <button
              onClick={() => navigate(`/reviews/manage/${appraisal.id}`)}
              className="bg-accent text-white font-semibold px-4 py-2 rounded-md hover:bg-accent-dark transition"
            >
              View / Manage
            </button>
          </div>
        ))}
      </div>

      {appraisals.length === 0 && (
        <p className="text-black text-center mt-10">No active appraisals found. View reports tab for closed ones</p>
      )}
    </div>
  );
};

export default SentAppraisalsList;
