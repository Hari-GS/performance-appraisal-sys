import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import stsHomeImage from "../images/StsHomeImage.png";
import { request } from "../helpers/axios_helpers";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
  
    try {
      const res = await request("POST", "/auth/forgot-password", { email });
      setMessage("Reset link has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen grid grid-cols-5">
      {/* Left Side - Image & Support Info */}
      <div className="col-span-3 bg-white flex justify-center items-center flex-col">
        <div>
          <img src={stsHomeImage} alt="Home Diagram" className="w-[600px]" />
          <p className="self-start pt-6">
            For support email us at support@STS.com
          </p>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="col-span-2 bg-[#ffefd3] flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-6 text-center">
          Forgot Your Password?
        </h1>
        <p className="text-gray-600 text-sm text-center w-[300px] mb-2">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleForgotPassword} className="w-[300px]">
          <div className="pt-8">
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
