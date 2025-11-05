/**
 * STATS_COLOR_CONFIG - Centralized color management system
 * Provides consistent color classes for background, text, and borders
 */
export const STATS_COLOR_CONFIG = {
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-500" },
    green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-500",
    },
    purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        border: "border-purple-500",
    },
    yellow: {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-500",
    },
    red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-500" },
    amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-500",
    },
    gray: {
        bg: "bg-gray-50",
        text: "text-gray-600",
        border: "border-gray-500",
    },
};

// Position classes mapping
export const STATS_POSITION_CLASSES = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
};

/**
 * Color configuration for different inquiry statuses
 * @type {Object}
 * @property {string} pending - Tailwind classes for pending state
 * @property {string} resolved - Tailwind classes for resolved state
 * @property {string} cancelled - Tailwind classes for cancelled state
 */
export const INQUIRIES_STATUS_COLORS = {
    pending: `${ STATS_COLOR_CONFIG.yellow.bg } ${ STATS_COLOR_CONFIG.yellow.text }`,
    resolved: `${ STATS_COLOR_CONFIG.green.bg } ${ STATS_COLOR_CONFIG.green.text }`,
    cancelled: `${ STATS_COLOR_CONFIG.red.bg } ${ STATS_COLOR_CONFIG.red.text }`,
};

export const INITIAL_DASHBOARD_STATE = {
    stats: {},
    lists: {},
    revenueData: []
}