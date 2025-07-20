// components/StatsOverview.jsx
import React from "react";

/**
 * Tooltip component for displaying additional information
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Trigger element
 * @param {string} props.content - Tooltip content
 */
const Tooltip = ({ children, content }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="inline-flex items-center"
        aria-label="More information"
      >
        {children}
        <svg
          className="ml-1 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      {visible && (
        <div className="absolute z-10 w-48 p-2 mt-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-md shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
};

/**
 * StatIcon - Consistent icon styling wrapper
 * @param {Object} props - Component props
 * @param {ReactNode} props.icon - Icon component
 * @param {string} props.color - Color variant
 */
const StatIcon = ({ icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
  }[color];

  return (
    <div className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 rounded-full ${colorClasses}`}>
      {icon}
    </div>
  );
};

/**
 * StatCard - Individual statistic card component
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Display value
 * @param {Object} [props.trend] - Trend data
 * @param {string} [props.description] - Tooltip content
 * @param {ReactNode} props.icon - Icon component
 * @param {string} props.color - Color variant
 */
const StatCard = ({ title, value, trend, description, icon, color }) => {
  const borderColors = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    yellow: "border-yellow-500",
    red: "border-red-500",
    amber: "border-amber-500",
  };

  return (
    <div className={`bg-white border rounded-xl shadow-xs p-8 hover:shadow-md transition-all ${borderColors[color]}`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            {description && <Tooltip content={description} />}
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {typeof value === "number" && title.includes("Revenue")
              ? `$${value.toLocaleString("en-US")}`
              : value}
            {trend && (
              <span className={`ml-2 text-xs ${trend.color}`}>
                {trend.value}
              </span>
            )}
          </p>
        </div>
        <StatIcon icon={icon} color={color} />
      </div>
    </div>
  );
};

// Icon components
const UsersIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ShoppingCartIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CurrencyDollarIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InboxIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);

const ExclamationIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const ClockIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/**
 * StatsOverview - Main dashboard statistics component
 * @param {Object} props - Component props
 * @param {Object} props.data - Statistics data
 */
const StatsOverview = ({ data }) => (
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
    <StatCard
      title="Total Users"
      value={data.totalUsers}
      description="Registered active users in the system"
      color="blue"
      icon={<UsersIcon />}
      trend={{ value: "+12%", color: "text-green-500" }}
    />
    <StatCard
      title="Total Orders"
      value={data.totalOrders}
      description="All orders placed in the system"
      color="green"
      icon={<ShoppingCartIcon />}
    />
    <StatCard
      title="Total Revenue"
      value={data.totalRevenue}
      color="purple"
      icon={<CurrencyDollarIcon />}
      description="Total revenue generated"
      trend={{
        value: data.monthlyGrowth,
        color: "text-green-500",
      }}
    />
    <StatCard
      title="Pending Inquiries"
      value={data.pendingInquiries}
      description="Customer inquiries awaiting response"
      color="yellow"
      icon={<InboxIcon />}
    />
    <StatCard
      title="Low Stock Items"
      value={data.lowStockItems}
      description="Products with stock below threshold"
      color="red"
      icon={<ExclamationIcon />}
    />
    <StatCard
      title="Pending Processing"
      value={data.pendingProcessing}
      description="Orders awaiting fulfillment"
      color="amber"
      icon={<ClockIcon />}
    />
  </div>
);

export default StatsOverview;