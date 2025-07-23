import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import stsHomeImage from "../images/StsHomeImage.png";
import { request } from "../helpers/axios_helpers";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await request("POST","/auth/reset-password", {
        token,
        newPassword: password,
      });

      setMessage("Password has been reset successfully.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-5">
      {/* Left Side - Image & Support Info */}
      <div className="col-span-3 bg-white flex justify-center items-center flex-col">
        <div>
          <img src={stsHomeImage} alt="Reset Illustration" className="w-[600px]" />
          <p className="self-start pt-6">
            For support email us at support@STS.com
          </p>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="col-span-2 bg-[#ffefd3] flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-6 text-center">
          Reset Your Password
        </h1>

        <form onSubmit={handleResetPassword} className="w-[300px]">
          <div className="pt-8">
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="pt-6">
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {message && <p className="text-green-600 text-sm mt-2">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-8 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <div className="pt-4 text-sm text-center">
            <span
              onClick={() => navigate("/")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Back to Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
