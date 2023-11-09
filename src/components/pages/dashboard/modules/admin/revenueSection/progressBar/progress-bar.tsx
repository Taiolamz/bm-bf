import React from "react";
// import "./chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataVal {
  labels: string[];
  datasets: DataSets[];
}

interface DataSets {
  data: number[];
  backgroundColor: string[];
  barThickness?: number;
  borderWidth?: number;
  barPercentage?: number;
  categoryPercentage?: number;
  borderColor?: string;
  borderRadius?: number;
}

export function ProgressChart() {
  const labels: string[] = ["Enterprise", "Large", "Medium", "SME"];

  const dataSets: DataSets[] = [
    {
      data: [50, 40, 20, 30],
      backgroundColor: ["#F012DACC", "#004BFFCC", "#0F8028CC", "#FA159FCC"],
      barThickness: 40,
      borderColor: "rgba(0,0,0,0)",
      borderWidth: 5,
      borderRadius: 10,
    },
  ];

  const data: DataVal = {
    labels,
    datasets: dataSets,
  };

  const options: any = {
    responsive: true,
    gap: 1,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#ffff",
        bodyColor: "#004bff",
        borderColor: "#004bff",
        titleFontSize: 30,
        yAlign: "top",
        mode: "index",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: function (tooltipItems: any) {
            return "";
          },
          label: function (tooltipItem: any) {
            return "     " + tooltipItem.parsed.y + "     ";
          },
        },
      },
      bodyFont: {
        family: "Mulish, sans-serif",
      },
      titleFont: {
        family: "Mulish, sans-serif",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            family: "Mulish, sans-serif",
            size: 10,
            weight: 700,
            color: "red",
          },
        },
      },

      y: {
        display: false,
      },
    },
  };

  return (
    <>
      <Bar
        redraw={false}
        width={105}
        // height={250}
        // className="chart-wrap"
        options={options}
        data={data}
      />
    </>
  );
}
