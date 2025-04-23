import React from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ employee, onClose }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/addEmployee", { state: { employee } });
  };

  return (
    <div className="fixed inset-0 flex items-center pl-[250px] bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-3xl shadow-lg p-6 w-[1000px] h-[700px] relative mx-auto overflow-y-auto">

         {/* Top Tab Bar with Edit and Close */}
  <div className="absolute top-0 right-0 flex rounded-tr-lg overflow-hidden">
    
    {/* Edit Tab */}
    <button
      onClick={handleEdit}
      className="bg-orange-500 text-white px-6 py-2 font-semibold rounded-bl-3xl hover:bg-orange-700"
    >
      Edit
    </button>

    {/* Close Tab */}
    <button
      onClick={onClose}
      className="bg-white text-black border-l border-gray-300 px-4 py-2 font-semibold hover:bg-gray-100"
    >
      X
    </button>
  </div>

        {/* Profile Header */}
        <div className="flex items-center space-x-8 pb-4 py-10">
          <img
            src={employee.img}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-orange-500 mx-10"
          />
          <div>
            <h2 className="text-xl font-semibold">{employee.firstName} {employee.lastName}</h2>
            <p className="text-gray-600">Employee ID: {employee.employeeId}</p>
            <p className="text-gray-600">Email: {employee.personalMail}</p>
            <p className="text-gray-600">Role: {employee.role}</p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="mt-8">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg font-semibold">
            Personal Details
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 border">
            <p><strong>Date of Birth:</strong> {employee.dateOfBirth}</p>
            <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
            <p><strong>Blood Group:</strong> {employee.bloodGroup}</p>
            <p><strong>Mobile No:</strong> {employee.mobileNumber}</p>
            <p className="col-span-2"><strong>Address:</strong> {employee.address}</p>
            <p><strong>Personal Mail:</strong> {employee.personalMail}</p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg font-semibold">
            Emergency Contact
          </div>
          <div className="p-4 border flex flex-row justify-start space-x-16">
            <p><strong>Emergency Mobile No:</strong> {employee.emergencyMobileNumber}</p>
            <p><strong>Holder Name:</strong> {employee.holderName}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;
