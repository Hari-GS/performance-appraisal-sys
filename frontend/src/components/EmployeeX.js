import React from "react";
import { FaTimes } from "react-icons/fa";

const EmployeeX = ({ employee, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[700px] relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Profile Header */}
        <div className="flex items-center space-x-4 border-b pb-4">
          <img
            src={employee.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
          />
          <div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-600">Employee ID: {employee.employeeId}</p>
            <p className="text-gray-600">Email: {employee.personalMail}</p>
            <p className="text-gray-600">Role: {employee.role}</p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="mt-4">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg font-semibold">
            Personal Details
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 border">
            <p><strong>Date of Birth:</strong> {employee.dob}</p>
            <p><strong>Date of Joining:</strong> {employee.doj}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
            <p><strong>Blood Group:</strong> {employee.bloodGroup}</p>
            <p><strong>Mobile No:</strong> {employee.mobile}</p>
            <p className="col-span-2"><strong>Address:</strong> {employee.address}</p>
            <p><strong>Personal Mail:</strong> {employee.personalEmail}</p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-4">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg font-semibold">
            Emergency Contact
          </div>
          <div className="p-4 border">
            <p><strong>Emergency Mobile No:</strong> {employee.emergencyMobile}</p>
            <p><strong>Holder Name:</strong> {employee.holderName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeX;
