import React from "react";

export default function SummaryCard({ icon, title, value, sub }) {
  return (
    <div className="bg-primary-dark py-6 px-4 rounded-xl shadow mt-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-medium mt-2">{title}</h2>
        <div className="text-3xl pr-4">{icon}</div>
      </div>
      <p className="text-3xl font-semibold pt-2">{value}</p>
      <p className="text-sm text-gray-500 pt-2">{sub}</p>
    </div>
  );
}