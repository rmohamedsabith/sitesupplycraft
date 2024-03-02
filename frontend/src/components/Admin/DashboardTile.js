import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const DashboardTile = ({ categoryTitle, CategotyTotalCount, graphData }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: graphData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="text-center">
      <div className="rounded bg-light p-3">
        <h5 className="mb-0">{categoryTitle}</h5>
        <h5 className="mb-0 text-danger">{CategotyTotalCount}</h5>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default DashboardTile;
