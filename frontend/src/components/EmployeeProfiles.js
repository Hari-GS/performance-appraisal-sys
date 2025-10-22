import { useState, useEffect } from "react";
import { request } from "../helpers/axios_helpers";
import SearchBar from "./SearchBar";
import ProfileCard from "./ProfileCard";
import TeamsCards from "./TeamsCards";
import profilePlaceholder from '../images/profile-placeholder.jpg';
import { FiUserPlus, FiFilter, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import UploadCSVModal from "./UploadCSVModal";
import { SyncLoader } from "react-spinners";
import { FaSitemap } from "react-icons/fa";


const EmployeeProfiles = () => {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]); // For team data
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState("Employee");
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [employeeError, setEmployeeError] = useState(null);
  const [teamError, setTeamError] = useState(null);
  const [isEmployeeLoading, setIsEmployeeLoading] = useState(true);
  const [isTeamLoading, setIsTeamLoading] = useState(true);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const fetchEmployees = () => {
      setIsEmployeeLoading(true);
      request("GET", "/api/new-employees/summary")
        .then(response => {
          setEmployees(response.data);
          setFilteredEmployees(response.data);
          setEmployeeError(null);
        })
        .catch(error => {
          console.error("Error fetching employees:", error);
          setEmployeeError("Couldn't connect to the server");
        })
        .finally(() => setIsEmployeeLoading(false));
    };

  useEffect(() => {
    // Fetch employees
    
    fetchEmployees();
  
    // Fetch teams
    request("GET", "/teams")
      .then(response => {
        setTeams(response.data);
        setFilteredTeams(response.data);
        setTeamError(null);
      })
      .catch(error => {
        console.error("Error fetching teams:", error);
        setTeamError("Couldn't connect to the server");
      })
      .finally(() => setIsTeamLoading(false));
  }, []);
  
  

  const handleUploadSuccess = () => {
    request("GET", "/employees")
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      });
  };

  const handleSearch = (query) => {
    setSearchText(query);
    filterEmployees(query, selectedRoleFilter);
  };
  
  
  const handleRoleFilterSelect = (role) => {
    const selectedRole = role === "Clear Filter" ? "" : role;
    setSelectedRoleFilter(selectedRole);
    setShowRoleDropdown(false);
    filterEmployees(searchText, selectedRole);
  };
  
  
  const filterEmployees = (search = searchText, role = selectedRoleFilter) => {
    let filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(search.toLowerCase())
    );
  
    if (role) {
      filtered = filtered.filter(emp =>
        emp.roleInTheHierarchy?.toLowerCase() === role.toLowerCase()
      );
    }
  
    setFilteredEmployees(filtered);
  };
  

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="p-4 bg-primary">
      {/* Top Bar */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex flex-row">
        <SearchBar
          onSearch={handleSearch}
          placeholder={
            viewMode === "Employee"
              ? "Search by Employee name or Id"
              : "Search by Team name"
          }
        />
          {/* View Toggle */}
          {/* <div className="relative w-64 h-10 bg-gray-200 rounded-full flex items-center justify-between px-1 mt-9 ml-8">
            <div
              className={`absolute top-1 left-1 h-8 rounded-full transition-transform duration-300 ease-in-out
                ${viewMode === "Employee" ? "translate-x-[calc(100%+0px)] w-[calc(54%-10px)]" : "translate-x-0 w-[calc(50%-4px)]"}
                bg-orange-500`}
            />
            <button
              className={`z-10 w-1/2 text-sm font-semibold flex items-center justify-center ${
                viewMode === "Team" ? "text-white" : "text-gray-600"
              }`}
              onClick={() => handleViewToggle("Team")}
            >
              Teams
            </button>
            <button
              className={`z-10 w-1/2 text-sm font-semibold flex items-center justify-center ${
                viewMode === "Employee" ? "text-white" : "text-gray-600"
              }`}
              onClick={() => handleViewToggle("Employee")}
            >
              Employees
            </button>
          </div> */}
        </div>
      <div className="flex flex-row gap-8">
  
  <button
    className="flex items-center gap-2 text-white hover:bg-accent-dark px-4 py-2 rounded-3xl bg-accent transition mt-9"
    style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1)" }}
    onClick={() => navigate("/heirarchy")}
  >
    <FaSitemap size={18} />
    View Heirarchy
  </button>

  {/* Add Button (Always shown) */}
  <button
    className="flex items-center gap-2 text-white hover:bg-accent-dark px-4 py-2 rounded-3xl bg-accent transition mt-9"
    style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1)" }}
    onClick={() => navigate(viewMode === "Employee" ? "/addEmployee" : "/add-team", { state: { employees } })}
  >
    <FiUserPlus size={18} />
    Add
  </button>

  {/* Show only in Employee view */}
  {viewMode === "Employee" && (
    <>
      {/* Upload CSV Button */}
      {/* <button
        className="flex items-center gap-2 border px-4 py-2 rounded-3xl text-white hover:bg-orange-600 transition mt-9 bg-orange-500"
        style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1)" }}
        onClick={() => setShowUploadModal(true)}
      >
        <FiUpload size={18} />
        Upload CSV
      </button> */}

      {/* Filter Button */}
      <div className="relative">
      {/* <button
        className="flex items-center gap-2 border px-4 py-2 rounded-3xl text-white hover:bg-accent-dark bg-accent transition mt-9"
        style={{ boxShadow: "inset 2px 2px 6px rgba(0, 0, 0, 0.1)" }}
        onClick={() => setShowRoleDropdown(!showRoleDropdown)}
      >
        <FiFilter size={18} />
        {selectedRoleFilter || "Filter"}
      </button> */}

      {showRoleDropdown && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {["Manager", "Team Lead", "Team Member", "Clear Filter"].map(role => (
            <button
              key={role}
              onClick={() => handleRoleFilterSelect(role === "Clear Filter" ? "" : role)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                role === "Clear Filter" ? "text-red-600 font-semibold" : ""
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      )}

    </div>

    </>
  )}
</div>

      </div>

      {/* Main Content */}
      {viewMode === "Employee" ? (
  isEmployeeLoading ? (
    <div className="flex justify-center items-center h-64">
      <SyncLoader color="#ff9700" />
    </div>
  ) : employeeError ? (
    <div className="flex justify-center items-center h-72 ">
      <p>{employeeError}</p>
    </div>
  ) : filteredEmployees.length === 0 ? (
    <div className="text-center col-span-full text-gray-400 text-lg mt-20">
      No employees uploaded
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
      {filteredEmployees.map((employee) => (
        <div
          key={employee.employeeId}
          className="bg-primary-dark/80 backdrop-blur-md border text-center border-gray-200 py-4 px-4 rounded-xl shadow-md cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-200"
          onClick={() => setSelectedEmployee(employee)}
        >
          <img
            src={employee.img || profilePlaceholder}
            alt={`${employee.name}`}
            className="w-full h-32 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold mt-2 capitalize">{employee.name}</h3>
          <p className="text-gray-500">{employee.designation}</p>
          <p className="text-gray-500">{employee.employeeId}</p>
        </div>
      ))}
    </div>
  )
) : (
  isTeamLoading ? (
    <div className="flex justify-center items-center h-64">
      <SyncLoader color="#ff9700" />
    </div>
  ) : (
    <TeamsCards searchQuery={searchText} />
  )
)}

      {/* Profile Modal */}
      {selectedEmployee && (
        <ProfileCard
          employeeId={selectedEmployee.employeeId}
          onClose={() => setSelectedEmployee(null)}
          onEmployeeDeleted={fetchEmployees}
        />
      )}
      {showUploadModal && <UploadCSVModal onClose={() => setShowUploadModal(false)} onUploadSuccess={handleUploadSuccess}/>}
    </div>
  );
};

export default EmployeeProfiles;
