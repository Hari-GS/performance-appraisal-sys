import { useState, useEffect } from "react";
import { request } from "../helpers/axios_helpers";
import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard";
import profilePlaceholder from '../images/profile-placeholder.jpg';
import { FiUserPlus } from "react-icons/fi"; // Import icon
import { useNavigate } from "react-router-dom";

const EmployeeProfiles = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    request("GET", "/employees")
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = employees.filter((employee) =>
      employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="p-4">
      {/* SearchBar + Add Button */}
      <div className="flex justify-between items-center">
        <SearchBar onSearch={handleSearch} />
        <button
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 mt-6 rounded-3xl hover:bg-orange-700 transition"
          onClick={() => navigate("/addEmployee")}
        >
          <FiUserPlus size={18} />
          Add
        </button>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
        {filteredEmployees.map((employee) => (
          <div 
            key={employee.id}
            className="bg-white rounded-lg shadow-lg p-4 text-center cursor-pointer hover:shadow-xl transition duration-300"
            onClick={() => setSelectedEmployee(employee)}
          >
            <img
              src={employee.img || profilePlaceholder}
              alt={employee.firstName}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{employee.firstName} {employee.lastName}</h3>
            <p className="text-gray-500">{employee.role}</p>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {selectedEmployee && (
        <ProfileCard 
          employee={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
    </div>
  );
};

export default EmployeeProfiles;
