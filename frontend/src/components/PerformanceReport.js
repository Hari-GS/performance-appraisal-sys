import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { getUser } from "../helpers/axios_helpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceReport = () => {
  const [chartData, setChartData] = useState(null);
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Fetching auth token
        
        const response = await axios.get(`http://localhost:8080/performance/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log(data);
        
        setChartData({
          labels: ["2022", "2023", "2024", "2025"],
          datasets: [
            {
              label: "Performance Score",
              data: [data.year2022, data.year2023, data.year2024, data.year2025],
              backgroundColor: "#BA55D3",
              barThickness: 30,
              maxBarThickness: 40, 
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchData();
  }, []);

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
      </div>
      <div className="p-4">
        {chartData ? <Bar data={chartData} options={options} /> : <p>No data to display</p>}
      </div>
    </div>
  );
};

export default PerformanceReport;
