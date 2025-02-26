import React from "react";
import PropTypes from "prop-types";
import ListOptions from "../../components/ListOptions";
import AddressCard from "./AddressCard";
import Skeleton from "../../components/Skeleton";

const AddressList = ({
	ADDRESS_LIST,
	IS_LOADING,
	ON_SELECTION,
	ADDRESS_ID,
}) => {
	return (
		<div className="w-full  md:w-1/2 lg:w-1/3 bg-white p-6   ">
			<h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
			{/* Address list container */}
			{IS_LOADING ? (
					<Skeleton />
				) : (
			<div className="max-h-[85%] flex md:flex-col gap-4 items-center justify-between overflow-x-auto md:overflow-y-scroll">
				{/* Show loading indicator while fetching addresses */}
				
					<ListOptions
						OPTIONS={ADDRESS_LIST}
						EMPTY_MESSAGE="No Address Found"
						RENDER_ITEM={(option) => {
							return (
								<AddressCard
									key={option._id}
									ADDRESS_ID={ADDRESS_ID}
									ITEMS={option}
									ON_SELECTION={ON_SELECTION}
								/>
							);
						}}
					/>
			</div>
				)}
		</div>
	);
};

// Define PropTypes for better type checking
AddressList.propTypes = {
	ADDRESS_LIST: PropTypes.array.isRequired,
	IS_LOADING: PropTypes.bool.isRequired,
	ON_SELECTION: PropTypes.func.isRequired,
	ADDRESS_ID: PropTypes.string,
};

export default AddressList;
