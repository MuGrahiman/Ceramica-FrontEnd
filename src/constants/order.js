import { TbBasketCancel, TbClipboardCheck, TbPackage, TbShoppingBag, TbTruckDelivery } from "react-icons/tb";
import { FILTER_FORMS_COMPONENTS } from "./filter-form";

export const ORDER_URL = "/dashboard/orders"

export const ORDER_BREAD_CRUMB_ITEMS = ( Title ) => [
    { label: "Order", to: ORDER_URL },
    { label: Title },
]

export const ORDER_STATUSES = {
    ORDERED: "ordered",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
};

export const ORDER_STATUS_COLOR_VARIANTS = {
    red: "border-red-500 bg-red-200 text-red-500",
    orange: "border-orange-500 bg-orange-200 text-orange-500",
    yellow: "border-yellow-500 bg-yellow-200 text-yellow-500",
    lime: "border-lime-500 bg-lime-200 text-lime-500",
    green: "border-green-500 bg-green-200 text-green-500",
    gray: "border-gray-500 bg-gray-200 text-gray-500"
};

export const ORDER_STATUS_STEPS = [
    {
        id: ORDER_STATUSES.ORDERED,
        label: "Ordered",
        description: "Your order has been placed and is being processing.",
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
        description: "Your order has been cancelled .",
        color: ORDER_STATUS_COLOR_VARIANTS.red,
        icon: TbBasketCancel,
    },
];

export const ORDER_FIELD_CONTENTS = [
    {
        title: "Filter by Order Status",
        type: FILTER_FORMS_COMPONENTS.CHECKBOX,
        props: {
            name: "orderStatus",
            options: [ "processing", "shipped", "delivered", "cancelled" ],
        },
    },
    {
        title: "Filter by Payment Status",
        type: FILTER_FORMS_COMPONENTS.CHECKBOX,
        props: {
            name: "paymentStatus",
            options: [
                "Created",
                "Saved",
                "Approved",
                "Voided",
                "Completed",
                "PayerActionRequired",
            ],
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
                { name: "minPrice", label: "Minimum Price", type: "numbers" },
                { name: "maxPrice", label: "Maximum Price", type: "numbers" },
            ],
        },
    },
];

export const ORDER_FILTER_FORMS_DEFAULT_VALUES = {
    paymentStatus: [],
    StartDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
};

