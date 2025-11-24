import React from "react";

export default function SummaryCard({ icon, title, value, sub }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6 w-full md:w-80">
      <div>
        <div className="text-3xl pr-4">{icon}</div>
        <h2 className="text-lg font-medium mt-2">{title}</h2>
      </div>
      <p className="text-3xl font-semibold pt-2">{value}</p>
      <p className="text-sm text-gray-500 pt-2">{sub}</p>
    </div>
  );
}