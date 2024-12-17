import React, { useState } from "react";
import InputField from "../../components/InputField";
import BreadCrumb from "../../components/BreadCrumb";
import TextArea from "../../components/TextArea";
import SelectField from "../../components/SelectField";
import { useFieldArray, useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import useColorValidator from "../../hooks/useColorValidator";
import ImageUploader from "../../components/ImageUploader";
import { IoReloadOutline } from "react-icons/io5";
import useHandleFiles from "../../hooks/useHandleFiles";
import { removeFile } from "../../utils/cloudinary";
import { validateFile } from "../../utils/validateImage";

const InventoryForm = ({
	TITLE,
	BREAD_CRUMB_ITEMS,
	ON_SUBMIT,
	DEFAULT_VALUES,
}) => {
	const {
		handleSubmit,
		reset,
		control,
		setValue,
		setError,
		clearErrors,
		register,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm({
		defaultValues: {
			files: [],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "files",
	});

	const createDefaultState = (fields) =>
		Object.fromEntries(fields.map((f) => [f, false]));
	const defaultSuccessValue = createDefaultState([
		"title",
		"shape",
		"price",
		"color",
		"category",
		"image",
		"height",
		"length",
		"width",
	]);
	const [isSuccess, setIsSuccess] = useState(defaultSuccessValue);
	const [imageURL, setImageURL] = useState("");
	const [showColor, setShowColor] = useState(false);
	const { handleFileChange, handleFileRemove, fileLoading } = useHandleFiles();
	const {
		validateColor,
		color,
		colorLoading,
		colorError,
		colorSuccess,
		resetColor,
	} = useColorValidator();

	useEffect(() => {
		clearErrors("color");
		if (colorError) setError("color", { type: "custom", message: colorError });
		if (colorSuccess)
			setIsSuccess((prev) => ({
				...prev,
				color: !errors["color"] && colorSuccess,
			}));
	}, [colorError, colorSuccess]);

	useEffect(() => {
		if (fields.length > 2)
			setIsSuccess((prev) => ({
				...prev,
				images: !errors["images"],
			}));
		else
			setIsSuccess((prev) => ({
				...prev,
				images: false,
			}));
	}, [errors, fields]);

	const iterateFiles = (files) => {
		if (!files.length) return "Upload any files";
		let result;
		files.forEach((file) => {
			result = validateFile(file);
		});

		return result;
	};

	const validationRules = {
		// image validator rules
		image: {
			required: "Image is required.",
			accept: ".jpeg, .jpg, .png",
			validate: {
				isValue: (value) => value || (imageURL && true) || "Image is required.",
				isValidValue: (value) =>
					validateFile(value) ||
					"Only JPEG,JPG and PNG files are accepted.",
			},
			onChange: (e) =>
				handleFileChange({
					label: "image",
					files: e.target.files,
					clearErrors: () => clearErrors("image"),
					maxFiles: 5,
					currentFields: fields,
					onSuccess: () =>
						setIsSuccess((prev) => ({
							...prev,
							image: !errors["image"],
						})),
					onError: (error) =>
						setError("image", {
							type: "custom",
							message: error,
						}),
					appendData: (data) => setImageURL(data),
				}),
		},

		// title validator rules
		title: {
			required: "Title is required.",
			minLength: {
				value: 3,
				message: "Title must be at least 3 characters long.",
			},
			onChange: (e) => {
				const value = e.target.value;
				clearErrors("title");
				setIsSuccess((prev) => ({
					...prev,
					title: value && value.length >= 3 && !errors["title"],
				}));
			},
		},

		// category validator rules
		category: {
			required: "Category is required.",
			validate: (value) =>
				(value && value !== "select") || "Please select option",
			onChange: (e) => {
				const value = e.target.value;
				clearErrors("category");
				setIsSuccess((prev) => ({
					...prev,
					category: value && !errors["category"],
				}));
			},
		},

		// shape validator rules
		shape: {
			required: "Shape is required.",
			minLength: 3,
			onChange: (e) => {
				clearErrors("shape");
				const value = e.target.value;
				setIsSuccess((prev) => ({
					...prev,
					shape: value && value.length > 2 && !errors["shape"],
				}));
			},
		},

		// color validator rules
		color: {
			required: "Color is required.",
			validate: (value) => value === color || "Please Select the color",
			onChange: (e) => validateColor(e.target.value),
		},

		// dimension validator rules
		dimension: {
			required: "Dimension is required.",
			onChange: (e) => {
				clearErrors("dimension");
				const value = e.target.value;
				setIsSuccess((prev) => ({
					...prev,
					dimension: value && !errors["dimension"],
				}));
			},
		},

		// height validator rules
		height: {
			required: "Height is required.",
			valueAsNumber: true,
			onChange: (e) => {
				clearErrors("height");
				const value = e.target.value;
				setIsSuccess((prev) => ({
					...prev,
					height: value && !errors["height"],
				}));
			},
		},

		// size validator rules
		size: {
			required: "Size is required.",
			validate: (value) =>
				(value && value !== "select") || "Please select option",
			onChange: (e) => {
				clearErrors("size");
				const value = e.target.value;
				setIsSuccess((prev) => ({
					...prev,
					size: value && !errors["size"],
				}));
			},
		},

		// price validator rules
		price: {
			required: "Price is required.",
			valueAsNumber: true,
			onChange: (e) => {
				clearErrors("price");
				const value = e.target.value;
				setIsSuccess((prev) => ({
					...prev,
					price: value && !errors["price"],
				}));
			},
		},

		// description validator rules
		description: {
			required: "Description is required.",
			validate: (value) => {
				const isValidLength = value.trim().length >= 200;
				setIsSuccess((prev) => ({
					...prev,
					description: value && isValidLength && !errors["description"],
				}));

				if (!isValidLength) {
					setError("description", {
						type: "custom",
						message: "Description must be at least 200 characters long.",
					});
				} else {
					clearErrors("description");
				}
			},
			onChange: (e) => {
				clearErrors("description");

				const value = e.target.value;
				setIsSuccess((prev) => ({
					...prev,
					description:
						value && value.trim().length >= 200 && !errors["description"],
				}));
			},
		},

		// Image validation rules
		images: {
			validate: (files) => iterateFiles(files),
			// onChange: handleImagesChange,
			onChange: (e) =>
				handleFileChange({
					label: "images",
					files: e.target.files,
					clearErrors: () => clearErrors("images"),
					maxFiles: 5,
					currentFields: fields,
					onSuccess: () =>
						setIsSuccess((prev) => ({
							...prev,
							images: !errors["images"],
						})),
					onError: (error) =>
						setError("images", {
							type: "custom",
							message: error,
						}),
					appendData: (data) => append(data),
				}),
		},
	};

	// Form resetting Function
	const resetForm = async () => {
		await Promise.all(
			[
				...(fields.length
					? fields.map((field) => removeFile(field.public_id))
					: []),
				imageURL ? removeFile(imageURL.public_id) : null,
			].filter(Boolean)
		);

		reset();
		setIsSuccess(defaultSuccessValue);
		setImageURL(null);
		remove();
		resetColor();
		setShowColor(false);
	};

	const handleForm = (data) => {
		// Define validation messages
		const validationMessages = {
			required: "Images are required.",
			min: "Minimum 3 images needed.",
			max: "Maximum 5 images allowed.",
		};

		// Clear previous errors
		clearErrors("images");

		// Perform validation checks
		if (fields.length === 0) {
			return setError("images", {
				type: "custom",
				message: validationMessages.required,
			});
		}

		if (fields.length < 3) {
			return setError("images", {
				type: "custom",
				message: validationMessages.min,
			});
		}

		if (fields.length > 5) {
			return setError("images", {
				type: "custom",
				message: validationMessages.max,
			});
		}
		ON_SUBMIT(data);
	};

	return (
		<section className=" w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
			<BreadCrumb items={BREAD_CRUMB_ITEMS} />
			<div className="max-w-lg mt-12  mx-auto md:p-6 p-3 bg-gray-300 rounded-lg shadow-lg">
				<h2 className="text-2xl text-center font-extrabold font-serif text-gray-700 mb-8">
					{TITLE}
				</h2>
				<form
					className="max-w-sm mx-auto"
					onSubmit={handleSubmit(handleForm)}
					noValidate>
					{/* Image*/}
					<ImageUploader
						NAME={"image"}
						LABEL={"Image"}
						MAX_LENGTH={1}
						TYPE="file"
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={imageURL && isSuccess["image"]}
						IS_LOADING={fileLoading["image"]}
						VALIDATION_RULES={validationRules}
						HANDLE_FILE_REMOVE={(id) =>
							handleFileRemove({
								label: "image",
								publicId: id,
								clearErrors: () => clearErrors("image"),
								onSuccess: () => setImageURL(null),
								onError: (error) =>
									setError("image", {
										type: "custom",
										message: error,
									}),
							})
						}
						FIELDS={imageURL ? [imageURL] : []}
						RENDER={(data) => data}
					/>

					{/* Title */}
					<InputField
						LABEL={"Title"}
						NAME={"title"}
						TYPE="text"
						PLACEHOLDER={"Enter product title"}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["title"]}
						REGISTER={register}
						VALIDATION_RULES={validationRules}
					/>

					{/* Category */}
					<SelectField
						NAME={"category"}
						LABEL={"Category"}
						PLACEHOLDER={"Select Category "}
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["category"]}
						VALIDATION_RULES={validationRules}
						OPTIONS={[
							{ value: "", label: "Choose A Category" },
							{ value: "cups", label: "Cups" },
							{ value: "kettle", label: "Kettle" },
							{ value: "plates", label: "Plates" },
							{ value: "bowls", label: "Bowls" },
							{ value: "jars", label: "Jars" },
							{ value: "jugs", label: "Jugs" },
							{ value: "mugs", label: "Mugs" },
							{ value: "saucer", label: "Saucer" },
							{ value: "decorates", label: "Decorates" },
						]}
					/>

					{/* Shape */}
					<InputField
						NAME={"shape"}
						LABEL={"Shape"}
						PLACEHOLDER={"Enter Shape "}
						TYPE="text"
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["shape"]}
						VALIDATION_RULES={validationRules}
					/>

					{/* Color */}
					<div className="mb-2 ">
						<InputField
							NAME={"color"}
							LABEL={"Color"}
							PLACEHOLDER={"Enter color (HEX)"}
							TYPE="text"
							REGISTER={register}
							ERRORS={errors}
							IS_SUCCESS={isSuccess["color"]}
							VALIDATION_RULES={validationRules}
							onFocus={() => setShowColor(true)}
							onChange={(e) => validateColor(e.target.value)}
						/>
						{showColor && (
							<small className="flex">
								<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
									{colorLoading ? (
										<IoReloadOutline className="w-6 h-6 text-gray-500 dark:text-gray-400 animate-spin" />
									) : (
										<FaCircle
											style={{
												color: `${color}`,
											}}
											className="w-6 h-6"
										/>
									)}
								</span>
								<input
									disabled
									value={color || ""}
									type="text"
									id="website-admin"
									className="rounded-none  bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Bonnie Green"
								/>
								<span
									className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-e-md  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
									onClick={() => {
										setValue("color", color), clearErrors("color");
										setIsSuccess((prev) => ({
											...prev,
											color: color && !errors["color"],
										}));
									}}>
									<IoMdAdd className="w-6 h-6" />
								</span>
							</small>
						)}
					</div>

					{/* Dimension */}
					<InputField
						NAME={"dimension"}
						LABEL={"Dimension"}
						PLACEHOLDER={"Enter Dimension "}
						TYPE="text"
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["dimension"]}
						VALIDATION_RULES={validationRules}
					/>

					{/* Height */}
					<InputField
						NAME={"height"}
						LABEL={"Height"}
						PLACEHOLDER={"Enter Height (inches)"}
						TYPE="number"
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["height"]}
						VALIDATION_RULES={validationRules}
					/>

					{/* Size */}
					<SelectField
						NAME={"size"}
						LABEL={"Size"}
						PLACEHOLDER={"Select Size "}
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["size"]}
						VALIDATION_RULES={validationRules}
						OPTIONS={[
							{ value: "", label: "Choose A Size" },
							{ value: "x-small", label: "X-Small (5-6 inches)" },
							{ value: "small", label: "Small (6-8 inches)" },
							{ value: "medium", label: "Medium (9-11 inches)" },
							{ value: "large", label: "Large (12-14 inches)" },
							{ value: "x-large", label: "X-Large (15+ inches)" },
						]}
					/>

					{/* Price */}
					<InputField
						NAME={"price"}
						LABEL={"Price"}
						PLACEHOLDER={"Enter price"}
						TYPE="number"
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["price"]}
						VALIDATION_RULES={validationRules}
					/>

					{/* Description */}
					<TextArea
						NAME={"description"}
						LABEL={"Description"}
						PLACEHOLDER={"Enter product description"}
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["description"]}
						VALIDATION_RULES={validationRules}
					/>

					{/* Images */}
					<ImageUploader
						NAME={"images"}
						LABEL={"Images"}
						MAX_LENGTH={5}
						TYPE="file"
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={fields.length && isSuccess["images"]}
						VALIDATION_RULES={validationRules}
						HANDLE_FILE_REMOVE={(id,i) =>
							handleFileRemove({
								label: "images",
								publicId: id,
								clearErrors: () => clearErrors("images"),
								onSuccess: () => remove(i),
								onError: (error) =>
									setError("images", {
										type: "custom",
										message: error,
									}),
							})
						}
						IS_LOADING={fileLoading["images"]} 
						FIELDS={fields}
						RENDER={(data) => data}
						multiple
					/>

					{/* Submit Button */}
					<div className="flex gap-1">
						<button
							// disabled={!isDirty || !isValid || isSubmitting}
							onClick={resetForm}
							type="button"
							className="w-full my-8 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-lg text-lg px-5 py-2.5 text-center">
							Reset
						</button>
						<button
							// disabled={!isDirty || !isValid || isSubmitting}
							type="submit"
							className="w-full my-8 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-lg text-lg px-5 py-2.5 text-center">
							Submit
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
export default InventoryForm;
