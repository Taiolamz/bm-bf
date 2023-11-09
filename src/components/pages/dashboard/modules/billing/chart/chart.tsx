import React from "react";
import "./chart.css";
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
import { numberFormatChart } from "../../../../../helpers/helpers";

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
  label: string;
  data: number[];
  backgroundColor: string;
  barThickness?: number;
  borderWidth?: number;
  barPercentage?: number;
  categoryPercentage?: number;
  borderColor?: string;
}

export function BillingChart() {
  const labels: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dataSets: DataSets[] = [
    {
      label: "Inflow",
      data: [10, 20, 30, 40, 50, 69, 22, 44, 55, 56, 23, 54],
      backgroundColor: "#119c2b",
      barThickness: 30,
      borderColor: "rgba(0,0,0,0)",
      borderWidth: 5,
    },
    // {
    //   label: "Outflow",
    //   data: [40, 69, 22, 44, 23, 54, 50, 10, 20, 30, 55, 56],
    //   backgroundColor: "#F76659",
    //   barThickness: 30,
    //   borderWidth: 5,
    //   borderColor: "rgba(0,0,0,0)",
    // },
  ];

  const data: DataVal = {
    labels,
    datasets: dataSets,
  };

  const options: any = {
    responsive: true,
    gap: 3,

    plugins: {
      legend: {
        position: "bottom" as const,
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
      tooltip: {
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
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        barThickness: {
          max: 20,
        },
        padding: 2,
        ticks: {
          font: {
            family: "Mulish, sans-serif",
          },
        },
      },

      y: {
        grid: {
          display: true,
        },
        border: {
          dash: [5, 5],
          display: false,
        },
        ticks: {
          callback: (val: any) => `${numberFormatChart(val)}`,
          padding: 10,
          suggestedMin: 0,
          suggestedMax: -4,
          font: {
            family: "Mulish, sans-serif",
          },
        },
      },
    },
  };

  return (
    <>
      <Bar redraw={false} height={100} options={options} data={data} />
    </>
  );
}
