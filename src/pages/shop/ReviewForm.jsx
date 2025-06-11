import { useState } from "react";
import TextArea from "../../components/TextArea";
import { Controller, useForm } from "react-hook-form";
import StarRating from "../../components/StarRating";
import StarRatingField from "../../components/StarRatingField";
import useToast from "../../hooks/useToast";
import { REVIEW_FORM_ACTIONS } from "../../constants/product";

/**
 * ReviewForm Component - Form for submitting or editing a review
 *
 * @param {Object} props
 * @param {function} props.onSubmit - Callback when form is submitted
 * @param {Object} [props.defaultFormValues] - Initial form data for editing
 * @param {function} [props.onCancel] - Callback when cancel is clicked
 */
const ReviewForm = ({
	onSubmit,
	onCancel,
	defaultFormValues = { rating: 0, comment: "" },
}) => {
	const showToast = useToast();
	const {
		handleSubmit,
		register,
		trigger,
		formState: { errors, isDirty, isSubmitting, isValid },
		reset,
		setValue,
		control,
		watch,
		clearErrors,
	} = useForm({
		defaultValues: defaultFormValues,
	});
		console.log("🚀 ~ defaultFormValues:", defaultFormValues)
	const initialData = Object.values(defaultFormValues).some((value) => !!value);

	const atSubmit = async (formData) => {
		if (!isDirty || !isValid) return showToast("Please Make Changes", "error");
		await onSubmit(
			formData,
			initialData
				? REVIEW_FORM_ACTIONS.EDIT_REVIEW
				: REVIEW_FORM_ACTIONS.ADD_REVIEW
		);
	};

	return (
		<div className="bg-white p-6 rounded-lg border border-gray-200 animate-slideUp">
			<h3
				className={`text-xl font-semibold text-gray-700 dark:text-gray-600  mb-4`}>
				{initialData ? "Update Your Review" : "Share Your Experience"}
			</h3>

			<form onSubmit={handleSubmit(atSubmit)}>
				<StarRatingField
					interactive
					control={control}
					label={initialData ? "Your Rating" : "Rate"}
					name="rating"
					errors={errors}
				/>
				<TextArea
					LABEL={initialData ? "Your comment" : "Comment"}
					NAME={"comment"}
					PLACEHOLDER={"Share your honest thoughts about this product..."}
					ERRORS={errors}
					REGISTER={register}
					VALIDATION_RULES={{
						comment: {
							required: "Comment is required.",
							minLength: {
								value: 100,
								message: "Comment must be at least 100 characters long.",
							},
						},
					}}
				/>

				<div className="flex gap-3">
					<button
						type="button"
						onClick={onCancel}
						className="px-6 py-2 rounded-md  font-medium bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white hover:border-white transition-colors">
						Cancel
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className={`px-6 py-2 rounded-md  font-medium ${
							isSubmitting
								? "bg-gray-400 cursor-not-allowed text-white"
								: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white hover:border-white transition-colors"
						}`}>
						{initialData ? "Update Review" : "Submit Review"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ReviewForm;
