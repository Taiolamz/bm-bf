import React from "react";
// import "./chart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataVal {
  labels: string[];
  datasets: DataSets[];
}

interface DataSets {
  data: number[] | any;
  backgroundColor: string[];
  fill: boolean;
  pointRadius?: number;
  borderColor?: string;
  barPercentage?: number;
  spacing?: number;
  hoverBorderWidth?: number;
  hoverOffset?: number;
  hoverBorderColor?: string[];
}

interface DoughnutChartProps {
  planLabels?: string[];
  planData?: string[];
}
export function DoughnutChart({ planLabels, planData }: DoughnutChartProps) {
  const labels: string[] = planLabels || [
    "Enterprise",
    "Large",
    "Medium",
    "SME",
  ];

  const dataSets: DataSets[] = [
    {
      data: planData || [80, 90, 75, 100],
      fill: true,
      backgroundColor: [
        "rgba(255, 144, 144, 1)",
        "rgba(207, 31, 31, 1)",
        "rgba(205, 142, 142, 1)",
        "rgba(250, 21, 159, 0.8)",
      ],
      pointRadius: 0,
      borderColor: "rgba(0,0,0,0)",
      barPercentage: 50,
      spacing: 10,
      hoverBorderColor: [
        "rgba(255, 144, 144, 1)",
        "rgba(207, 31, 31, 1)",
        "rgba(205, 142, 142, 1)",
        "rgba(250, 21, 159, 0.8)",
      ],
      hoverBorderWidth: 5,
    },
  ];

  const data: DataVal = {
    labels,
    datasets: dataSets,
  };

  const options: any = {
    responsive: true,
    plugins: {
      layout: {
        paddingBottom: 15,
      },
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
        width: "20rem",
        height: "20rem",
        padding: "3rem 0 0 3rem",
        marginTop: "1rem",
        marginBottom: "2rem",
      }}
    >
      <Doughnut
        width={20}
        height={10}
        redraw={false}
        options={options}
        data={data}
      />
    </div>
  );
}
