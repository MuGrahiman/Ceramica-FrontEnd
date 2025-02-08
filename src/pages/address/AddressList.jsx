import React from "react";
import useAddress from "../../hooks/useAddress";
import ListOptions from "../../components/ListOptions";
import AddressCard from "./AddressCard";
import Loading from "../../components/Loading";

const AddressList = () => {
	const {
		addressList,
		isFetching,
	} = useAddress();

	return (
		<div className="w-full  md:w-1/2 lg:w-1/3 bg-white p-6   ">
			<h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
			<div className="max-h-[85%] flex md:flex-col gap-4 items-center justify-between overflow-x-auto md:overflow-y-scroll">
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
									FIRST_NAME={option.firstName}
									LAST_NAME={option.lastName}
									PHONE_NUMBER={option.phoneNumber}
									STREET={option.street}
									CITY={option.city}
									STATE={option.state}
									COUNTRY={option.country}
									ZIP_CODE={option.zipCode}
									IS_DEFAULT={option.isDefault}
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
