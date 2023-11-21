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

interface AreaChartProps {
  profitLabel?: string[] | any;
  profitData?: number[] | any;
}

export function AreaChart({ profitLabel, profitData }: AreaChartProps) {
  const labels: string[] = profitLabel || ["Jan", "Feb", "Mar", "April"];

  const dataSets: DataSets[] = [
    {
      data: profitData || [80, 90, 75, 100],
      fill: true,
      backgroundColor: "rgba(100, 197, 180, 1), rgba(132, 145, 154, 0)",
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
        borderWidth: 1,
        titleColor: "#004bff",
        yAlign: "top",
        mode: "index",
        displayColors: false,
        callbacks: {
          title: function (tooltipItems: any) {
            return "";
          },
          label: function (tooltipItem: any) {
            return "     " + tooltipItem.parsed.y + "     ";
          },
        },
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
        padding: 0,
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "6rem",
        marginLeft: "-.15rem",
        width: "101.3%",
      }}
    >
      <Line
        height={20}
        width={150}
        redraw={false}
        options={options}
        data={data}
      />
    </div>
  );
}
