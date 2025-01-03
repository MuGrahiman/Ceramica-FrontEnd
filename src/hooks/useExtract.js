import { useState } from "react";

/**
 * Custom hook to extract data asynchronously.
 *
 * @returns {Object} Object containing the extraction function and states.
 */
const useExtract = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    /**
     * Extracts data by invoking a provided function with given arguments.
     *
     * @param {Function} fn - The function to call for data extraction.
     * @param {...any} args - The arguments to pass to the function.
     * @returns {Promise<Object>} The extracted data.
     */
    const extractData = async (fn, ...args) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fn(...args).then((res) => res.user);
            const extractedData = {
                email: result.email || result.providerData?.[0]?.email,
                uid: result.uid,
            };

            setData(extractedData);
            return extractedData;
        } catch (err) {
            setError(err);
            console.error("Error in extracting data:", err);
            throw err; 
        } finally {
            setLoading(false);
        }
    };

    return { extractData, data, error, loading };
};

export default useExtract;
