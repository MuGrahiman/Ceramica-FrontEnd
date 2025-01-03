import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a default state object for the specified fields.
 *
 * @param {Array<string>} fields - An array of field names to initialize.
 * @param {any} defaultValue - The value to assign to each field (default: false).
 * @returns {Object} - An object representing the initialized state.
 */
export const createDefaultState = (fields, defaultValue = false) => {
    return fields.reduce((acc, field) => ({
        ...acc,
        [field]: defaultValue,
    }), {});
};

/**
 * Returns the unique identifier for a given item.
 *
 * @param {any} id - The identifier for the item.
 * @returns {any} - The input identifier.
 */
export const KeyFn = (data) => data._id;

/**
 * Iterates over options and renders them using the provided render function.
 *
 * @param {Array<any>} options - An array of options to iterate over.
 * @param {Function} render - A function to render each option.
 * @returns {JSX.Element|string} - The rendered options or a message if none are available.
 */
export const handleIteration = (options, render) => {
    return options.length > 0 ? options.map(render) : 'No options available.';
};

/**
 * Generates a unique identifier.
 *
 * @returns {string} - A UUID.
 */
export const generateId = () => uuidv4();
