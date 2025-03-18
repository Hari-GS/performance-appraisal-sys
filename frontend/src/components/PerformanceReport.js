import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceReport = () => {
  const data = {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Attendance",
        data: [9, 8.5, 7, 8],
        backgroundColor: "#6A5ACD",
      },
      {
        label: "Points Accrued",
        data: [10, 10, 8, 9],
        backgroundColor: "#BA55D3",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 ml-14 mt-10 rounded-xl shadow-md w-[50%]">
      <div className="flex justify-between items-center bg-orange-500 text-white p-2 rounded-t-lg">
        <h3 className="font-bold">Performance Report</h3>
        <select className="bg-white text-black px-2 py-1 rounded-md">
          <option>2021 - 24</option>
        </select>
      </div>
      <div className="p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default PerformanceReport;
