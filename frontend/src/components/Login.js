import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stsHomeImage from "../images/StsHomeImage.png";
import { request, setAuthHeader, getAuthToken } from "../helpers/axios_helpers";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // For redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await request("POST", "/login", { login, password });
      if (response.data.token) {
        setAuthHeader(response.data.token); // Store token
        navigate("/dashboard"); // Redirect after login
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await request("POST", "/register", {
        firstName,
        lastName,
        login,
        password,
      });
      if (response.data.token) {
        setAuthHeader(response.data.token); // Store token
        navigate("/dashboard"); // Redirect after login
      }
      
    } catch (err) {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getAuthToken()) {
      navigate("/dashboard"); // ✅ Redirect to dashboard if authenticated
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
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "login" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === "register" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" ? (
          <form onSubmit={handleLogin} className="w-[300px]">
            <div className="pt-8">
              <input
                type="text"
                id="username"
                value={login}
                placeholder="Enter your username"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="pt-6">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex justify-between items-center my-4">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        ) : (
          // Register Form
          <form onSubmit={handleRegister} className="w-[300px]">
            <div className="pt-4">
              <input
                type="text"
                id="firstName"
                value={firstName}
                placeholder="First Name"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="pt-4">
              <input
                type="text"
                id="lastName"
                value={lastName}
                placeholder="Last Name"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="pt-4">
              <input
                type="text"
                id="username"
                value={login}
                placeholder="Enter your login ID"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="pt-4">
              <input
                type="password"
                id="password"
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
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
