import { v4 as uuidv4 } from 'uuid';
import { extractErrorMessage } from './errorHandlers';

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
export const formatToUpperCase = ( value ) => {
  if ( typeof value !== 'string' ) {
    throw new TypeError( 'Input must be a string' );
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
export const formatToLowerCase = ( value ) => {
  if ( typeof value !== 'string' ) {
    throw new TypeError( 'Input must be a string' );
  }
  return value.toLowerCase();
};

/**
 * Formats a number as currency string
 * @param {number} amount - The amount to format
 * @param {string} [currency='USD'] - ISO 4217 currency code
 * @param {string} [locale='en-US'] - BCP 47 language tag
 * @param {Object} [options] - Additional formatting options
 * @param {number} [options.minFractionDigits] - Minimum fraction digits
 * @param {number} [options.maxFractionDigits] - Maximum fraction digits
 * @returns {string} Formatted currency string
 * @throws {TypeError} If amount is not a finite number
 */
export const formatCurrency = (
  amount,
  currency = 'USD',
  locale = 'en-US',
  { minFractionDigits, maxFractionDigits } = {}
) => {
  if ( !amount ) return "N/A";

  if ( typeof amount !== 'number' || !Number.isFinite( amount ) ) {
    throw new TypeError( 'Amount must be a finite number' );
  }

  const formatterOptions = {
    style: 'currency',
    currency,
    ...( minFractionDigits !== undefined && { minimumFractionDigits: minFractionDigits } ),
    ...( maxFractionDigits !== undefined && { maximumFractionDigits: maxFractionDigits } ),
  };

  try {
    return new Intl.NumberFormat( locale, formatterOptions ).format( amount );
  } catch ( error ) {
    console.error( 'Currency formatting error:', error );
    // Fallback to basic USD formatting
    return new Intl.NumberFormat( 'en-US', {
      style: 'currency',
      currency: 'USD'
    } ).format( amount );
  }
};

export const isValidId = ( id ) => {
  return typeof id === 'string' && id.trim().length > 0;
};
/**
 * Converts a given string to Pascal Case.
 * Pascal Case capitalizes the first letter of each word and removes spaces.
 *
 * @param {string} input - The string to be converted to Pascal Case.
 * @returns {string} The converted Pascal Case string.
 * @throws {TypeError} Throws an error if the input is not a string.
 */
export const toPascalCase = ( input ) => {
  // Validate the input to ensure it's a string
  if ( typeof input !== 'string' ) {
    throw new TypeError( 'Input must be a string.' );
  }

  return input
    .trim()
    .split( /\s+/ )
    .map( word =>
      word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase()
    )
    .join( '' );
}

/**
 * Parses numeric values from strings while preserving suffixes
 * @param {string|number} value - Input value (e.g., "1.5M" or 1500000)
 * @returns {Object} { numeric: number, suffix: string }
 */
export const parseNumber = ( value ) => {
  if ( typeof value === "string" ) {
    const numeric = parseFloat( value.replace( /[^0-9.]/g, "" ) );
    const suffix = value.match( /[^\d]+$/ )?.[ 0 ] || "";
    return { numeric, suffix };
  }
  return { numeric: value, suffix: "" };
};


export const submitHandler = async (mutateFn, data, successMsg, errorMsg) => {
  await mutateFn(data, {
    onSuccess: () => successMsg,
    onError: (err) => extractErrorMessage(err, errorMsg),
  });
};
