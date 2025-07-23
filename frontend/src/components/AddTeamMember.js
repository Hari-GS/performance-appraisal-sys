import { useState, useEffect } from "react";
import { request } from "../helpers/axios_helpers";
import profilePlaceholder from '../images/profile-placeholder.jpg';
import { useNavigate, useLocation } from "react-router-dom";

const AddTeamMember = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const existingMemberIds = location.state?.existingMemberIds || [];
  const [selectedIds, setSelectedIds] = useState([...existingMemberIds]);

  useEffect(() => {
    request("GET", "/employees")
      .then(response => setEmployees(response.data))
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(empId => empId !== id)
        : [...prev, id]
    );
  };

  const handleAdd = () => {
    navigate('/add-team', {
      state: {
        newMembers: selectedIds,
        allEmployees: employees,
        teamData: location.state?.teamData || {}
      },
    });
    
  };

  const handleCancel = () =>{
    navigate("/add-team", {
      state: {
        allEmployees: employees,
        teamData: location.state?.teamData || {}
      },
    });
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Select Team Members</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {employees.map(emp => {
          const isSelected = selectedIds.includes(emp.employeeId);

          return (
            <div
              key={emp.employeeId}
              onClick={() => toggleSelect(emp.employeeId)}
              className={`p-4 border rounded-lg shadow hover:shadow-lg cursor-pointer transition relative
                ${isSelected ? "bg-orange-200 border-orange-400" : "bg-white"}
              `}
            >
              <img
                src={emp.img || profilePlaceholder}
                alt={emp.firstName}
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="mt-2 font-semibold text-center">
                {emp.firstName} {emp.lastName}
              </h3>
              <p className="text-center text-sm text-gray-600">{emp.employeeId}</p>
              <p className="text-center text-sm text-gray-600">{emp.role || "Employee"}</p>

              {existingMemberIds.includes(emp.employeeId) && (
                <span className="absolute top-2 right-2 text-xs bg-gray-600 text-white px-2 py-0.5 rounded">
                  Previously Added
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className=" text-right gap-4">
        <button
          onClick={handleCancel}
          className="border border-gray-400 px-4 py-2 rounded-3xl bg-white hover:bg-gray-100 mr-8"
        >
          Cancel
        </button>
        <button
          onClick={handleAdd}
          disabled={selectedIds.length === 0}
          className="mt-8 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-3xl transition disabled:opacity-50"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default AddTeamMember;
