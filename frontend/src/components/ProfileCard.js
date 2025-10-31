import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePlaceholder from '../images/profile-placeholder.jpg';
import { FaTimes } from "react-icons/fa";
import { request } from "../helpers/axios_helpers";

const ProfileCard = ({ employeeId, onClose, onEmployeeDeleted, reloadInactive }) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await request("get", `/api/new-employees/${employeeId}`);
        setEmployee(response.data);
        
      } catch (error) {
        console.error("Error fetching employee:", error);
      } 
    };

    if (employeeId) fetchEmployee();
  }, [employeeId]);

  const handleEdit = () => {
    navigate("/addEmployee", { state: { employee } });
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await request("delete", `/api/new-employees/${employeeId}`);
      onClose(); // Close the modal or trigger list refresh from parent
      reloadInactive();
    } catch (error) {
      console.error("Error deactivating employee:", error);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (!employee) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-[1000px] h-[90vh] flex items-center justify-center text-gray-700 text-lg font-medium">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-[1000px] h-[90vh] overflow-hidden relative flex flex-col">

        {/* Close Button */}
        <div className="absolute top-0 right-0 z-10">
          <button onClick={onClose} className="p-4">
            <FaTimes className="text-2xl text-gray-600 hover:text-accent" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-10 py-8 flex-1">
          {/* Profile Header */}
          <div className="flex items-center gap-8 pb-6 border-b">
            <img
              src={employee.img || profilePlaceholder}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-orange-500"
            />
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-800">
                {employee.name}
              </h2>
              <p className="text-gray-600">Employee ID: <span className="font-medium">{employee.employeeId}</span></p>
              <p className="text-gray-600">Email: <span className="font-medium">{employee.email}</span></p>
              <p className="text-gray-600">Designation: <span className="font-medium">{employee.designation || "Not specified"}</span></p>
              <p className="text-gray-600">Reporting to: <span className="font-medium">{employee.managerId || "Not anyone"}</span></p>
            </div>
          </div>

          {/* Personal Details */}
          <div className="mt-8">
            <div className="bg-accent text-white px-5 py-3 rounded-t-2xl text-lg font-semibold shadow">
              Personal Details
            </div>
            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-b-2xl shadow-inner text-gray-700 text-[15px]">
              <p><strong>Date of Birth:</strong> {employee.dateOfBirth||"N/A"}</p>
              <p><strong>Date of Joining:</strong> {employee.dateOfJoining||"N/A"}</p>
              <p><strong>Gender:</strong> {employee.gender||"N/A"}</p>
              <p><strong>Mobile Number:</strong> {employee.mobileNumber||"N/A"}</p>
              <p className="col-span-2"><strong>Address:</strong> {employee.address||"N/A"}</p>
            </div>
            <p className="text-sm text-gray-500 italic mt-3">
              Profile image and personal details can be edited only by the account holder.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 px-10 py-4 border-t">
          <button
            onClick={handleEdit}
            className="bg-accent text-white px-6 py-2 font-semibold rounded-3xl hover:bg-accent-dark"
          >
            Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-500 text-white px-6 py-2 font-semibold rounded-3xl hover:bg-red-600"
          >
            Deactivate
          </button>
        </div>

        {/* Confirm Deletion Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl shadow-lg p-6 w-80">
              <h3 className="text-lg font-semibold mb-4">Confirm Deactivation</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to deactivate this employee?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-200 rounded-3xl hover:bg-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-3xl hover:bg-red-600"
                  disabled={loading}
                >
                  {loading ? "Deactivating..." : "Deactivate"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfileCard;
