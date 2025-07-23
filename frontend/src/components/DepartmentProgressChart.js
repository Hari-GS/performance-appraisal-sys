// components/DepartmentProgressChart.jsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";

const initialData = [
  { name: "Manager", progress: 90, color: "#7F9CF5" },
  { name: "Team Lead", progress: 68, color: "#F56565" },
  { name: "Employee", progress: 78, color: "#ED64A6" },
  { name: "Employee", progress: 58, color: "#F6E05E" },
];

export default function DepartmentProgressChart() {
    const [selected, setSelected] = useState("All");
  
    const filteredData = selected === "All"
      ? initialData
      : initialData.filter((item) => item.name === selected);
  
    const uniqueDepartments = ["All", ...new Set(initialData.map((d) => d.name))];
  
    return (
      <div className="bg-white p-4 shadow-md">
        <h3 className="font-semibold mb-2">Department Progress</h3>
        <ResponsiveContainer width={540} height={450}>
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="progress" radius={[8, 8, 0, 0]}>
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <select
            className="border rounded px-4 py-1 text-sm"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {uniqueDepartments.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  
