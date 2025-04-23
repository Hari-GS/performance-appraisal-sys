import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "../../helpers/axios_helpers";

export default function ParticipantsPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [employees, setEmployees] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const formDetails = location.state;
  const { title, welcomeMessage, questions } = formDetails;

  useEffect(() => {
    request("GET", "/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const isAllSelected = selectedIds.length === employees.length;

  const toggleAll = () => {
    setSelectedIds(isAllSelected ? [] : employees.map((e) => e.id));
  };

  const handleNext = () => {
    const selectedEmployees = employees.filter((emp) =>
      selectedIds.includes(emp.id)
    );

    const formData = {
      title,
      welcomeMessage,
      questions,
      selectedEmployees,
      employees,
    };

    navigate("/forms/reviewers", { state: formData });
  };

  return (
    <div className="min-h-screen p-6 pt-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button className="bg-white border border-gray-300 px-4 py-2 rounded">
            Question
          </button>
          <button className="bg-orange-400 text-white px-4 py-2 rounded">
            Participants
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedIds.length === 0}
          className={`px-5 py-2 rounded-full text-sm font-medium ${
            selectedIds.length === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          Next
        </button>
      </div>

      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Table or No Employees Message */}
      {employees.length > 0 ? (
        <div className="bg-white rounded shadow-md overflow-hidden mt-6">
          <div className="grid grid-cols-5 gap-4 p-3 font-semibold border bg-gray-100">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleAll}
              className="ml-4 w-4 h-4 text-orange-500 accent-orange-500"
            />
            <span>Reviewee</span>
            <span>Employee ID</span>
            <span>Role</span>
            <span>Email</span>
          </div>

          {employees.map((emp) => (
            <div
              key={emp.id}
              className="grid grid-cols-5 items-center gap-4 px-3 py-2 border-b hover:bg-orange-50"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(emp.id)}
                onChange={() => toggleSelection(emp.id)}
                className="ml-4 w-4 h-4 text-orange-500 accent-orange-500"
              />
              <div className="flex items-center gap-2">
                <img
                  src={emp.image}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
                <span>{emp.firstName} {emp.lastName}</span>
              </div>
              <span>{emp.employeeId}</span>
              <span>{emp.role}</span>
              <span>{emp.personalMail}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center text-gray-500 text-lg font-medium">
          No Employees Added
        </div>
      )}
    </div>
  );
}
