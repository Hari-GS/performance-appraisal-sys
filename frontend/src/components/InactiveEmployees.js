import { FaUndoAlt } from "react-icons/fa";
import profilePlaceholder from "../images/profile-placeholder.jpg";
import { useState } from "react";
import { MdUndo } from "react-icons/md";


const InactiveEmployees = ({ inactiveEmployees, onReactivate }) => {
  const [loadingId, setLoadingId] = useState(null);

  if (!inactiveEmployees?.length) return null;

  const handleReactivateClick = async (id) => {
    setLoadingId(id);
    await onReactivate(id);
    setLoadingId(null);
  };

  return (
    <div className="mt-12">
      <h1 className="text-black text-2xl font-bold mb-6">Inactive Participants</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {inactiveEmployees.map((employee) => (
          <div
            key={employee.employeeId}
            className="relative bg-primary-dark/80 backdrop-blur-md border text-center border-gray-200 py-4 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02]"
          >
            <img
              src={employee.img || profilePlaceholder}
              alt={employee.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2 capitalize">{employee.name}</h3>
            <p className="text-gray-400 text-sm">{employee.designation}</p>
            <p className="text-gray-500 text-xs">{employee.employeeId}</p>

            <button
              onClick={() => handleReactivateClick(employee.employeeId)}
              disabled={loadingId === employee.employeeId}
              className={`absolute top-2 right-2 bg-accent text-white p-2 rounded-full shadow-md hover:bg-accent-dark active:scale-95 transition-all ${
                loadingId === employee.employeeId ? "opacity-70 cursor-not-allowed" : ""
              }`}
              title="Move to Active"
            >
              {loadingId === employee.employeeId ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <MdUndo size={18} />
              )}
            </button>

            <span className="absolute bottom-2 right-2 text-xs font-medium text-gray-300 bg-gray-700/50 px-2 py-0.5 rounded-md">
              Inactive
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InactiveEmployees;
