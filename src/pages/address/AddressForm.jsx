import React from "react";
import InputField from "../../components/InputField";
import useAddress from "../../hooks/useAddress";
import { ADDRESS_FORM_FIELDS, ADDRESS_VALIDATION_RULES } from "../../constants/address";

const AddressForm = () => {
	const { handleSubmit, register, errors } = useAddress();

	return (
		<div className="w-full md:w-1/2 lg:w-2/3 bg-white p-6">
			<h2 className="text-xl font-semibold mb-6">User Details</h2>

			<form
				onSubmit={handleSubmit}
				className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
				<div className="lg:col-span-3">
					<div className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-6 md:grid-cols-1 lg:grid-cols-6">
						{ADDRESS_FORM_FIELDS.map(
							({ NAME, LABEL, TYPE, PLACEHOLDER, DISABLED }, index) => (
								<div
									key={index}
									className={`col-span-1 md:col-span-1 ${
										["country", "state", "zipCode"].includes(NAME)
											? "sm:col-span-2 lg:col-span-2"
											: "sm:col-span-3 lg:col-span-3"
									}`}>
									<InputField
										NAME={NAME}
										LABEL={LABEL}
										TYPE={TYPE}
										PLACEHOLDER={PLACEHOLDER}
										VALIDATION_RULES={ADDRESS_VALIDATION_RULES}
										ERRORS={errors}
										REGISTER={register}
										DISABLED={DISABLED}
									/>
								</div>
							)
						)}

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

						<div className="col-span-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 my-8 justify-between">
							<button
								type="button"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Edit
							</button>
							<button
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

export default AddressForm;
