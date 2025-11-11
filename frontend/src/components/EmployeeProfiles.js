import { useState, useEffect } from "react";
import { request } from "../helpers/axios_helpers";
import SearchBar from "./SearchBar";
import TeamsCards from "./TeamsCards";
import UploadCSVModal from "./UploadCSVModal";
import { SyncLoader } from "react-spinners";
import { FaSitemap, FaSearch, FaCaretDown } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
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
  const [activeTab, setActiveTab] = useState("Active");
  const [showDropdown, setShowDropdown] = useState(false);
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

  const reload = () => {
    fetchActiveEmployees();
    fetchInactiveEmployees();
  };

  useEffect(() => {
    fetchActiveEmployees();
    fetchInactiveEmployees();
  }, []);

  const handleReactivate = (employeeId) => {
    request("PUT", `/api/new-employees/active/${employeeId}`)
      .then(() => {
        toast.success("Employee reactivated");
        setInactiveEmployees((prev) =>
          prev.filter((emp) => emp.employeeId !== employeeId)
        );
        setEmployees((prev) => {
          const reactivated = inactiveEmployees.find(
            (emp) => emp.employeeId === employeeId
          );
          return reactivated ? [...prev, { ...reactivated, status: "Active" }] : prev;
        });
        fetchActiveEmployees();
        fetchInactiveEmployees();
      })
      .catch(() => toast.error("Failed to reactivate employee"));
  };

  return (
    <div className="p-0 bg-primary">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white border border-gray-300 border-b-2 px-4 py-2">
        {/* Left: Toggle Buttons + Title */}
        <div className="flex items-center gap-4">
          {/* Toggle */}
          <div className="flex items-center bg-gray-100 rounded-md overflow-hidden">
            <button
              onClick={() => setActiveTab("Active")}
              className={`px-3 py-1 text-sm font-medium ${
                activeTab === "Active"
                  ? "bg-accent text-white"
                  : "text-gray-600 hover:bg-gray-200"
              } transition`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("Inactive")}
              className={`px-3 py-1 text-sm font-medium ${
                activeTab === "Inactive"
                  ? "bg-accent text-white"
                  : "text-gray-600 hover:bg-gray-200"
              } transition`}
            >
              Inactive
            </button>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900">Participants</h2>
        </div>

        {/* Right: Search + Hierarchy + Add */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-600 focus-within:border-orange-400">
            <FaSearch className="text-accent mr-2 text-sm" />
            <input
              type="text"
              placeholder="Search by Employee ID or Name"
              className="outline-none w-52 text-gray-700 placeholder-gray-400"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>

          {/* View Hierarchy */}
          <button
            className="flex items-center gap-2 border border-gray-300 text-sm text-gray-700 rounded-md px-3 py-1 hover:bg-orange-50 transition"
            onClick={() => navigate("/heirarchy")}
          >
            <FaSitemap className="text-accent text-base" />
            View Hierarchy
          </button>

          {/* Add Dropdown */}
          <ProtectedView allowedRoles={["hr"]}>
            <div>
              <button
                onClick={() => navigate("/addEmployee", { state: { employees } })}
                className="flex items-center gap-2 border border-gray-300 text-sm rounded-md px-3 py-1 hover:bg-orange-50 transition"
              >
                <FiUserPlus className="text-accent" />
                Add
              </button>
            </div>
          </ProtectedView>
        </div>
      </div>

      {/* Employee List */}
      {activeTab === "Active" ? (
        <ActiveEmployees
          employees={employees}
          searchText={searchText}
          isEmployeeLoading={isEmployeeLoading}
          employeeError={employeeError}
          reload={reload}
        />
      ) : (
        <InactiveEmployees
          inactiveEmployees={inactiveEmployees}
          onReactivate={handleReactivate}
        />
      )}

      {/* Teams (optional) */}
      {viewMode === "Team" &&
        (isTeamLoading ? (
          <div className="flex justify-center items-center h-64">
            <SyncLoader color="#ff9700" />
          </div>
        ) : (
          <TeamsCards searchQuery={searchText} />
        ))}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadCSVModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
};

export default EmployeeProfiles;
