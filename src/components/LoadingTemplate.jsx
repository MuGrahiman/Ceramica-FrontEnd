import React from "react";

/**
 * A visual loading spinner .
 */
const LoadingTemplate = () => {
	return (
		<center>
			<div className="shadow-2xl border border-amber-50 bg-amber-100 w-60 h-60 rounded-full mx-auto my-40 flex animate-spin">
				<div className="shadow-inner border-2 border-amber-50 bg-amber-100 w-36 h-36 rounded-full m-auto"></div>
			</div>
		</center>
	);
};

export default LoadingTemplate;
