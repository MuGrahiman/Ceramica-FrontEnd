import { toPascalCase } from "../utils/generals";

// Constants for inventory form
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

export const INVENTORY_URL = "/dashboard/inventory"
export const INVENTORY_BREAD_CRUMB_ITEMS = ( Title ) => [
    { label: "Inventory", to: INVENTORY_URL },
    { label: Title },
]