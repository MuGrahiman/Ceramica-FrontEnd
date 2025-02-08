import React from "react";
import useAddress from "../../hooks/useAddress";
import ListOptions from "../../components/ListOptions";
import AddressCard from "./AddressCard";
import Loading from "../../components/Loading";

const AddressList = () => {
	const {
		addressList,
		handleSubmit,
		reset,
		register,
		errors,
		isLoading,
		isFetching,
	} = useAddress();

	return (
		<div className="w-full  md:w-1/2 lg:w-1/3 bg-white p-6   ">
			<h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
			<div className=" flex md:flex-col gap-4 items-center justify-between overflow-x-auto md:overflow-y-auto">
				{isFetching ? (
					<Loading />
				) : (
					<ListOptions
						OPTIONS={addressList}
						EMPTY_MESSAGE="No Address Found"
						RENDER_ITEM={(option) => {
							return (
								<AddressCard
									key={option._id}
									firstName={option.firstName}
									lastName={option.lastName}
									phoneNumber={option.phoneNumber}
									street={option.street}
									town={option.town}
									state={option.state}
									country={option.country}
									zipCode={option.zipCode}
								/>
							);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default AddressList;
