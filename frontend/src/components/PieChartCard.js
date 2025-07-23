import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import { getUser } from "../helpers/axios_helpers";

const Donut = ({ year, value, color, size = 120 }) => {
  const data = [
    { name: "Score", value },
    { name: "Remaining", value: 100 - value },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={size / 2.8}
          outerRadius={size / 2}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          <Cell fill={color} />
          <Cell fill="#f0f0f0" />
        </Pie>
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#333"
        >
          {value}%
        </text>
      </PieChart>
      <p className="text-sm font-medium text-gray-600">{year}</p>
    </div>
  );
};

const PieChartCard = () => {
  const [donutData, setDonutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasValidData, setHasValidData] = useState(false);
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`http://localhost:8080/performance/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        // If data is null or all values are null
        const values = [data?.year2022, data?.year2023, data?.year2024, data?.year2025];
        const hasData = values.some((val) => val !== null && val !== undefined);

        if (hasData) {
          setHasValidData(true);
          const dynamicData = [
            { year: 2022, value: data.year2022 ?? 0, color: "#EC407A" },
            { year: 2023, value: data.year2023 ?? 0, color: "#FFA726" },
            { year: 2024, value: data.year2024 ?? 0, color: "#66BB6A" },
            { year: 2025, value: data.year2025 ?? 0, color: "#29B6F6" },
          ];
          setDonutData(dynamicData);
        } else {
          setHasValidData(false);
        }
      } catch (error) {
        console.error("Error fetching performance data:", error);
        setHasValidData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[100%] bg-white shadow-md rounded-xl p-6 mt-32 mr-1">
      <h3 className="text-lg font-semibold text-orange-600 mb-4">
        Performance Report Chart
      </h3>
      <div className="grid grid-cols-1 gap-6 justify-items-center min-h-[465px]">
        {loading ? (
          <div className="flex items-center justify-center h-96 w-full">
            <div className="w-8 h-8 border-4 border-orange-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : hasValidData ? (
          donutData.map((data) => <Donut key={data.year} {...data} />)
        ) : (
          <div className="flex items-center justify-center h-96 w-full">
            <p className="text-gray-500 text-sm">No past appraisals found</p>
          </div>
        )}
      </div>
    </div>

  );
};

export default PieChartCard;
