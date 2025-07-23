// components/ReviewCompletionChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const completionData = [
  { name: "Completion", value: 75, color: "#007AFF" }, // green
  { name: "Pending", value: 25, color: "#FF3B30" }     // red (100 - 75)
];

export default function ReviewCompletionChart() {
    return (
      <div className="bg-white p-4 shadow-md text-center">
        <h3 className="font-semibold mb-2">Review Completion Status</h3>
        <ResponsiveContainer width={540} height={450}>
          <PieChart>
            <Pie
              data={completionData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={150}
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
            <span className="w-3 h-3 bg-[#007AFF] rounded-full"></span> Completion
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span> Pending
          </span>
        </div>
      </div>
    );
  }
  
