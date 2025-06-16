import TextArea from "../../components/TextArea";
import { useForm } from "react-hook-form";
import StarRatingField from "../../components/StarRatingField";
import useToast from "../../hooks/useToast";
import { REVIEW_FORM_ACTIONS } from "../../constants/product";
import PropTypes from "prop-types";

/**
 * Form for submitting or editing product reviews with validation.
 *
 * @param {Object} props
 * @param {function} props.onSubmit - Callback when form is submitted
 * @param {function} [props.onCancel] - Callback when cancel is clicked
 * @param {Object} [props.defaultFormValues] - Initial values for edit mode
 * @param {number} props.defaultFormValues.rating - Initial star rating (0-5)
 * @param {string} props.defaultFormValues.review - Initial review text
 */
const ReviewFormTab = ({
	onSubmit = () => {},
	onCancel = () => {},
	defaultFormValues = { rating: 0, review: "" },
}) => {
	const showToast = useToast();
	const {
		handleSubmit,
		register,
		formState: { errors, isDirty, isSubmitting, isValid },
		control,
	} = useForm({
		defaultValues: defaultFormValues,
	});

	// Determine if editing existing review
	const initialData = Object.values(defaultFormValues).some((value) => !!value);

	/**
	 * Handles form submission with validation
	 * @param {Object} formData - {rating: number, review: string}
	 */
	const atSubmit = async (formData) => {
		if (!isDirty || !isValid) {
			return showToast("Please Make Changes", "warning");
		}
		await onSubmit(
			formData,
			initialData
				? REVIEW_FORM_ACTIONS.EDIT_REVIEW
				: REVIEW_FORM_ACTIONS.ADD_REVIEW
		);
	};

	return (
		<div
			className="bg-white p-6 rounded-lg border border-gray-200 animate-slideUp"
			aria-live="polite">
			<h3
				className={`text-xl font-semibold text-gray-700 dark:text-gray-600 mb-4`}>
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
					NAME={"review"}
					PLACEHOLDER={"Share your honest thoughts about this product..."}
					ERRORS={errors}
					REGISTER={register}
					VALIDATION_RULES={{
						review: {
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
						className="px-6 py-2 rounded-md font-medium bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white hover:border-white transition-colors"
						aria-label="Cancel review editing">
						Cancel
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className={`px-6 py-2 rounded-md font-medium ${
							isSubmitting
								? "bg-gray-400 cursor-not-allowed text-white"
								: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white hover:border-white transition-colors"
						}`}
						aria-disabled={isSubmitting}
						aria-busy={isSubmitting}>
						{initialData ? "Update Review" : "Submit Review"}
					</button>
				</div>
			</form>
		</div>
	);
};

ReviewFormTab.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func,
	defaultFormValues: PropTypes.shape({
		rating: PropTypes.number,
		review: PropTypes.string,
	}),
};

export default ReviewFormTab;
