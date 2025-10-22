import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { request } from '../../helpers/axios_helpers';
import imagePlaceholder from '../../images/profile-placeholder.jpg';

const AppraisalParticipants = ({ formData, setFormData, onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await request('get', 'api/new-employees/summary');
        setParticipants(response.data);

        // Auto-select all participants
        setFormData((prev) => ({
          ...prev,
          participants: response.data,
        }));
      } catch (err) {
        console.error('Error fetching participants:', err);
        setError('Failed to load participants');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [setFormData]);

  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary-dark p-6 rounded-md shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-black">Appraisal Participants:</h3>
          <span className="text-green-600 font-semibold">
            Total {participants.length} Participants Found
          </span>
        </div>
        <div className="border-white border-2"></div>

        {/* Search Bar */}
        <div className="flex justify-end my-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Employee ID or Name"
            className="border px-3 py-2 rounded text-sm w-[550px]"
          />
        </div>

        {/* Participants List */}
        <div className="bg-white border rounded overflow-y-auto max-h-80">
          {filteredParticipants.map((p) => (
            <div key={p.employeeId} className="flex items-center border-b px-4 py-3">
              <img
                src={p.avatar || imagePlaceholder}
                alt={p.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">{p.employeeId}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                {p.designation}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-sm">
          {/* <span className="text-green-600">{participants.length} Employees Found</span> */}
        </div>
      </div>

      {/* Next Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleNext}
          className="bg-accent text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
        >
          Next: Questions Mapping <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AppraisalParticipants;
