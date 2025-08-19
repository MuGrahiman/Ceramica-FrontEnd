import { toPascalCase } from "../utils/generals";
import {
    FILTER_FORMS_CATEGORIES_OPTIONS,
    FILTER_FORMS_COMPONENTS,
    FILTER_FORMS_SIZES_OPTIONS,
    FILTER_FORMS_SORT_OPTIONS
} from "./filter-form";

/**
 * Available categories for inventory items.
 * @type {Object}
 */
export const CATEGORIES = {
    CUPS: "cups",
    KETTLE: "kettle",
    PLATES: "plates",
    BOWLS: "bowls",
    JARS: "jars",
    JUGS: "jugs",
    MUGS: "mugs",
    SAUCER: "saucer",
    DECORATES: "decorates",
};

/**
 * Available categories for inventory items.
 * @type {Array<{ value: string, label: string }>}
 */
export const CATEGORY_OPTIONS = [
    { value: CATEGORIES.CUPS, label: toPascalCase( CATEGORIES.CUPS ) },
    { value: CATEGORIES.KETTLE, label: toPascalCase( CATEGORIES.KETTLE ) },
    { value: CATEGORIES.PLATES, label: toPascalCase( CATEGORIES.PLATES ) },
    { value: CATEGORIES.BOWLS, label: toPascalCase( CATEGORIES.BOWLS ) },
    { value: CATEGORIES.JARS, label: toPascalCase( CATEGORIES.JARS ) },
    { value: CATEGORIES.JUGS, label: toPascalCase( CATEGORIES.JUGS ) },
    { value: CATEGORIES.MUGS, label: toPascalCase( CATEGORIES.MUGS ) },
    { value: CATEGORIES.SAUCER, label: toPascalCase( CATEGORIES.SAUCER ) },
    { value: CATEGORIES.DECORATES, label: toPascalCase( CATEGORIES.DECORATES ) },
];

/**
 * Available size options for inventory items.
 * @type {Array<{ value: string, label: string }>}
 */
export const SIZE_OPTIONS = [
    { value: "x-small", label: "X-Small (5-6 inches)" },
    { value: "small", label: "Small (6-8 inches)" },
    { value: "medium", label: "Medium (9-11 inches)" },
    { value: "large", label: "Large (12-14 inches)" },
    { value: "x-large", label: "X-Large (15+ inches)" },
];

/**
 * Status options for inventory items.
 * @type {Array<{ value: boolean, label: string }>}
 */
export const STATUS_OPTIONS = [
    { value: 'active', label: "Active" },
    { value: 'inActive', label: "In Active" },
];

/**
 * URL path for inventory dashboard page.
 * @type {string}
 */
export const INVENTORY_URL = "/dashboard/inventory"

/**
 * Generates breadcrumb items for inventory navigation.
 * @param {string} Title - Current page title
 * @returns {Array<{ label: string, to?: string }>} Breadcrumb items array
 */
export const INVENTORY_BREAD_CRUMB_ITEMS = ( Title ) => [
    { label: "Inventory", to: INVENTORY_URL },
    { label: Title },
]

/**
 * Filter form configuration for inventory page.
 * @type {Array<Object>}
 */
export const INVENTORY_FILTER_CONTENTS = [
    {
        title: "Filter by Category",
        type: FILTER_FORMS_COMPONENTS.CHECKBOX,
        props: { name: "categories", options: FILTER_FORMS_CATEGORIES_OPTIONS },
    },
    {
        title: "Filter by Size",
        type: FILTER_FORMS_COMPONENTS.CHECKBOX,
        props: { name: "sizes", options: FILTER_FORMS_SIZES_OPTIONS },
    },
    {
        title: "Sort By",
        type: FILTER_FORMS_COMPONENTS.RADIO,
        props: { name: "sort", options: FILTER_FORMS_SORT_OPTIONS },
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