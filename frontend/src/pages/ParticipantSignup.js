import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getAuthToken, request } from "../helpers/axios_helpers";
import { toast } from "react-toastify";
import stsHomeImage from "../images/StsHomeImage.png";

const ParticipantSignup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [participant, setParticipant] = useState({
    employeeId:"",
    name: "",
    designation:"",
    email: "",
    reportingPerson:"",
    password: "",
    confirmPassword:""
  });

  const [loading, setLoading] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  // ✅ Verify token & prefill user details
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await request("GET",`/auth/verify-invite?token=${token}`);
        // if (!res.ok) throw new Error("Invalid or expired token");
        const data = res.data;

        setParticipant((prev) => ({
          ...prev,
          employeeId:data.employeeId,
          name: data.name,
          designation: data.designation,
          email: data.email,
          reportingPerson:data.reportingPerson
        }));
      } catch (err) {
        console.error(err);
        setInvalidLink(true);
      }
    };

    if (token) verifyToken();
  }, [token]);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (participant.password !== participant.confirmPassword) {
        toast.error("Passwords do not match!")
        return;
      }

    setLoading(true);

    try {
        const payload = {
            token,
            password: participant.password,
          };

      const res = await request("POST","/auth/complete-signup",payload);

      if (res.status === 200) {
        toast.success("Signup successful! Please log in.");
        navigate("/");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (invalidLink) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Invalid or expired invitation link
        </h2>
        <p className="text-gray-600 mb-4">
          Please contact your HR manager to request a new invite.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-dark"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-5">
      {/* Left Section - Image and Info */}
      <div className="col-span-3 bg-white flex justify-center items-center flex-col">
        <div>
          <img src={stsHomeImage} alt="Signup Illustration" className="w-[600px]" />
          <p className="self-start pt-6">
            Need help? Contact <b>support@STS.com</b>
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="col-span-2 bg-[#ffefd3] flex justify-center items-center flex-col py-10 px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Complete Your Registration
        </h1>

       {/* Participant Details */}
<div className="w-[350px] bg-white rounded-2xl shadow-sm p-6 mt-4">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Participant Details</h2>
  <div className="divide-y divide-gray-200 text-sm">
    <div className="flex justify-between py-2">
      <span className="text-gray-600">Name</span>
      <span className="font-medium text-gray-900">{participant.name || "-"}</span>
    </div>
    <div className="flex justify-between py-2">
      <span className="text-gray-600">Employee ID</span>
      <span className="font-medium text-gray-900">{participant.employeeId || "-"}</span>
    </div>
    <div className="flex justify-between py-2">
      <span className="text-gray-600">Reporting Manager</span>
      <span className="font-medium text-gray-900">
        {participant.reportingPerson || "-- Not assigned yet --"}
      </span>
    </div>
    <div className="flex justify-between py-2 break-all">
      <span className="text-gray-600">Email</span>
      <span className="font-medium text-gray-900">{participant.email || "-"}</span>
    </div>
  </div>
</div>


        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="w-[350px] bg-white shadow-md rounded-2xl p-6 mt-6"
        >
          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Create your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={participant.password}
              onChange={(e) =>
                setParticipant({ ...participant, password: e.target.value })
              }
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="pt-4">
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={participant.confirmPassword}
              onChange={(e) =>
                setParticipant({ ...participant, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-2 mt-8 px-4 rounded-lg hover:bg-accent-dark transition duration-200 font-semibold"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Complete Signup"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline font-medium"
          >
            Log In
          </button>
        </p>
      </div>

    </div>
  );
};

export default ParticipantSignup;
