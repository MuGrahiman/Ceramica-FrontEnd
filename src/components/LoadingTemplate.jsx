import React from "react";

const LoadingTemplate = () => {
	return (
		<center>
			<div className="shadow-2xl border border-amber-50 bg-amber-100 w-60 h-60 rounded-full mx-auto my-40 flex animate-spin">
				<div className="shadow-inner border-2 border-amber-50   bg-amber-100 w-36 h-36 rounded-full m-auto  "></div>
			</div>
			{/* <div className="flex justify-center items-center h-screen"> */}
			{/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-950 border-solid"></div> */}
			{/* </div> */}
		</center>
	);
};

export default LoadingTemplate;
