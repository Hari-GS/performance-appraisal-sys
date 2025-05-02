import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "../helpers/axios_helpers";

export default function ReviewersPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const {
    title,
    welcomeMessage,
    questions,
    selectedEmployees,
    employees,
  } = location.state;

  const [reviewerIds, setReviewerIds] = useState([]);

  const toggleReviewer = (id) => {
    setReviewerIds((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const isAllSelected = reviewerIds.length === employees.length;

  const toggleAll = () => {
    setReviewerIds(isAllSelected ? [] : employees.map((e) => e.id));
  };

  const handleSend = async () => {
    const reviewersEmployeeIds = reviewerIds.map((id) => {
      const emp = employees.find((e) => e.id === id);
      return emp?.employeeId; // assuming `employeeId` is the unique string used by backend
    }).filter(Boolean); // removes undefined
  
    const revieweesEmployeeIds = selectedEmployees.map((emp) => emp.employeeId);
    const user = JSON.parse(localStorage.getItem("user"));

    const formData = {
      title,
      welcomeMessage,
      questions,
      revieweesEmployeeIds,
      reviewersEmployeeIds,
      employeeCreated : user.userId,
      isCompleted : false
    };
  
    console.log("Sending form data to backend:", formData);

    try {
        const response = await request("POST", "/api/forms", formData);
        console.log("Form successfully submitted:", response);
        // Optionally navigate to confirmation page
        navigate("/dashboard");
    } catch (error) {
        console.error("Error submitting form:", error);
        // Optionally show error feedback to user
    }finally {
        setIsModalOpen(false); // close the modal
    }
  };
  

  return (
    <div className="min-h-screen p-6 pt-10 relative">
      
      {/* Tabs */}
      <div className="flex justify-between">
        <div className="flex gap-2 mb-4">
            <button className="bg-white border border-gray-300 px-4 py-2 rounded">
            Question
            </button>
            <button className="bg-white border border-gray-300 px-4 py-2 rounded">
            Participants
            </button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded">
            Reviewers
            </button>
        </div>
        <div>
            <button
            onClick={() => setIsModalOpen(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium ${
                reviewerIds.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
            disabled={reviewerIds.length === 0}
            >
            Send
            </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-md overflow-hidden mt-6">
        <div className="grid grid-cols-5 gap-4 p-3 font-semibold border bg-gray-100">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleAll}
            className="ml-4 w-4 h-4 text-orange-500 accent-orange-500"
          />
          <span>Reviewer</span>
          <span>Employee ID</span>
          <span>Role</span>
          <span>Email</span>
        </div>

        {employees.map((emp) => (
          <div
            key={emp.id}
            className="grid grid-cols-5 items-center gap-4 px-3 py-2 border-b hover:bg-green-50"
          >
            <input
              type="checkbox"
              checked={reviewerIds.includes(emp.id)}
              onChange={() => toggleReviewer(emp.id)}
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl p-6 w-[450px] shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Sending the form</h2>
            <p className="text-sm text-gray-600 mb-4">
                Once confirmed, the form will be sent to all the reviewers.
            </p>
            <div className="flex justify-center gap-4">
                <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1 border rounded-full text-gray-700 hover:bg-gray-100"
                >
                Cancel
                </button>
                <button
                onClick={handleSend}
                className="px-4 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                >
                Send
                </button>
            </div>
            </div>
        </div>
        )}

    </div>
  );
}
