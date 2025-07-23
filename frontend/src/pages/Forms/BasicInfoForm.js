import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const BasicInfoForm = ({ formData, setFormData, onNext }) => {
  const { basicInfo } = formData;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [name]: value
      }
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!basicInfo.title.trim()) newErrors.title = 'Title is required';
    if (!basicInfo.type.trim()) newErrors.type = 'Type is required';
    if (!basicInfo.startDate) newErrors.startDate = 'Start date is required';
    if (!basicInfo.endDate) newErrors.endDate = 'End date is required';
    if (!basicInfo.selfAppraisalEndDate) newErrors.selfAppraisalEndDate = 'Self-Appraisal end date is required';

    if (basicInfo.startDate && basicInfo.endDate && basicInfo.endDate < basicInfo.startDate)
      newErrors.endDate = 'End date cannot be before start date';

    if (
      basicInfo.startDate &&
      basicInfo.selfAppraisalEndDate &&
      basicInfo.selfAppraisalEndDate < basicInfo.startDate
    )
      newErrors.selfAppraisalEndDate = 'Self-Appraisal end date cannot be before start date';

    if (
      basicInfo.endDate &&
      basicInfo.selfAppraisalEndDate &&
      basicInfo.selfAppraisalEndDate > basicInfo.endDate
    )
      newErrors.selfAppraisalEndDate = 'Self-Appraisal end date cannot be after end date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary-dark p-6 rounded-md space-y-4 shadow-inner">
        <div>
          <h3 className="text-xl font-semibold text-black">Basic Information:</h3>
          <p className="text-sm text-gray-700 mt-1">
            Define the basic details of your appraisal cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-black">Cycle Name / Title:</label>
            <input
              type="text"
              name="title"
              value={basicInfo.title}
              onChange={handleChange}
              placeholder="Eg: 2025 Appraisal"
              className="w-full mt-1 px-3 py-2 border rounded text-sm"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Type */}
          <div>
            <label className="text-sm font-medium text-black">Cycle type:</label>
            <input
              type="text"
              name="type"
              value={basicInfo.type}
              onChange={handleChange}
              placeholder="Eg: Mid-Year"
              className="w-full mt-1 px-3 py-2 border rounded text-sm"
            />
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium text-black">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={basicInfo.startDate}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded text-sm"
            />
            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
          </div>

          {/* End Date */}
          <div>
            <label className="text-sm font-medium text-black">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={basicInfo.endDate}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded text-sm"
            />
            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
          </div>

          {/* Self-Appraisal End Date */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-black">Self-Appraisal End Date:</label>
            <input
              type="date"
              name="selfAppraisalEndDate"
              value={basicInfo.selfAppraisalEndDate}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded text-sm"
            />
            {errors.selfAppraisalEndDate && (
              <p className="text-red-500 text-xs mt-1">{errors.selfAppraisalEndDate}</p>
            )}
            <p className="text-xs text-gray-600 mt-1">
              This marks the deadline for employees to complete their self-appraisals. reporting person reviews begins after this date.
            </p>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-black">
              Welcome message:
            </label>
            <textarea
              name="description"
              value={basicInfo.description}
              onChange={handleChange}
              placeholder="Brief welcome message and description guide to attend this appraisal"
              rows={4}
              className="w-full mt-1 px-3 py-2 border rounded text-sm"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="w-full flex justify-end mt-4">
        <button
          onClick={handleNext}
          className="bg-accent text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-orange-600"
        >
          Next: Select Participants <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default BasicInfoForm;
