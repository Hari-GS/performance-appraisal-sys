import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profilePlaceholder from "../images/profile-placeholder.jpg";
import { request } from "../helpers/axios_helpers";
import { useAuth } from "../context/AuthContext";
import ProtectedView from "./ProtectedView";
import { FaTimes } from "react-icons/fa";

const ProfileCard = ({
  employeeId,
  onClose,
  onEmployeeDeleted,
  reloadInactive,
}) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

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
      onClose();
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
        <div className="bg-white rounded-md shadow-md w-[90%] max-w-[900px] h-[80vh] flex items-center justify-center text-gray-700 text-lg font-medium">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-md shadow-sm border border-gray-200 
    w-[90%] max-w-[900px] 
    overflow-y-auto relative flex flex-col
    max-h-[85vh]       
     ">

        {/* Header */}
        <div className="bg-accent text-white text-lg font-semibold px-4 sm:px-6 py-2 flex justify-between items-center">
          <span>Profile</span>
          <button onClick={onClose} className="p-2">
            <FaTimes className="text-xl sm:text-2xl" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* Image */}
          <div className="flex flex-col items-center p-2 sm:p-4">
            <img
              src={employee.img || profilePlaceholder}
              alt="Profile"
              className="w-40 sm:w-48 rounded-md object-cover mb-3"
            />
          </div>

          {/* Info */}
          <div className="sm:col-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              {employee.name}
            </h2>
            <div className="space-y-2 text-gray-800 text-sm sm:text-[15px]">
              <p><span className="font-medium inline-block w-32">Emp ID</span>: {employee.employeeId}</p>
              <p><span className="font-medium inline-block w-32">Email</span>: {employee.email}</p>
              <p><span className="font-medium inline-block w-32">Designation</span>: {employee.designation}</p>
              <p><span className="font-medium inline-block w-32">Reporting to</span>: {employee.managerId}</p>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="px-4 sm:px-16">
          <div className="bg-orange-50 border-gray-200">
            <div className="px-4 sm:px-6 py-2 font-semibold text-accent text-[15px]">
              Personal Details
            </div>
          </div>

          {/* Mobile = 1 column / Desktop = 2 columns */}
          <div className="px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-800 text-sm sm:text-[15px]">
            <p><span className="font-medium inline-block w-40">DOB</span>: {employee.dateOfBirth || "N/A"}</p>
            <p><span className="font-medium inline-block w-40">Joining Date</span>: {employee.dateOfJoining || "N/A"}</p>
            <p><span className="font-medium inline-block w-40">Gender</span>: {employee.gender || "N/A"}</p>
            <p><span className="font-medium inline-block w-40">Mobile</span>: {employee.mobileNumber || "N/A"}</p>

            <p className="sm:col-span-2">
              <span className="font-medium inline-block w-40">Address</span>: {employee.address || "N/A"}
            </p>
          </div>
        </div>

        <ProtectedView allowedRoles={["hr"]}>
          <p className="text-sm text-gray-500 italic px-4 sm:px-16 pb-2 mt-5">
            Profile image and personal details can be edited only by the account holder.
          </p>

          {/* Footer Buttons → Mobile stacked, desktop inline */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 px-4 sm:px-6 py-3">
            <button
              onClick={handleEdit}
              className="border-2 px-6 py-2 rounded-md hover:bg-orange-50"
            >
              Edit
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="border-2 px-6 py-2 rounded-md hover:bg-orange-50"
            >
              Deactivate
            </button>
          </div>
        </ProtectedView>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[60] px-4">
            <div className="bg-white rounded-md shadow-lg p-6 w-full sm:w-[400px]">
              <h3 className="text-lg font-semibold mb-4">Confirm Deactivation</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to deactivate this participant?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-1 border-2 rounded-md hover:bg-orange-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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
