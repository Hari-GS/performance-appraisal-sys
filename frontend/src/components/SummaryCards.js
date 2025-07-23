import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { request } from "../helpers/axios_helpers";
import { FaUsers } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";

export default function SummaryCards() {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    completedReviews: 0,
    pendingReviews: 0,
    averageScore: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await request("GET", "/api/dashboard/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard summary", error);
      }
    };

    fetchSummary();
  }, []);

  const cards = [
    {
      title: "Total Employee",
      value: summary.totalEmployees,
      sub: "+15 From last cycle",
      icon: <FaUsers size={24} className="text-blue-600" />,
    },
    {
      title: "Review Completed",
      value: summary.completedReviews,
      sub: "75% completion rate",
      icon: <MdDoneAll size={24} className="text-green-600" />,
    },
    {
      title: "Pending Reviews",
      value: summary.pendingReviews,
      sub: "Due in 5 days",
      icon: <AiOutlineClockCircle size={24} className="text-yellow-600" />,
    },
    {
      title: "Avg Score",
      value: summary.averageScore.toFixed(1),
      sub: "+0.5 from last cycle",
      icon: <BsStarFill size={24} className="text-orange-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <SummaryCard key={idx} {...card} />
      ))}
    </div>
  );
}
