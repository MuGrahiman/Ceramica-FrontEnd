// =============================================================================
// ORDER CONSTANTS
// =============================================================================
import { TbBasketCancel, TbClipboardCheck, TbPackage, TbShoppingBag, TbTruckDelivery } from "react-icons/tb";
import { FILTER_FORMS_COMPONENTS } from "./filter-form";
import { toPascalCase } from "../utils/generals";

/**
 * Base URL for orders dashboard
 * @constant {string}
 */
export const ORDER_URL = "/dashboard/orders";

// =============================================================================
// BREADCRUMB CONFIGURATION
// =============================================================================

/**
 * Generates breadcrumb items for order navigation
 * @param {string} title - The current page title
 * @returns {Array} Array of breadcrumb items
 */
export const ORDER_BREAD_CRUMB_ITEMS = ( title ) => [
    { label: "Order", to: ORDER_URL },
    { label: title },
];

// =============================================================================
// STATUS CONSTANTS
// =============================================================================

/**
 * Order status constants
 * @constant {Object}
 */
export const ORDER_STATUSES = Object.freeze( {
    ORDERED: "ordered",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
} );

/**
 * Payment status constants
 * @constant {Object}
 */
export const PAYMENT_STATUS = Object.freeze( {
    CREATED: "created",
    SAVED: "saved",
    APPROVED: "approved",
    VOIDED: "voided",
    COMPLETED: "completed",
    PAYER_ACTION_REQUIRED: "payerActionRequired",
} );

// =============================================================================
// STYLING CONSTANTS
// =============================================================================

/**
 * Color variants for order status badges
 * @constant {Object}
 */
export const ORDER_STATUS_COLOR_VARIANTS = Object.freeze( {
    red: "border-red-500 bg-red-200 text-red-500",
    orange: "border-orange-500 bg-orange-200 text-orange-500",
    yellow: "border-yellow-500 bg-yellow-200 text-yellow-500",
    lime: "border-lime-500 bg-lime-200 text-lime-500",
    green: "border-green-500 bg-green-200 text-green-500",
    gray: "border-gray-500 bg-gray-200 text-gray-500",
} );

// =============================================================================
// ORDER STATUS STEPS CONFIGURATION
// =============================================================================

/**
 * Order status steps with icons and descriptions
 * @constant {Array}
 */
export const ORDER_STATUS_STEPS = Object.freeze( [
    {
        id: ORDER_STATUSES.ORDERED,
        label: "Ordered",
        description: "Your order has been placed and is being processed.",
        color: ORDER_STATUS_COLOR_VARIANTS.orange,
        icon: TbShoppingBag,
    },
    {
        id: ORDER_STATUSES.PROCESSING,
        label: "Processing",
        description: "Your order is being prepared for shipment.",
        color: ORDER_STATUS_COLOR_VARIANTS.yellow,
        icon: TbPackage,
    },
    {
        id: ORDER_STATUSES.SHIPPED,
        label: "Shipped",
        description: "Your order has been shipped and is on its way.",
        color: ORDER_STATUS_COLOR_VARIANTS.lime,
        icon: TbTruckDelivery,
    },
    {
        id: ORDER_STATUSES.DELIVERED,
        label: "Delivered",
        description: "Your order has been delivered successfully.",
        color: ORDER_STATUS_COLOR_VARIANTS.green,
        icon: TbClipboardCheck,
    },
    {
        id: ORDER_STATUSES.CANCELLED,
        label: "Cancelled",
        description: "Your order has been cancelled.",
        color: ORDER_STATUS_COLOR_VARIANTS.red,
        icon: TbBasketCancel,
    },
] );

// =============================================================================
// FILTER OPTIONS CONFIGURATION
// =============================================================================

/**
 * Default values for order filter forms
 * @constant {Object}
 */
export const ORDER_FILTER_FORMS_DEFAULT_VALUES = Object.freeze( {
    paymentStatus: [],
    startDate: "", 
    endDate: "",
    minPrice: "",
    maxPrice: "",
} );

/**
 * Order status options for filter forms
 * @constant {Array}
 */
const ORDER_STATUS_OPTIONS = Object.freeze( [
    { value: ORDER_STATUSES.ORDERED, label: toPascalCase( ORDER_STATUSES.ORDERED ) },
    { value: ORDER_STATUSES.PROCESSING, label: toPascalCase( ORDER_STATUSES.PROCESSING ) },
    { value: ORDER_STATUSES.SHIPPED, label: toPascalCase( ORDER_STATUSES.SHIPPED ) },
    { value: ORDER_STATUSES.DELIVERED, label: toPascalCase( ORDER_STATUSES.DELIVERED ) },
    { value: ORDER_STATUSES.CANCELLED, label: toPascalCase( ORDER_STATUSES.CANCELLED ) },
] );

/**
 * Payment status options for filter forms
 * @constant {Array}
 */
const PAYMENT_STATUS_OPTIONS = Object.freeze( [
    { value: PAYMENT_STATUS.CREATED, label: toPascalCase( PAYMENT_STATUS.CREATED ) },
    { value: PAYMENT_STATUS.SAVED, label: toPascalCase( PAYMENT_STATUS.SAVED ) },
    { value: PAYMENT_STATUS.APPROVED, label: toPascalCase( PAYMENT_STATUS.APPROVED ) },
    { value: PAYMENT_STATUS.VOIDED, label: toPascalCase( PAYMENT_STATUS.VOIDED ) },
    { value: PAYMENT_STATUS.COMPLETED, label: toPascalCase( PAYMENT_STATUS.COMPLETED ) },
    { value: PAYMENT_STATUS.PAYER_ACTION_REQUIRED, label: toPascalCase( PAYMENT_STATUS.PAYER_ACTION_REQUIRED ) },
] );

/**
 * Field configurations for admin order filters
 * @constant {Array}
 */
export const ORDER_FIELD_CONTENTS = Object.freeze( [
    {
        title: "Filter by Order Status",
        type: FILTER_FORMS_COMPONENTS.CHECKBOX,
        props: {
            name: "orderStatus",
            options: ORDER_STATUS_OPTIONS,
        },
    },
    {
        title: "Filter by Payment Status",
        type: FILTER_FORMS_COMPONENTS.CHECKBOX,
        props: {
            name: "paymentStatus",
            options: PAYMENT_STATUS_OPTIONS,
        },
    },
    {
        title: "Filter by Date",
        type: FILTER_FORMS_COMPONENTS.INPUT,
        props: {
            name: "date",
            options: [
                { name: "startDate", label: "Start Date", type: "date" },
                { name: "endDate", label: "End Date", type: "date" },
            ],
        },
    },
    {
        title: "Filter by Price",
        type: FILTER_FORMS_COMPONENTS.INPUT,
        props: {
            name: "price",
            options: [
                { name: "minPrice", label: "Minimum Price", type: "number" }, 
                { name: "maxPrice", label: "Maximum Price", type: "number" }, 
            ],
        },
    },
] );

// =============================================================================
// MODAL & NOTIFICATION CONSTANTS
// =============================================================================

/**
 * Modal ID for order invoice
 * @constant {string}
 */
export const ORDER_INVOICE_MODAL_ID = "orderInvoiceModal";

/**
 * SweetAlert configuration for order cancellation
 * @constant {Object}
 */
export const ORDER_CANCEL_SWAL = Object.freeze( {
    title: "Are you sure you want to cancel?",
    text: "Once cancelled, you won't be able to revert this action.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#b10202",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it!",
    cancelButtonText: "No, keep it",
} );

// =============================================================================
// USER-SPECIFIC CONSTANTS
// =============================================================================

/**
 * Default values for user order filter forms
 * @constant {Object}
 */
export const USER_ORDER_FILTER_FORMS_DEFAULT_VALUES = Object.freeze( {
    orderStatus: ORDER_STATUSES.PROCESSING,
} );

/**
 * Field configurations for user order filters
 * @constant {Array}
 */
export const USER_ORDER_FIELD_CONTENTS = Object.freeze( [
    {
        title: "Filter by Order Status",
        type: FILTER_FORMS_COMPONENTS.RADIO,
        props: {
            name: "orderStatus",
            options: ORDER_STATUS_OPTIONS,
        },
    },
] );

// =============================================================================
// VALIDATION & HELPER FUNCTIONS
// =============================================================================

/**
 * Validates if a status is a valid order status
 * @param {string} status - Status to validate
 * @returns {boolean} True if valid
 */
export const isValidOrderStatus = ( status ) => {
    return Object.values( ORDER_STATUSES ).includes( status );
};

/**
 * Gets order status step by ID
 * @param {string} statusId - Status ID to find
 * @returns {Object|undefined} Status step object
 */
export const getOrderStatusStep = ( statusId ) => {
    return ORDER_STATUS_STEPS.find( step => step.id === statusId );
};

/**
 * Gets the next order status in the workflow
 * @param {string} currentStatus - Current order status
 * @returns {string|null} Next status or null if at end
 */
export const getNextOrderStatus = ( currentStatus ) => {
    const statusFlow = [
        ORDER_STATUSES.ORDERED,
        ORDER_STATUSES.PROCESSING,
        ORDER_STATUSES.SHIPPED,
        ORDER_STATUSES.DELIVERED,
    ];

    const currentIndex = statusFlow.indexOf( currentStatus );
    return currentIndex !== -1 && currentIndex < statusFlow.length - 1
        ? statusFlow[ currentIndex + 1 ]
        : null;
};