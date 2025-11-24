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
      <div className="bg-primary p-6 rounded-md shadow-[0_0_8px_rgba(0,0,0,0.15)] border-2">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
          <h3 className="text-xl font-semibold text-black">
            Appraisal Participants :
          </h3>

          <span className="text-green-600 font-semibold text-sm md:text-base">
            Total {participants.length} Participants Found
          </span>
        </div>

        <div className="border-white border-2"></div>

        {/* Search Bar – enable mobile full width */}
        <div className="flex justify-end my-4 w-full">
          {/* Optional search bar future use */}
        </div>

        {/* Mobile Scroll Optimization */}
        <div className="bg-white border-2 rounded max-h-80 overflow-y-auto 
                        custom-scrollbar">

          {filteredParticipants.map((p) => (
            <div
              key={p.employeeId}
              className="flex items-center border-b px-4 py-3 
                         gap-3 md:gap-4"
            >
              <img
                src={p.avatar || imagePlaceholder}
                alt={p.name}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />

              {/* Text Responsive */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm md:text-base truncate">
                  {p.name}
                </p>
                <p className="text-gray-500 text-xs md:text-sm truncate">
                  {p.employeeId}
                </p>
              </div>

              {/* Badge Responsive */}
              <span className="text-[10px] md:text-xs px-2 py-1 rounded-full 
                               bg-orange-100 text-orange-700 whitespace-nowrap">
                {p.designation}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Next Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleNext}
          className="bg-accent text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-accent-dark"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AppraisalParticipants;
