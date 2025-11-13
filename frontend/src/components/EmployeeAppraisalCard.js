import React, { useEffect, useState } from "react";
import { FaRegFlag, FaChartBar } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";
import { ReactComponent as ChartBarHorizontal } from "../images/Appraisal-Icons/ChartBarHorizontal.svg";
import { ReactComponent as CalenderDots } from "../images/Appraisal-Icons/CalendarDots.svg";
import { ReactComponent as CellSignalFull } from "../images/Appraisal-Icons/CellSignalFull.svg";
import { useNavigate } from "react-router-dom";
import { request } from "../helpers/axios_helpers";

const EmployeeAppraisalCard = () => {
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

    function formatStageName(stage) {
        if (!stage) return "";
        return stage
          .toLowerCase()
          .split("_")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
  
    if (loading) {
      return (
        <div className="bg-primary p-10 text-gray-500 justify-center border-2 items-center">
          <p>Loading current appraisal...</p>
        </div>
      );
    }
  
    if (!appraisal) {
      return (
        <div className="bg-primary p-6 h-[180px] text-gray-500 border-b-2 flex justify-center items-center">
          <p>No active appraisal for you</p>
        </div>
      );
    }

  return (
    <div className="flex items-center justify-between bg-primary border-b-2 px-6 py-8">
      {/* Appraisal Title */}
      <div className="flex flex-col items-center space-y-1 text-center w-1/4">
        <ChartBarHorizontal/>
        <h3 className="text-lg font-semibold text-gray-900">Appraisal Name</h3>
        <p className="text-sm text-gray-600">{appraisal.title} - {appraisal.type}</p>
      </div>

      {/* Appraisal Duration */}
      <div className="flex flex-col items-center space-y-1 text-center w-1/4">
        <CalenderDots/>
        <h3 className="text-lg font-semibold text-gray-900">Appraisal Duration</h3>
        <p className="text-sm text-gray-600">{appraisal.startDate} to {appraisal.endDate}</p>
      </div>

      {/* Appraisal Status */}
      <div className="flex flex-col items-center space-y-1 text-center w-1/4">
        <CellSignalFull/>
        <h3 className="text-lg font-semibold text-gray-900">Appraisal Stage</h3>
        <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-md mt-1">
          {formatStageName(appraisal.stage)}
        </span>
      </div>

      {/* Button */}
      <button onClick={()=>navigate(`/employee/appraisal/${appraisal.id}`)} className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-4 py-2 rounded-md transition-all mr-4">
        Go to appraisal
        <MdArrowForward className="text-lg" />
      </button>
    </div>
  );
};

export default EmployeeAppraisalCard;
