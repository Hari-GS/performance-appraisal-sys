import React, { useState } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";
import defaultPreview from "../images/dp-default-preview.png";
import { request } from "../helpers/axios_helpers";

const AddEmployee = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeId: "",
    userId: "",
    role: "",
    dateOfBirth: "",
    dateOfJoining: "",
    gender: "",
    maritalStatus: "",
    bloodGroup: "",
    mobileNumber: "",
    address: "",
    personalMail: "",
    emergencyMobileNumber: "",
    holderName: "",
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10 MB
      if (file.size > maxSize) {
        alert("File size should not exceed 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };


  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!formData.userId.trim()) newErrors.userId = "User ID is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else if (new Date(formData.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of birth cannot be in the future";
    }

    if (!formData.dateOfJoining) newErrors.dateOfJoining = "Date of joining is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";

    if (!mobileRegex.test(formData.mobileNumber)) newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!emailRegex.test(formData.personalMail)) newErrors.personalMail = "Valid personal email required";
    if (!mobileRegex.test(formData.emergencyMobileNumber)) newErrors.emergencyMobileNumber = "Enter a valid emergency contact number";
    if (!formData.holderName.trim()) newErrors.holderName = "Holder name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await request("POST", "/employee", formData);
      console.log("Employee added:", response.data);
      alert("Employee added successfully!");
      if (onSubmit) onSubmit(formData);
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Something went wrong while adding the employee.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-8">
      <div className="w-[80%] p-6">

        {/* Profile Header */}
        <div className="flex items-start gap-8 border-b pb-6">
          {/* Profile Image */}
          <div className="relative w-32 h-32 border-2 rounded-full shrink-0">
            <img
              src={formData.photo || defaultPreview}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            {/* Upload Image */}
            <label className="absolute top-0 right-0 bg-orange-500 p-1 rounded-full text-white cursor-pointer hover:bg-orange-600 transition">
              <FaCamera size={16} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {/* Delete Image */}
            {formData.photo && (
              <button
                onClick={() => setFormData((prev) => ({ ...prev, photo: "" }))}
                className="absolute bottom-0 right-0 bg-orange-500 p-1 rounded-full text-white hover:bg-orange-600 transition"
                title="Remove Image"
              >
                <FaTrash size={14} />
              </button>
            )}
          </div>

          {/* Input Fields */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 rounded w-full" />
              {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 rounded w-full" />
              {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
            </div>
            <div>
              <input name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} className="border p-2 rounded w-full" />
              {errors.employeeId && <p className="text-red-600 text-sm">{errors.employeeId}</p>}
            </div>
            <div>
              <input name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} className="border p-2 rounded w-full" />
              {errors.userId && <p className="text-red-600 text-sm">{errors.userId}</p>}
            </div>
            <div>
              <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} className="border p-2 rounded w-full" />
              {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="mt-4">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg font-semibold">Personal Details</div>
          <div className="grid grid-cols-2 gap-4 p-4 border">
            <div>
              <p>Date of Birth</p>
              <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} className="border p-2 mt-2 rounded w-full" />
              {errors.dateOfBirth && <p className="text-red-600 text-sm">{errors.dateOfBirth}</p>}
            </div>
            <div>
              <p>Date of Joining</p>
              <input name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} className="border p-2 mt-2 rounded w-full" />
              {errors.dateOfJoining && <p className="text-red-600 text-sm">{errors.dateOfJoining}</p>}
            </div>
            <div>
            <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 mt-2 rounded w-full">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
          </div>

          <div>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="border p-2 mt-2 rounded w-full">
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            {errors.maritalStatus && <p className="text-red-600 text-sm">{errors.maritalStatus}</p>}
          </div>

          <div>
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="border p-2 mt-2 rounded w-full">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && <p className="text-red-600 text-sm">{errors.bloodGroup}</p>}
          </div>

            <div>
              <input name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} className="border p-2 mt-2 rounded w-full" />
              {errors.mobileNumber && <p className="text-red-600 text-sm">{errors.mobileNumber}</p>}
            </div>
            <div className="col-span-2">
              <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 rounded w-full resize-none" />
              {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
            </div>
            <div>
              <input name="personalMail" type="email" placeholder="Personal Email" value={formData.personalMail} onChange={handleChange} className="border p-2 rounded w-full" />
              {errors.personalMail && <p className="text-red-600 text-sm">{errors.personalMail}</p>}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-4">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-t-lg font-semibold">Emergency Contact</div>
          <div className="p-4 border space-y-3">
            <div>
              <input name="emergencyMobileNumber" placeholder="Emergency Mobile Number" value={formData.emergencyMobileNumber} onChange={handleChange} className="border p-2 rounded w-full" />
              {errors.emergencyMobileNumber && <p className="text-red-600 text-sm">{errors.emergencyMobileNumber}</p>}
            </div>
            <div>
              <input name="holderName" placeholder="Holder Name" value={formData.holderName} onChange={handleChange} className="border p-2 rounded w-full" />
              {errors.holderName && <p className="text-red-600 text-sm">{errors.holderName}</p>}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button onClick={handleSubmit} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
