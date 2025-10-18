import { FaRegFileAlt, FaClock, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { request } from "../helpers/axios_helpers";
import { useNavigate } from "react-router-dom";

const EmployeeAppraisalOverviewCard = () => {
  const [participant, setParticipant] = useState(null);
  const [appraisal, setAppraisal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response = await request("GET", "/api/appraisals/current-participant");
        setParticipant(response.data);
      } catch (error) {
        console.error("Failed to fetch participant appraisal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, []);

  // 2️⃣ Fetch full appraisal once participant is known
  useEffect(() => {
    if (participant?.appraisalId) {
      const fetchAppraisal = async () => {
        try {
          const response = await request("GET", `/api/appraisals/${participant.appraisalId}/employee`);
          setAppraisal(response.data);
        } catch (error) {
          console.error("Failed to fetch appraisal details:", error);
        }
      };

      fetchAppraisal();
    }
  }, [participant]);

  const statusColors = {
    "NOT_STARTED": "text-accent-darker",
    "IN_PROGRESS": "text-accent",
    "SUBMITTED": "text-green-600",
  };

  if (loading) {
    return (
      <div className="bg-primary-dark rounded-2xl shadow-md p-6 mt-6 w-[50%] text-gray-500">
        Loading current appraisal...
      </div>
    );
  }

  if (!appraisal) {
    return (
      <div className="bg-primary-dark rounded-2xl shadow-md p-6 mt-6 w-[50%] text-gray-500">
        No active appraisal found.
      </div>
    );
  }

  return (
    <div className="bg-primary-dark rounded-2xl shadow-md p-6 flex flex-col gap-4 mt-6 w-[50%]">
      <div className="flex items-center gap-3">
        <FaRegFileAlt className="text-black text-2xl" />
        <h2 className="text-xl font-bold text-black">Current Appraisal</h2>
      </div>

      <div className="space-y-2 pl-1">
        <p className="text-sm text-gray-500">Appraisal Title</p>
        <h3 className="text-lg font-semibold text-black">{appraisal.title}</h3>

        <p className="text-sm text-gray-500 mt-3">Self Appraisal Deadline</p>
        <div className="flex items-center gap-2 text-black">
          <FaClock />
          {appraisal.selfAppraisalEndDate}
        </div>

        <p className="text-sm text-gray-500 mt-3">Self Appraisal Status</p>
        <div className={`flex items-center gap-2 font-medium ${statusColors[participant.status] || "text-gray-600"}`}>
          {participant.status === "SUBMITTED" ? <FaCheckCircle /> : <FaArrowRight />}
          <span>{participant.status?.replace("_", " ")}</span>
        </div>
      </div>

      <button className="mt-4 px-4 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg self-start transition-all duration-300" onClick={() =>
        navigate(`/employee/appraisal/${participant.appraisalId}`)
      }>
        Go to Appraisal
      </button>
    </div>
  );
};

export default EmployeeAppraisalOverviewCard;
