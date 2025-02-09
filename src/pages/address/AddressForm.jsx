import React from "react";
import PropTypes from "prop-types";
import InputField from "../../components/InputField";
import {
	ADDRESS_FORM_FIELDS,
	ADDRESS_VALIDATION_RULES,
} from "../../constants/address";
import ListOptions from "../../components/ListOptions";

const AddressForm = ({
	HANDLE_SUBMIT,
	EDIT_ADDRESS,
	register,
	ERRORS,
	RESET,
	ADDRESS_ID,
	IS_LOADING,
}) => {
	return (
		<div className="w-full md:w-1/2 lg:w-2/3 bg-white p-6">
			<h2 className="text-xl font-semibold mb-6">User Details</h2>

			{/* Address Form  */}
			<form
				key={ADDRESS_ID}
				onSubmit={HANDLE_SUBMIT}
				className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
				<div className="lg:col-span-3">
					<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-6 md:grid-cols-1 lg:grid-cols-6">
						<ListOptions
							OPTIONS={ADDRESS_FORM_FIELDS}
							RENDER_ITEM={(item, index) => (
								<div
									key={index}
									className={`col-span-1 md:col-span-1 ${
										["country", "state", "zipCode"].includes(item.NAME)
											? "sm:col-span-2 lg:col-span-2"
											: "sm:col-span-3 lg:col-span-3"
									}`}>
									<InputField
										{...item}
										VALIDATION_RULES={ADDRESS_VALIDATION_RULES}
										ERRORS={ERRORS}
										REGISTER={register}
									/>
								</div>
							)}
						/>

						<div className="col-span-full mt-3">
							<div className="inline-flex items-center">
								<input
									type="checkbox"
									id="isDefault"
									className="form-checkbox"
									{...register("isDefault")}
								/>
								<label htmlFor="isDefault" className="ml-2">
									Set as default
								</label>
							</div>
						</div>

						<div className="col-span-full grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 my-8 justify-between">
							<button
								disabled={IS_LOADING}
								onClick={RESET}
								type="button"
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
								reset
							</button>
							<button
								disabled={IS_LOADING}
								onClick={EDIT_ADDRESS}
								type="button"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Edit
							</button>
							<button
								disabled={IS_LOADING}
								type="submit"
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
								Add
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

AddressForm.propTypes = {
	HANDLE_SUBMIT: PropTypes.func.isRequired,
	EDIT_ADDRESS: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	ERRORS: PropTypes.object.isRequired,
	RESET: PropTypes.func.isRequired,
	ADDRESS_ID: PropTypes.string,
	IS_LOADING: PropTypes.bool,
};

export default AddressForm;
