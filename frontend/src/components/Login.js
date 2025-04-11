import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import stsHomeImage from "../images/StsHomeImage.png";
import { getAuthToken } from "../helpers/axios_helpers";
import { loginUser } from "../redux/authSlice";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get authentication state from Redux
  const { user, error, loading } = useSelector((state) => state.auth);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ userId, password }));
  };

  // Redirect if user is logged in
  useEffect(() => {
    
    if (getAuthToken() || user) {
      navigate("/dashboard");
    }
  }, [user]);

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

      {/* Right Side - Login/Register */}
      <div className="col-span-2 bg-[#ffefd3] flex justify-center items-center flex-col">
        {/* Login Form */}
          <form onSubmit={handleLogin} className="w-[300px]">
            <div className="pt-8">
              <input
                type="text"
                value={userId}
                placeholder="Enter your username"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="pt-6">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 mt-8 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
      </div>
    </div>
  );
};

export default Login;
