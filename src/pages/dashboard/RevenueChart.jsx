import React from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Transforms raw revenue data into chart-compatible format
 * @param {Array<{month: string, totalRevenue: number}>} revenueData 
 * @returns {Object} { labels: string[], data: number[] }
 */
const prepareChartData = (revenueData) => {
  const allMonths = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "short" })
  );

  const monthToRevenue = revenueData.reduce((acc, item) => {
    const [month] = item.month.split("-");
    acc[parseInt(month)] = item.totalRevenue;
    return acc;
  }, {});

  return {
    labels: allMonths,
    data: allMonths.map((_, i) => monthToRevenue[i + 1] || 0)
  };
};

/**
 * Displays monthly revenue data in bar chart format
 * @param {Object} props
 * @param {Array<{month: string, totalRevenue: number}>} props.revenueData
 */
const RevenueChart = ({ revenueData = []}) => {

  // Memoize chart data preparation
  const { labels, data } = React.useMemo(
    () => prepareChartData(revenueData),
    [revenueData]
  );

  // Chart configuration
  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue (USD)",
        data,
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Revenue" },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="w-full  mx-auto p-4 ">
      <div className="" aria-label="Monthly revenue chart">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

RevenueChart.propTypes = {
  revenueData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      totalRevenue: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(RevenueChart);