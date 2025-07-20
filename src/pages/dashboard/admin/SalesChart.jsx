// components/SalesChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const SalesChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12500, 19000, 15000, 22000, 20000, 24000],
        fill: false,
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
        <select className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
          <option>Last 6 Months</option>
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="h-64">
        {/* <Line data={data} options={options} /> */}
      </div>
    </div>
  );
};

export default SalesChart;