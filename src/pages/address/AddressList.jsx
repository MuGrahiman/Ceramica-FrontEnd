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
	ON_DELETE,
	EDIT_MODE = false,
}) => {
	return IS_LOADING ? (
		<Skeleton />
	) : (
		<div className="p-3 flex md:flex-col gap-4 items-center justify-between overflow-x-auto md:overflow-y-auto max-h-[calc(100vh-250px)]">
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
							ON_DELETE={ON_DELETE}
							EDIT_MODE={EDIT_MODE}
						/>
					);
				}}
			/>
		</div>
	);
};

AddressList.propTypes = {
	ADDRESS_LIST: PropTypes.array.isRequired,
	IS_LOADING: PropTypes.bool.isRequired,
	EDIT_MODE: PropTypes.bool.isRequired,
	ON_SELECTION: PropTypes.func.isRequired,
	ON_DELETE: PropTypes.func.isRequired,
	ADDRESS_ID: PropTypes.string,
};

export default AddressList;
