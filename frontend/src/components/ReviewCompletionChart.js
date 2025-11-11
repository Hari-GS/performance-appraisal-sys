import React from "react";
import { PieChart, Pie, Cell } from "recharts";

export default function ReviewCompletionChart({
  title,
  totalEmployees,
  completionValue,
  textLabel
}) {
  const hasValidData =
    typeof completionValue === "number" &&
    !isNaN(completionValue) &&
    completionValue > 0;

  // Prevent invalid data
  const completed = hasValidData ? parseFloat(completionValue.toFixed(0)) : 0;
  const notCompleted = hasValidData ?  parseFloat((100 - completionValue).toFixed(0)) : 0;

  const data = hasValidData
    ? [
        { name: "Completed", value: completed, color: "#00FF66" },
        { name: "Not completed", value: notCompleted, color: "#FF6B6B" }
      ]
    : [];

  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6 w-[640px] h-[380px]">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>

      {hasValidData ? (
        <>
          {/* Semi-Circle Chart */}
          <div className="relative flex justify-center items-center mt-10">
            <PieChart width={350} height={180}>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={120}
                outerRadius={160}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            {/* Center Text */}
            <div className="absolute top-[110px] text-center">
              <p className="text-gray-500 text-sm">{textLabel}</p>
              <p className="text-2xl font-semibold text-black">{totalEmployees}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-10 mt-8 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#00FF66]" />
              <span>Completed</span>
              <span className="ml-1">{completed}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#FF6B6B]" />
              <span>Not Completed</span>
              <span className="ml-1">{notCompleted}%</span>
            </div>
          </div>
        </>
      ) : (
        // No data fallback
        <div className="flex items-center justify-center h-[220px] text-gray-500 font-medium mt-5">
          No data available yet
        </div>
      )}
    </div>
  );
}
