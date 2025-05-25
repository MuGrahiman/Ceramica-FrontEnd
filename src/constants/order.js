import { TbBasketCancel, TbClipboardCheck, TbPackage,  TbShoppingBag, TbTruckDelivery } from "react-icons/tb";

export const ORDER_URL = "/dashboard/orders"

export const ORDER_BREAD_CRUMB_ITEMS = ( Title ) => [
    { label: "Order", to: ORDER_URL },
    { label: Title },
]

export const ORDER_STATUS = {
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
        id: ORDER_STATUS.ORDERED,
        label: "Ordered",
        description: "Your order has been placed and is being processing.",
        color: ORDER_STATUS_COLOR_VARIANTS.orange,
        icon: TbShoppingBag,
    },
    {
        id: ORDER_STATUS.PROCESSING,
        label: "Processing",
        description: "Your order is being prepared for shipment.",
        color: ORDER_STATUS_COLOR_VARIANTS.yellow,
        icon: TbPackage,
    },
    {
        id: ORDER_STATUS.SHIPPED,
        label: "Shipped",
        description: "Your order has been shipped and is on its way.",
        color: ORDER_STATUS_COLOR_VARIANTS.lime,
        icon: TbTruckDelivery,
    },
    {
        id: ORDER_STATUS.DELIVERED,
        label: "Delivered",
        description: "Your order has been delivered successfully.",
        color: ORDER_STATUS_COLOR_VARIANTS.green,
        icon: TbClipboardCheck,
    },
    {
        id: ORDER_STATUS.CANCELLED,
        label: "Cancelled",
        description: "Your order has been cancelled .",
        color: ORDER_STATUS_COLOR_VARIANTS.red,
        icon: TbBasketCancel,
    },
];
