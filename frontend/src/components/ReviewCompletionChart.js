import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ReviewCompletionChart({ title, completionValue }) {
  const hasValidData =
    typeof completionValue === "number" &&
    !isNaN(completionValue) &&
    completionValue > 0;

  // Only build data if valid
  const completionData = hasValidData
    ? [
        { name: "Completion", value: completionValue, color: "#007AFF" },
        { name: "Pending", value: 100 - completionValue, color: "#FF3B30" },
      ]
    : [];

  return (
    <div
      className={`bg-white p-4 shadow-md text-center rounded-xl w-full ${
        !hasValidData ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <h3 className="font-semibold mb-2">{title}</h3>

      {hasValidData ? (
        <>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={completionData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={120}
                paddingAngle={2}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                stroke="none"
              >
                {completionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-4 mt-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#007AFF] rounded-full"></span>{" "}
              Completion
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span> Pending
            </span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[350px] text-gray-500 font-medium">
          No data available yet
        </div>
      )}
    </div>
  );
}
