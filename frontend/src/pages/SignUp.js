import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stsHomeImage from "../images/StsHomeImage.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "../helpers/axios_helpers";
import { FaSpinner } from "react-icons/fa";


const Signup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hr"); // "hr" | "participant"

  // HR signup fields
  const [hrData, setHrData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationPublicId: "",
  });

  // Participant signup fields
  const [organizationData, setOrganizationData] = useState({
    organizationName: "",
    companyEmail: "",
    industryType: "",
    contactEmail: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // ---- Common Validation Helpers ----
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateHr = () => {
    const { name, email, password, confirmPassword, organizationId } =
      hrData;
    if (!name || !email || !password || !confirmPassword || !organizationId)
      return toast.error("All fields are required!");
    if (!isValidEmail(email)) return toast.error("Enter a valid email address!");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters!");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match!");
    return true;
  };

  const validateOrganization = () => {
    const { organizationName, companyEmail, industryType, contactEmail, password, confirmPassword } = organizationData;
    if (!organizationName || !companyEmail || !industryType || !contactEmail || !password || !confirmPassword)
      return toast.error("All fields are required!");
    if (!isValidEmail(companyEmail)) return toast.error("Enter a valid Official Company Email!");
    if (!isValidEmail(contactEmail)) return toast.error("Enter a valid contact email!");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters!");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match!");
    return true;
  };

  // ---- Submit Handlers ----
  const handleHrSignup = async (e) => {
    e.preventDefault();
    if (!validateHr()) return;
    setLoading(true);

    try {
      const response = await request("POST", "/auth/hr/register", hrData);
      if (response.status === 200 || response.status === 201) {
        toast.success("HR account created successfully!");
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizationSignup = async (e) => {
    e.preventDefault();
    if (!validateOrganization()) return;
    setLoading(true);

    try {
      const response = await request("POST", "/auth/organization", organizationData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Verification Email Sent! Please Check");
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-5">
      {/* Left Side - Image */}
      <div className="col-span-3 bg-white flex justify-center items-center flex-col">
        <div>
          <img src={stsHomeImage} alt="Home Diagram" className="w-[600px]" />
          <p className="self-start pt-6 text-gray-700">
            For support email us at support@STS.com
          </p>
        </div>
      </div>

      {/* Right Side - Signup Section */}
      <div className="col-span-2 bg-[#ffefd3] flex justify-center items-center flex-col transition-all duration-500">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-6 text-center">
          Create Your Account
        </h1>

        {/* Tab Switch */}
        <div className="flex mb-6 bg-white rounded-full shadow overflow-hidden">
          <button
            onClick={() => setActiveTab("hr")}
            className={`px-6 py-2 font-medium rounded-full transition-all duration-300 ${
              activeTab === "hr"
                ? "bg-accent text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            HR
          </button>
          <button
            onClick={() => setActiveTab("organization")}
            className={`px-6 py-2 font-medium rounded-full transition-all duration-300 ${
              activeTab === "organization"
                ? "bg-accent text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Organization
          </button>
        </div>

        {/* HR Signup Form */}
        {activeTab === "hr" && (
          <form
            onSubmit={handleHrSignup}
            className="w-[300px] animate-fadeIn"
            autoComplete="off"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={hrData.name}
              onChange={(e) =>
                setHrData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={hrData.email}
              onChange={(e) =>
                setHrData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={hrData.password}
              onChange={(e) =>
                setHrData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={hrData.confirmPassword}
              onChange={(e) =>
                setHrData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Organization ID"
              value={hrData.organizationId}
              onChange={(e) =>
                setHrData((prev) => ({
                  ...prev,
                  organizationId: e.target.value,
                }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-2 mt-8 rounded-lg hover:bg-accent-dark transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}

        {/* Organization Signup Form */}
        {activeTab === "organization" && (
          <form
            onSubmit={handleOrganizationSignup}
            className="w-[300px] animate-fadeIn"
            autoComplete="off"
          >
            <input
              type="text"
              placeholder="Organization Name"
              value={organizationData.organizationName}
              onChange={(e) =>
                setOrganizationData((prev) => ({
                  ...prev,
                  organizationName: e.target.value,
                }))
              }
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Official Company Email"
              value={organizationData.companyEmail}
              onChange={(e) =>
                setOrganizationData((prev) => ({
                  ...prev,
                  companyEmail: e.target.value,
                }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Contact Email (for notifications)"
              value={organizationData.contactEmail}
              onChange={(e) =>
                setOrganizationData((prev) => ({
                  ...prev,
                  contactEmail: e.target.value,
                }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            
            {/* Industry Type Dropdown */}
            <select
              value={organizationData.industryType}
              onChange={(e) =>
                setOrganizationData((prev) => ({ ...prev, industryType: e.target.value }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Industry Type
              </option>
              <option value="Information Technology">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Energy">Energy</option>
              <option value="others">others</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              value={organizationData.password}
              onChange={(e) =>
                setOrganizationData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={organizationData.confirmPassword}
              onChange={(e) =>
                setOrganizationData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-accent text-white py-2 mt-8 rounded-lg hover:bg-accent-dark transition ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-lg" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        )}

        {/* Login Redirect */}
        <p className="text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
