import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stsHomeImage from "../images/StsHomeImage.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { request } from "../helpers/axios_helpers";

const Signup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("participant"); // "hr" | "participant"

  // HR signup fields
  const [hrData, setHrData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationPublicId: "",
  });

  // Participant signup fields
  const [participantData, setParticipantData] = useState({
    employeeId: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ---- Common Validation Helpers ----
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const validateHr = () => {
    const { name, email, password, confirmPassword, organizationPublicId } =
      hrData;
    if (!name || !email || !password || !confirmPassword || !organizationPublicId)
      return toast.error("All fields are required!");
    if (!isValidEmail(email)) return toast.error("Enter a valid email address!");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters!");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match!");
    return true;
  };

  const validateParticipant = () => {
    const { employeeId, email, newPassword, confirmPassword } = participantData;
    if (!employeeId || !email || !newPassword || !confirmPassword)
      return toast.error("All fields are required!");
    if (!isValidEmail(email)) return toast.error("Enter a valid email address!");
    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters!");
    if (newPassword !== confirmPassword)
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
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleParticipantSignup = async (e) => {
    e.preventDefault();
    if (!validateParticipant()) return;
    setLoading(true);

    try {
      const response = await request("POST", "auth/employee/set-password", participantData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Participant account created successfully!");
        setTimeout(() => navigate("/"), 1000);
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
            onClick={() => setActiveTab("participant")}
            className={`px-6 py-2 font-medium rounded-full transition-all duration-300 ${
              activeTab === "participant"
                ? "bg-accent text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Participant
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
              placeholder="Organization Public ID"
              value={hrData.organizationPublicId}
              onChange={(e) =>
                setHrData((prev) => ({
                  ...prev,
                  organizationPublicId: e.target.value,
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

        {/* Participant Signup Form */}
        {activeTab === "participant" && (
          <form
            onSubmit={handleParticipantSignup}
            className="w-[300px] animate-fadeIn"
            autoComplete="off"
          >
            <input
              type="text"
              placeholder="Employee ID"
              value={participantData.employeeId}
              onChange={(e) =>
                setParticipantData((prev) => ({
                  ...prev,
                  employeeId: e.target.value,
                }))
              }
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={participantData.email}
              onChange={(e) =>
                setParticipantData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Set Password"
              value={participantData.newPassword}
              onChange={(e) =>
                setParticipantData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={participantData.confirmPassword}
              onChange={(e) =>
                setParticipantData((prev) => ({
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
              className="w-full bg-accent text-white py-2 mt-8 rounded-lg hover:bg-accent-dark transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
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
