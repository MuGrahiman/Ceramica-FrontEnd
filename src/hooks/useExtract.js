import { useState } from "react";

const useExtract = () => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

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
			throw err; // Rethrow error to be handled outside
		} finally {
			setLoading(false);
		}
	};

	return { extractData, data, error, loading }; 
};

export default useExtract;
