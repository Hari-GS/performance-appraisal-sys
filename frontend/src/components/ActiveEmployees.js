import profilePlaceholder from "../images/profile-placeholder.jpg";
import { SyncLoader } from "react-spinners";
import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";

const ActiveEmployees = ({ employees, searchText, isEmployeeLoading, employeeError , reload}) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const filtered = employees.filter(
      (e) =>
        e.name.toLowerCase().includes(searchText.toLowerCase()) ||
        e.employeeId.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [employees, searchText]);

  if (isEmployeeLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <SyncLoader color="#ff9700" />
      </div>
    );
  }

  if (employeeError) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        {employeeError}
      </div>
    );
  }

  if (filteredEmployees.length === 0) {
    return (
      <div className="text-center pt-10 mt-10 text-gray-400 text-lg  min-h-[300px]">
        No active participants found
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.employeeId}
            className="bg-primary-dark/80 backdrop-blur-md border text-center border-gray-200 py-4 px-4 rounded-xl shadow-md cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-200"
            onClick={() => setSelectedEmployee(employee)}
          >
            <img
              src={employee.img || profilePlaceholder}
              alt={employee.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2 capitalize">{employee.name}</h3>
            <p className="text-gray-500">{employee.designation}</p>
            <p className="text-gray-500">{employee.employeeId}</p>
          </div>
        ))}
      </div>

      {selectedEmployee && (
        <ProfileCard
          employeeId={selectedEmployee.employeeId}
          onClose={() => setSelectedEmployee(null)}
          reloadInactive={reload}
        />
      )}
    </>
  );
};

export default ActiveEmployees;
