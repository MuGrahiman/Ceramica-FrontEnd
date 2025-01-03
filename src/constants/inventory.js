// Constants for inventory form

/**
 * Available categories for inventory items.
 * @type {Array<{ value: string, label: string }>}
 */
export const CATEGORY_OPTIONS = [
    { value: "cups", label: "Cups" },
    { value: "kettle", label: "Kettle" },
    { value: "plates", label: "Plates" },
    { value: "bowls", label: "Bowls" },
    { value: "jars", label: "Jars" },
    { value: "jugs", label: "Jugs" },
    { value: "mugs", label: "Mugs" },
    { value: "saucer", label: "Saucer" },
    { value: "decorates", label: "Decorates" },
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
    { value: 'true', label: "Activate" },
    { value: 'false', label: "Deactivate" },
];
