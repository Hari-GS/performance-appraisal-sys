import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import defaultPreview from "../images/dp-default-preview.png";
import { request } from "../helpers/axios_helpers";
import ConfirmDialog from "./ConfirmDialog";


const AddEmployee = () => {  // Pass all employees as prop for dropdown
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [employees, setEmployees] = useState([]);
  const location = useLocation();
  const employee = location.state?.employee;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    designation: "",
    email: "",
    managerId: "",  // <-- New field
    isDirector:false
  });

  useEffect(() => {
    const fetchEmployee = async() =>{
      try{
        const response = await request("get","/api/new-employees/summary")
        setEmployees(response.data)
      }catch(error){
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, []);

  useEffect(() => {
    if (employee) {
      // Populate the form for edit mode
      setIsEdit(true);
      setFormData({
        name: employee.name || "",
        employeeId: employee.employeeId || "",
        designation: employee.designation || "",
        email: employee.email || "",
        managerId: employee.managerId || "",  // Assuming managerId is sent
        isDirector: employee.isDirector || false
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.employeeId.trim()) errors.employeeId = "Employee ID is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) errors.email = "Invalid email format.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setIsDialogOpen(true); // show confirmation dialog first
  };

  const handleConfirmSubmit = async () => {
    setIsDialogOpen(false);
    setIsLoading(true);

    try {
      const endpoint = isEdit
        ? `/api/new-employees/${formData.employeeId}`
        : "/api/new-employees";
      const method = isEdit ? "PUT" : "POST";
  
      // Convert empty string managerId to null before sending
      const payload = {
        ...formData,
        managerId: formData.managerId || null
      };
  
      await request(method, endpoint, payload);
      navigate("/employees");
    } catch (error) {
      const message = error.response?.data || "";
      const newErrors = {};
  
      if (typeof message === "string") {
        if (message.includes("Employee ID")) newErrors.employeeId = message;
        else if (message.includes("Email ID")) newErrors.email = message;
        else newErrors.general = message;
      }
  
      setFormErrors(newErrors);
    }finally{
      setIsLoading(false);
    }
  };
  

  return (
    
    <div className=" bg-white">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-md flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent mb-3"></div>
            <p className="text-gray-700 font-medium">
              {isEdit ? "Updating participant..." : "Creating participant..."}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-6 mb-12">
        <img
          src={formData.photo || defaultPreview}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2"
        />
        <p className="text-sm text-gray-500 italic">
          Profile image can be only updated by the respective user
        </p>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 mb-12">
        {["name", "employeeId", "designation", "email"].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-medium mb-2 capitalize">
              {field === "employeeId" ? "Employee ID" : field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              readOnly={field === "employeeId" && isEdit}
              className={`w-full border rounded-lg px-4 py-2 ${
                field === "employeeId" && isEdit
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
            />
            {formErrors[field] && (
              <span className="text-red-600 text-sm">{formErrors[field]}</span>
            )}
            {field === "employeeId" && (
              <p className="text-xs text-gray-500 mt-1">
                Employee ID cannot be changed {isEdit ? "" : "once declared"}.
              </p>
            )}
          </div>
        ))}

        {/* Director Checkbox */}
        <div className="mt-0 space-y-5">
          <label className="block text-gray-700 font-medium mb-2">
            Director Status
          </label>
          <div className="flex items-center space-x-3 ">
            <input
              type="checkbox"
              name="isDirector"
              checked={formData.isDirector || false}
              onChange={(e) =>
                setFormData({ ...formData, isDirector: e.target.checked })
              }
              className="w-5 h-5 text-orange-500 border-gray-300 rounded"
            />
            <span className="text-gray-800">He/She is a Director</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Select this option if the employee holds a director-level role, where he/she can able to see all people's live status and reports of the appraisal
          </p>
        </div>


        {/* Reporting Manager Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Reporting To
          </label>
          <select
            name="managerId"
            value={formData.managerId || ""}
            onChange={handleChange}
            className="w-full md:w-full border rounded-lg px-3 py-2 bg-white text-sm md:text-base"
          >
            <option className="whitespace-normal break-words text-sm leading-tight"
 value="">None (Reports to no one)</option>
            {employees
              .filter((emp) => emp.employeeId !== formData.employeeId)
              .map((emp) => (
                <option key={emp.employeeId} value={emp.employeeId}>
                  {emp.name} ({emp.designation})
                </option>
              ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
          Select the manager, team lead, or any other supervisor to whom this employee will directly report. They will review the employee’s self appraisal and add comment before final report.
          </p>
        </div>
      </div>

      {formErrors.general && (
        <p className="text-red-600 text-center mb-6">{formErrors.general}</p>
      )}

      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate("/employees")}
          className="px-4 py-2 rounded-md font-semibold  border-2  hover:bg-orange-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-accent text-white px-6 py-0 font-semibold rounded-md hover:bg-accent-dark"
        >
          {isEdit ? "Update" : "Submit"}
        </button>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        title={isEdit ? "Confirm the edit" : "Send Invitation?"}
        message={isEdit ? "Are you sure you want to edit this participant's detail?" : "This will send an email to the participant with a invite link to create their access account and join the performance appraisal portal."}
        onConfirm={handleConfirmSubmit}
        onCancel={() => setIsDialogOpen(false)}
      />

    </div>
  );
};

export default AddEmployee;
