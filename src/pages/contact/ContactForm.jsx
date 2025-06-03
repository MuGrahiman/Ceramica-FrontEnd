import React, { useEffect } from "react";
import PropTypes from "prop-types";
import MiniLoader from "../../components/MiniLoader";
import { useSearchParams } from "react-router-dom";
import { createDefaultState } from "../../utils/generals";
import {
	CONTACT_SUBJECTS,
	CONTACT_FORM_FIELDS,
	CONTACT_FORM_FIELDS_OPTIONS,
	CONTACT_FORM_VALIDATION_RULES,
} from "../../constants/contacts";
import ListOptions from "../../components/ListOptions";
import InputField from "../../components/InputField";
import { useForm } from "react-hook-form";
import SelectField from "../../components/SelectField";
import TextArea from "../../components/TextArea";

/**
 * ContactForm Component
 * - Handles form state and validation
 * - Manages submission to backend
 */
const ContactForm = ({ onFormSubmit, isLoading = false }) => {
	const [searchParams] = useSearchParams();
	// Form state
	const defaultFormFields = createDefaultState(
		Object.values(CONTACT_FORM_FIELDS),
		"",
		{
			[CONTACT_FORM_FIELDS.SUBJECT]: CONTACT_SUBJECTS.GENERAL_INQUIRY,
		}
	);

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		setValue,
		watch,
	} = useForm({ defaultValues: defaultFormFields });

	useEffect(() => {
		const subjectParam = searchParams.get("subject");

		if (
			subjectParam &&
			Object.values(CONTACT_SUBJECTS).includes(subjectParam)
		) {
			setValue(CONTACT_FORM_FIELDS.SUBJECT, subjectParam);

			// Scroll to form
			const form = document.getElementById("contact-form");
			if (form) {
				form.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [searchParams]);

	return isLoading ? (
		<div className="min-h-full min-w-full flex justify-center items-center">
			<MiniLoader />
		</div>
	) : (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Send us a message
			</h2>

			<form onSubmit={handleSubmit(onFormSubmit)} noValidate>
				<ListOptions
					OPTIONS={CONTACT_FORM_FIELDS_OPTIONS}
					RENDER_ITEM={(item) =>
						item.NAME === CONTACT_FORM_FIELDS.SUBJECT ? (
							<SelectField
								{...item}
								VALIDATION_RULES={CONTACT_FORM_VALIDATION_RULES}
								ERRORS={errors}
								REGISTER={register}
							/>
						) : item.NAME === CONTACT_FORM_FIELDS.MESSAGE ? (
							<TextArea
								{...item}
								VALIDATION_RULES={CONTACT_FORM_VALIDATION_RULES}
								ERRORS={errors}
								REGISTER={register}
							/>
						) : item.NAME === CONTACT_FORM_FIELDS.ORDER_ID ? (
							(watch(CONTACT_FORM_FIELDS.SUBJECT) ===
								CONTACT_SUBJECTS.ORDER_SUPPORT ||
								watch(CONTACT_FORM_FIELDS.SUBJECT) ===
									CONTACT_SUBJECTS.RETURN_AND_REFUND) && (
								<InputField
									{...item}
									VALIDATION_RULES={CONTACT_FORM_VALIDATION_RULES}
									ERRORS={errors}
									REGISTER={register}
								/>
							)
						) : (
							<InputField
								{...item}
								VALIDATION_RULES={CONTACT_FORM_VALIDATION_RULES}
								ERRORS={errors}
								REGISTER={register}
							/>
						)
					}
				/>

				<button
					disabled={isSubmitting}
					type="submit"
					className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
					Send Message
				</button>
			</form>
		</div>
	);
};
ContactForm.propTypes = {
	onFormSubmit: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};
export default ContactForm;
