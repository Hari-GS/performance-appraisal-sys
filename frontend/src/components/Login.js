import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import stsHomeImage from "../images/StsHomeImage.png";
import { getAuthToken } from "../helpers/axios_helpers";
import { loginUser } from "../redux/authSlice";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchUser } = useAuth();
  const location = useLocation();

  const { error, loading } = useSelector((state) => state.auth);

  // ✅ Handle Login and redirect
  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      try {
        // ✅ Refresh the AuthContext with latest user data
        await fetchUser();

        // ✅ Decode the token to determine role
        const token = getAuthToken();
        const decoded = jwtDecode(token);
        const role = decoded.role;

        // ✅ Navigate based on role
        if (role === "hr") {
          navigate("/hr-dashboard");
        } else if (role === "employee" || "director") {
          navigate("/employee-dashboard");
        } else {
          console.log("Invalid token role");
          navigate("/");
        }
      } catch (err) {
        console.error("Post-login error:", err);
      }
    }
  };

  const handleOrganizationLogin = () => {
      const params = new URLSearchParams(location.search);
      const status = params.get("status");
      if (status === "success") {
        toast.success("Your organization has been verified successfully!");
      } else if (status === "expired") {
        toast.error("Verification link has expired. Please register again.");
      }
  }

  useEffect(() => {
    handleOrganizationLogin();
    const token = getAuthToken();
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;
  
        // Already logged in? Redirect to correct dashboard
        if (role === "hr") {
          navigate("/hr-dashboard");
        } else if (role === "employee") {
          navigate("/employee-dashboard");
        }
      } catch (err) {
        console.error("Invalid token format:", err);
        // Optional: clear token or show error
      }
    }
  }, []);
  

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
        <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-6 text-center w-[400px]">
          CIT's Performance Appraisal Portal
        </h1>

        <form onSubmit={handleLogin} className="w-[300px]">
          <div className="pt-8">
            <input
              type="text"
              value={email}
              placeholder="Enter your Email Id"
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="pt-2 text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 mt-8 px-4 rounded-lg hover:bg-accent-dark transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {/* Login Redirect */}
        <p className="text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/sign-up")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
