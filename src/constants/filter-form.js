// Constants for filter form

/**
 * Available categories for filtering products.
 * @type {Array<string>}
 */
export const FILTER_FORMS_CATEGORIES_OPTIONS = [
    "cups",
    "kettle",
    "plates",
    "bowls",
    "jars",
    "jugs",
    "mugs",
    "saucer",
    "decorates",
];

/**
 * Available size options for filtering products.
 * @type {Array<string>}
 */
export const FILTER_FORMS_SIZES_OPTIONS = [
    "x-Small",
    "small",
    "medium",
    "large",
    "x-Large",
];

/**
 * Sorting options for product listings.
 * @type {Array<{ value: string, label: string }>}
 */
export const FILTER_FORMS_SORT_OPTIONS = [
    { value: "newest", label: "Newest Product" },
    { value: "oldest", label: "Oldest Product" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "price_asc", label: "Price: Low to High" },
];

/**
 * Default filter values for the form.
 * @type {Object}
 */
export const FILTER_FORMS_DEFAULT_VALUES = {
    categories: [],
    sizes: [],
    sort: "",
    minPrice: "",
    maxPrice: "",
};
/**
 *  Filter component.
 * @type {Object}
 */
export const FILTER_FORMS_COMPONENTS = {
    INPUT: "input",
    RADIO: "radio",
    CHECKBOX: "checkbox",
};

