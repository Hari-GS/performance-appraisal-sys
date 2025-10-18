import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { request } from "../helpers/axios_helpers";
import { FaUsers } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";

export default function SummaryCards() {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    selfReviewsCompleted: 0,
    reportingReviewsCompleted: 0,
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

  const { totalEmployees, selfReviewsCompleted, reportingReviewsCompleted, totalReportingReviewsToDo } = summary;

  const selfCompletionRate =
    totalEmployees > 0
      ? ((selfReviewsCompleted / totalEmployees) * 100).toFixed(1)
      : 0;

  const reportingCompletionRate =
    totalEmployees > 0
      ? ((reportingReviewsCompleted / totalReportingReviewsToDo) * 100).toFixed(1)
      : 0;

  const cards = [
    {
      title: "Total Participants",
      value: totalEmployees,
      icon: <FaUsers size={24} className="text-blue-600" />,
    },
    {
      title: "Self Reviews Completed",
      value: selfReviewsCompleted,
      sub: `${selfReviewsCompleted} of ${totalEmployees} | ${selfCompletionRate}% completion`,
      icon: <MdDoneAll size={24} className="text-green-600" />,
    },
    {
      title: "Reporting Reviews Completed",
      value: reportingReviewsCompleted,
      sub: `${reportingReviewsCompleted} of ${totalReportingReviewsToDo} | ${reportingCompletionRate}% completion`,
      icon: <MdDoneAll size={24} className="text-green-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <SummaryCard key={idx} {...card} />
      ))}
    </div>
  );
}
