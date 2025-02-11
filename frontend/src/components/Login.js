import React, { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import stsHomeImage from '../images/StsHomeImage.png';
import stsLogo from '../images/STSLogo.png';
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-5">
      <div className="col-span-3 bg-white flex justify-center items-center flex-col">
        <div>
          <img src={stsHomeImage} alt="Home Diagram" className="w-[600px]" />
          <p className="self-start pt-6">For support email us at support@STS.com</p>
        </div>
      </div>
      <div className="col-span-2 bg-[#ffefd3] flex justify-center items-center flex-col">
        <img src={stsLogo} alt="stsLogo" className="w-[200px]" />
        <h1 className="text-2xl font-bold text-gray-700 pt-4">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="pt-8">
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter your username"
              className="w-[300px] mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="pt-8">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[300px] mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-between items-center my-4">
            <span></span>
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </form>
        {/* {message && <p>{message}</p>} */}
      </div>
    </div>
  );
};

export default Login;
