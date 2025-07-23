import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { request } from '../helpers/axios_helpers';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import profilePlaceholder from '../images/profile-placeholder.jpg';
import { useRef } from 'react';


const AddTeam = () => {
  const [teamIdNumber, setTeamIdNumber] = useState('');
  const [teamName, setTeamName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [effectiveStartDate, seteffectiveStartDate] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [members, setMembers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [allTeamEmployees, setAllTeamEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName} ${emp.employeeId}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEmpName = (id) => {
    const emp = employees.find(e => e.employeeId === id);
    return emp ? `${emp.firstName} ${emp.lastName} (${emp.employeeId})` : "";
  };

  useEffect(() => {
    if (location.state?.newMembers) {
      setMembers(location.state.newMembers);
    }
    if (location.state?.allEmployees) {
      setAllTeamEmployees(location.state.allEmployees);
    }
    if (location.state?.teamData) {
      const data = location.state.teamData;
      setTeamIdNumber(data.teamIdNumber || '');
      setTeamName(data.teamName || '');
      setProjectTitle(data.projectTitle || '');
      setTeamLead(data.teamLead || '');
      seteffectiveStartDate(data.effectiveStartDate || '');
    }
  }, [location.state]);

  useEffect(() => {
    request("GET", "/dto")
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Failed to fetch employees", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    navigate("/employees");
  };

  const addMember = () => {
    navigate('/add-team/team-selection', {
      state: {
        existingMemberIds: members,
        teamData: {
          teamIdNumber,
          teamName,
          projectTitle,
          teamLead,
          effectiveStartDate,
          allEmployees: allTeamEmployees
        }
      },
    });
  };
  

  const validateForm = () => {
    if (!teamIdNumber || !teamName || !projectTitle || !effectiveStartDate || !teamLead) {
      setError("All fields are required.");
      return false;
    }
    if (members.length === 0) {
      setError("At least one member must be selected.");
      return false;
    }
    setError('');
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    const teamData = {
      teamIdNumber,
      teamName,
      projectTitle,
      teamLead,
      effectiveStartDate,
      employeesIds: members
    };

    try {
      const response = await request("POST", "/teams", teamData);
      console.log("Team created successfully:", response.data);
      navigate("/employees"); // or navigate to team list
    } catch (error) {
      console.error("Error creating team:", error);
      setError("Failed to create team. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-6 pt-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-4 mt-8">
        <div className='border-2 rounded-2xl flex flex-col gap-4 pb-8'>
          <div className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md">
            Team Details
          </div>

          {error && <div className="text-red-500 text-sm ml-8 mt-2">{error}</div>}

          <div className="flex items-center gap-4 ml-8">
            <div className="w-1/2">
              <input
                type="text"
                value={teamIdNumber}
                onChange={(e) => setTeamIdNumber(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Team ID"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <div className="w-1/2">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Team Name"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <div className="w-1/2">
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Project Title"
              />
            </div>
          </div>

          <div className="flex flex-col relative w-[48%] ml-8 z-10" ref={dropdownRef}>
            <div
              className="flex items-center justify-between border border-gray-300 p-2 rounded-md cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>
                {teamLead
                  ? `${getEmpName(teamLead)}`
                  : "Select Team Lead"}
              </span>
              <FaChevronDown className="text-gray-500" />
            </div>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-64 overflow-y-auto">
                <input
                  type="text"
                  className="w-full px-3 py-2 border-b"
                  placeholder="Search by name or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {filteredEmployees.length === 0 ? (
                  <div className="p-2 text-gray-400 text-sm text-center">No results found</div>
                ) : (
                  filteredEmployees.map(emp => (
                    <div
                      key={emp.employeeId}
                      onClick={() => {
                        setTeamLead(emp.employeeId);
                        setDropdownOpen(false);
                        setSearchQuery("");
                      }}
                      className="px-3 py-2 hover:bg-orange-100 cursor-pointer flex justify-between"
                    >
                      <span>{emp.firstName} {emp.lastName}</span>
                      <span className="text-sm text-gray-500">{emp.employeeId}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>


          <div className="flex items-center gap-4 ml-8">
            <div className="w-1/2">
              <input
                type="date"
                value={effectiveStartDate}
                onChange={(e) => seteffectiveStartDate(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Add Members Section */}
        <div className="border-2 rounded-xl pb-8">
          <div className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-md">
            Add Members
          </div>

          <div className="mt-4 ml-8 w-4/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {members.length === 0 ? (
                <p className="text-sm text-gray-500">No members selected yet.</p>
              ) : (
                members.map((id) => {
                  const emp = allTeamEmployees.find((e) => e.employeeId === id);
                  if (!emp) return null;

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between border p-3 rounded-lg shadow bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={emp.img || profilePlaceholder}
                          alt={emp.firstName}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <div>
                          <div className="font-semibold">
                            {emp.firstName} {emp.lastName}
                          </div>
                          <div className="text-sm text-gray-600">{emp.employeeId}</div>
                          <div className="text-sm text-gray-600">{emp.role || "Employee"}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setMembers((prev) => prev.filter((m) => m !== id))}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <button
              onClick={addMember}
              className="bg-white border border-gray-400 px-4 py-1 rounded-md font-medium hover:bg-gray-100 mt-6"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-12 gap-4 pt-12">
          <button
            onClick={handleClose}
            className="border border-gray-400 px-4 py-2 rounded-3xl bg-white hover:bg-gray-100"
          >
            Close
          </button>
          <button
            onClick={handleCreate}
            className="bg-orange-500 text-white px-4 py-2 rounded-3xl hover:bg-orange-600"
          >
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
