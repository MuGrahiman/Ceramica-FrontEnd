import React from "react";

const Loading = () => {
	return (
		<center>
			{/* <div className="flex justify-center items-center h-screen"> */}
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-300 border-solid"></div>
			{/* </div> */}
		</center>
	);
};

export default Loading;
