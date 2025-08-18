import React from "react";
import { request } from "../helpers/axios_helpers";
import {useState, useEffect} from "react";

export default function Header() {
    const [userInfo, setUserInfo] = useState("");
    const [year, setYear] = useState("2025");
    const [cycle, setCycle] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await request("GET", "/auth/me");
            setUserInfo(response.data);
          } catch (error) {
            console.error("Failed to fetch user info", error);
          }
        };
    
        fetchUser();
    }, []);

  return (
    <div className="flex flex-row justify-between">
      <div className=" mt-6 ml-6">
      <h1 className="text-2xl font-semibold">Hello {userInfo.name}, Welcome Back!</h1>
      <p className="text-gray-600">{userInfo.designation}</p>
    </div>
    {/* <div className="bg-blue-100 px-4 h-12 mt-6 rounded-md flex items-center space-x-3 text-sm">
      <span className="font-semibold">Appraisal :</span>
   
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="px-2 py-1 border rounded-md bg-white focus:outline-none"
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>

      <select
        value={cycle}
        onChange={(e) => setCycle(e.target.value)}
        className="px-2 py-1 border rounded-md bg-white focus:outline-none"
      >
        <option value="">Cycle Name</option>
        <option value="Q1">Q1 Cycle</option>
        <option value="Q2">Q2 Cycle</option>
        <option value="MidYear">Mid-Year Cycle</option>
      </select>
    </div> */}
    </div>
  );
}
