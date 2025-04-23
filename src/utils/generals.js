import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a default state object for the specified fields with different default values.
 *
 * @param {Array<string>} fields - An array of field names to initialize.
 * @param {Object} fieldDefaults - An object specifying default values for specific fields.
 * @param {any} defaultValue - The default value for unspecified fields (default: '').
 * @returns {Object} - An object representing the initialized state.
 */
export const createDefaultState = ( fields = [], defaultValue = null, fieldDefaults = {} ) => {
    return fields.reduce(
        ( acc, field ) => ( {
            ...acc,
            [ field ]: fieldDefaults[ field ] !== undefined ? fieldDefaults[ field ] : defaultValue,
        } ),
        {}
    );
};

/**
 * Returns the unique identifier for a given item.
 *
 * @param {any} id - The identifier for the item.
 * @returns {any} - The input identifier.
 */
export const KeyFn = ( data ) => data._id;

/**
 * Iterates over options and renders them using the provided render function.
 *
 * @param {Array<any>} options - An array of options to iterate over.
 * @param {Function} render - A function that takes an option and returns a rendered element.
 * @returns {Array<JSX.Element>} - An array of rendered options or an empty array if no options are available.
 */
export const handleIteration = ( options, render ) => {
    return options && options.length > 0 ? options.map( render ) : [];
};

/**
 * Generates a unique identifier.
 *
 * @returns {string} - A UUID.
 */
export const generateId = () => uuidv4();

/**
 * Trims a string to a specified length.
 *
 * @param {string} TEXT - The string to be trimmed.
 * @param {number} [LEN=10] - The maximum length of the trimmed string (default is 10).
 * @returns {string} - The trimmed string.
 */
export const stringTrimmer = ( TEXT, LEN = 10 ) => TEXT?.substring( 0, LEN );

/**
 * Converts a string to uppercase.
 * 
 * This function takes a string as input and returns a new string with all characters converted to uppercase.
 * It throws an error if the input is not a string.
 * 
 * @param {string} value - The string to be converted to uppercase.
 * @returns {string} - The input string converted to uppercase.
 * @throws {TypeError} - If the input is not a string.
 */
export const formatToUpperCase = (value) => {
    if (typeof value !== 'string') {
      throw new TypeError('Input must be a string');
    }
    return value.toUpperCase();
  };
  
  /**
   * Converts a string to lowercase.
   * 
   * This function takes a string as input and returns a new string with all characters converted to lowercase.
   * It throws an error if the input is not a string.
   * 
   * @param {string} value - The string to be converted to lowercase.
   * @returns {string} - The input string converted to lowercase.
   * @throws {TypeError} - If the input is not a string.
   */
  export const formatToLowerCase = (value) => {
    if (typeof value !== 'string') {
      throw new TypeError('Input must be a string');
    }
    return value.toLowerCase();
  };