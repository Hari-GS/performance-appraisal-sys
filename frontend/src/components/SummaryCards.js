import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { request } from "../helpers/axios_helpers";
import { FaUsers } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { ReactComponent as UsersThree } from "../images/Appraisal-Icons/UsersThree.svg";
import { ReactComponent as ChartPieSlice } from "../images/Appraisal-Icons/ChartPieSlice.svg";
import { ReactComponent as CardsThree } from "../images/Appraisal-Icons/CardsThree.svg";

export default function SummaryCards() {
  const [summary, setSummary] = useState({
    totalEmployees: "_",
    selfReviewsCompleted: "_",
    reportingReviewsCompleted: "_",
    totalReportingReviewsToDo: "_",
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await request("GET", "/api/dashboard/summary");
        const data = response.data || {};

        // Replace null or undefined with "_"
        const cleanedData = {
          totalEmployees:
            data.totalEmployees != null ? data.totalEmployees : "_",
          selfReviewsCompleted:
            data.selfReviewsCompleted != null ? data.selfReviewsCompleted : "_",
          reportingReviewsCompleted:
            data.reportingReviewsCompleted != null
              ? data.reportingReviewsCompleted
              : "_",
          totalReportingReviewsToDo:
            data.totalReportingReviewsToDo != null
              ? data.totalReportingReviewsToDo
              : "_",
        };

        setSummary(cleanedData);
      } catch (error) {
        console.error("Failed to fetch dashboard summary", error);
      }
    };

    fetchSummary();
  }, []);

  const {
    totalEmployees,
    selfReviewsCompleted,
    reportingReviewsCompleted,
    totalReportingReviewsToDo,
  } = summary;

  // Safely compute completion rates only if values are numbers
  const selfCompletionRate =
    typeof totalEmployees === "number" && totalEmployees > 0
      ? ((selfReviewsCompleted / totalEmployees) * 100).toFixed(0)
      : "_";

  const reportingCompletionRate =
    typeof totalReportingReviewsToDo === "number" &&
    totalReportingReviewsToDo > 0
      ? ((reportingReviewsCompleted / totalReportingReviewsToDo) * 100).toFixed(0)
      : "_";

  const cards = [
    {
      title: "Total Participants",
      value: totalEmployees,
      icon: <UsersThree/>,
    },
    {
      title: "Self Reviews Completed",
      value: selfReviewsCompleted,
      sub:
        selfCompletionRate === "_"
          ? "_"
          : `${selfReviewsCompleted} of ${totalEmployees} | ${selfCompletionRate}% completion`,
      icon: <ChartPieSlice/>,
    },
    {
      title: "Reporting Reviews Completed",
      value: reportingReviewsCompleted,
      sub:
        reportingCompletionRate === "_"
          ? "_"
          : `${reportingReviewsCompleted} of ${totalReportingReviewsToDo} | ${reportingCompletionRate}% completion`,
      icon: <CardsThree/>,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:p-0">
      {cards.map((card, idx) => (
        <SummaryCard key={idx} {...card} />
      ))}
    </div>
  );
}
