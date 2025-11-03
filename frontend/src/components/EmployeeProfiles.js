import { useState, useEffect } from "react";
import { request } from "../helpers/axios_helpers";
import SearchBar from "./SearchBar";
import TeamsCards from "./TeamsCards";
import UploadCSVModal from "./UploadCSVModal";
import { SyncLoader } from "react-spinners";
import { FaSitemap } from "react-icons/fa";
import {FiUserPlus} from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import ActiveEmployees from "./ActiveEmployees";
import InactiveEmployees from "./InactiveEmployees";
import { toast } from "react-toastify";
import ProtectedView from "./ProtectedView";

const EmployeeProfiles = () => {
  const [employees, setEmployees] = useState([]);
  const [inactiveEmployees, setInactiveEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isEmployeeLoading, setIsEmployeeLoading] = useState(true);
  const [isTeamLoading, setIsTeamLoading] = useState(true);
  const [employeeError, setEmployeeError] = useState(null);
  const [teamError, setTeamError] = useState(null);
  const [viewMode, setViewMode] = useState("Employee");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const navigate = useNavigate();

  const fetchActiveEmployees = () => {
    setIsEmployeeLoading(true);
    request("GET", "/api/new-employees/summary")
      .then((res) => {
        setEmployees(res.data);
        setEmployeeError(null);
      })
      .catch(() => setEmployeeError("Couldn't connect to the server"))
      .finally(() => setIsEmployeeLoading(false));
  };

  const fetchInactiveEmployees = () => {
    request("GET", "/api/new-employees/inactive/summary")
      .then((res) => setInactiveEmployees(res.data))
      .catch(() => {});
  };

  const reload = () =>{
    fetchActiveEmployees();
    fetchInactiveEmployees();
  }

  useEffect(() => {
    fetchActiveEmployees();
    fetchInactiveEmployees();
  }, []);

  const handleReactivate = (employeeId) => {
    request("PUT", `/api/new-employees/active/${employeeId}`)
      .then(() => {
        toast.success("Employee reactivated");
  
        // ✅ 1. Move employee from inactive to active instantly
        setInactiveEmployees((prev) =>
          prev.filter((emp) => emp.employeeId !== employeeId)
        );
  
        setEmployees((prev) => {
          const reactivated = inactiveEmployees.find(
            (emp) => emp.employeeId === employeeId
          );
          return reactivated ? [...prev, { ...reactivated, status: "Active" }] : prev;
        });
  
        // ✅ 2. (Optional) Re-fetch from server for consistency
        fetchActiveEmployees();
        fetchInactiveEmployees();
      })
      .catch(() => toast.error("Failed to reactivate employee"));
  };
  

  return (
    <div className="p-4 bg-primary">
      {/* Header */}
      
        <h1 className="text-black text-2xl font-bold mt-4">Active Participants</h1>
        <div className="mt-4 flex justify-between items-center">
        {/* Search bar */}
        <div className="mt-0">
          <SearchBar
            onSearch={setSearchText}
            placeholder="Search by Employee name or ID"
          />
        </div>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 text-white hover:bg-accent-dark px-4 py-2 rounded-3xl bg-accent transition mt-1"
            onClick={() => navigate("/heirarchy")}
          >
            <FaSitemap size={18} />
            View Hierarchy
          </button>
          <ProtectedView allowedRoles={["hr"]}>
            <button
              className="flex items-center gap-2 text-white hover:bg-accent-dark px-4 py-2 rounded-3xl bg-accent transition mt-1"
              onClick={() => navigate("/addEmployee", { state: { employees } })}
            >
              <FiUserPlus size={18} />
              Add
            </button>
          </ProtectedView>
        </div>
      </div>
      {/* Employees Section */}
      <ActiveEmployees
        employees={employees}
        searchText={searchText}
        isEmployeeLoading={isEmployeeLoading}
        employeeError={employeeError}
        reload={reload}
      />

      {/* Inactive Section */}
      <InactiveEmployees
        inactiveEmployees={inactiveEmployees}
        onReactivate={handleReactivate}
      />

      {/* Teams (optional future extension) */}
      {viewMode === "Team" && (
        isTeamLoading ? (
          <div className="flex justify-center items-center h-64">
            <SyncLoader color="#ff9700" />
          </div>
        ) : (
          <TeamsCards searchQuery={searchText} />
        )
      )}

      {showUploadModal && (
        <UploadCSVModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
};

export default EmployeeProfiles;
