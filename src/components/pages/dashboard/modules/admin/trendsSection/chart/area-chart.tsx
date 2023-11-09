import React from "react";
// import "./chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
  Filler,
  Legend
);

interface DataVal {
  labels: string[];
  datasets: DataSets[];
}

interface DataSets {
  data: number[] | any;
  backgroundColor: string;
  fill: boolean;
  pointRadius?: number;
  borderColor?: string;
}

export function AreaChart() {
  const labels: string[] = ["Enterprise", "Large", "Medium", "SME"];

  const dataSets: DataSets[] = [
    {
      data: [80, 90, 75, 100],
      fill: true,
      backgroundColor: "#119c2b",
      pointRadius: 0,
      borderColor: "rgba(0,0,0,0)",
    },
  ];

  const data: DataVal = {
    labels,
    datasets: dataSets,
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#ffff",
        bodyColor: "#004bff",
        borderColor: "#004bff",
        titleFontSize: 30,
        titleColor: "#004bff",
        yAlign: "top",
        mode: "index",
        borderWidth: 1,
        displayColors: false,
        bodyFont: {
          family: "Mulish, sans-serif",
        },
        titleFont: {
          family: "Mulish, sans-serif",
        },
      },
    },

    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Line
        height={50}
        width={220}
        redraw={false}
        options={options}
        data={data}
      />
    </div>
  );
}
