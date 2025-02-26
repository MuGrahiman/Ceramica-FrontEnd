import React from "react";
import { ImSpinner9 } from "react-icons/im";

const MiniLoader = () => {
	return (
		<ImSpinner9 className="w-6 h-6 rotate animate-spin text-gray-700 dark:text-gray-600" />
	);
};

export default MiniLoader;
