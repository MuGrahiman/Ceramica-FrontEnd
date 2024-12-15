import React, { useState } from "react";
import InputField from "../../components/InputField";
import BreadCrumb from "../../components/BreadCrumb";
import TextArea from "../../components/TextArea";
import SelectField from "../../components/SelectField";
import { useFieldArray, useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { IoCloseSharp, IoReloadOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useEffect } from "react";
import useColorValidator from "../../hooks/useColorValidator";
import axios from "axios";
import CryptoJS from "crypto-js";
import ImageUploader from "../../components/ImageUploader";

const InventoryForm = ({
	TITLE,
	BREAD_CRUMB_ITEMS,
	ON_SUBMIT,
	DEFAULT_VALUES,
}) => {
	const {
		handleSubmit,
		reset,
		watch,
		control,
		setValue,
		setError,
		clearErrors,
		register,
		trigger,
		formState: { errors, isDirty, isSubmitting, isValid },
	} = useForm({
		defaultValues: {
			images: [],
		},
	});
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
		{
			control,
			name: "files",
			rules: { minLength: 4 },
		}
	);
	const handleTrigger = async (i) => await trigger(i);
	const [imageURLs, setImageURLs] = useState([]);

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
	const [imageURL, setImageURL] = useState(null);
	const [showColor, setShowColor] = useState(false);
	const [color, setColor] = useState("FFFFFF");
	const [colorLoading, setColorLoading] = useState(false);
	const validateColor = async (e) => {
		const value = e.target.value.trim();
		// Check if the value is empty
		if (!value) {
			setError("color", { type: "custom", message: "Enter a valid value" });
			return; // Exit early if the value is invalid
		}

		// Clear previous errors if input is valid
		clearErrors("color");
		setColorLoading(true);

		try {
			const response = await fetch(
				`https://www.thecolorapi.com/id?hex=${value}&format=json`
			);
			const data = await response.json();

			// Check if the response contains valid color data
			if (data.name && data.hex.value) {
				setColor(data.hex.value); // Set the color to the hex value
				setIsSuccess((prev) => ({
					...prev,
					color: value && !errors["color"],
				}));
			} else {
				// Set an error if the fetch is successful but no color is found
				setError("color", {
					type: "custom",
					message: "There is no color with this value",
				});
			}
		} catch (error) {
			console.error("Error fetching color:", error);
			setError("color", {
				type: "custom",
				message: "Error fetching color", // Set error for fetch failure
			});
		} finally {
			setColorLoading(false); // Ensure loading state is cleared
		}
	};

	const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
	// const validateFile = (file, label) => {
	// 	if (!file) {
	// 		setError(label, {
	// 			type: "custom",
	// 			message: "Please upload the files",
	// 		});
	// 		return false;
	// 	}
	// 	clearErrors(label);
	// 	if (!allowedTypes.includes(file.type)) {
	// 		setError(label, {
	// 			type: "custom",
	// 			message: "Only JPEG,JPG and PNG files are accepted.",
	// 		});
	// 		return false;
	// 	}
	// 	return true;
	// };
	const validateFile = (file) => {
		file &&
			file.size > 0 &&
			file.type.startsWith("image/") &&
			allowedTypes.includes(file.type);

		if (!file) {
			return "Please upload the files"; // Return a string for error message
		}

		if (!file.type.startsWith("image/")) {
			return "Only Images will accept."; // Return a string for error message
		}

		if (!allowedTypes.includes(file.type)) {
			return "Only JPEG, JPG, and PNG files are accepted."; // Return a string for error message
		}

		return true; // Indicate successful validation
	};

	const uploadImage = async (file) => {
		if (!file) return null;

		const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
		const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", uploadPreset);
		try {
			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
				formData
			);
			if (response && response.statusText == "OK" && response.status == 200)
				return response.data;
			else return null;
		} catch (error) {
			console.error(error);
			return null;
		}
		//  finally {
		// }
	};
	useEffect(() => {
		// clearErrors("images");
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

	const handleImagesChange = async (e) => {
		const imagesData = e.target.files;
		clearErrors("images");
		if (imagesData.length === 0)
			return setError("images", {
				type: "custom",
				message: "Upload the files",
			});
		if (fields.length >= 2)
			setIsSuccess((prev) => ({
				...prev,
				images: !errors["images"],
			}));
		if (fields.length > 5 || fields.length + imagesData.length > 5)
			return setError("images", {
				type: "custom",
				message: "Only 5 files are accepted.",
			});

		await Array.from(imagesData).forEach(async (file) => {
			const imageValidity = await validateFile(file);
			if (imageValidity === true) {
				const response = await uploadImage(file);

				if (response) append({ file: response });
				else
					setError("images", {
						type: "custom",
						message: "Server error",
					});
			} else {
				setError("images", {
					type: "custom",
					message: imageValidity,
				});
			}
		});

		// if (imagesData && imagesData.length > 0) {
		// 	await Array.from(imagesData).forEach(async (file) => {
		// 		if (!validateFile(file)) return;
		// 		const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
		// 		const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

		// 		const formData = new FormData();
		// 		formData.append("file", file);
		// 		formData.append("upload_preset", uploadPreset);
		// 		try {
		// 			const response = await axios.post(
		// 				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
		// 				formData
		// 			);
		// 			if (response && response.statusText == "OK" && response.status == 200)
		// 				append({ file: response.data });
		// 		} catch (error) {
		// 		}
		// 		//  finally {
		// 		// }
		// 	});
		// }
	};

	const handleImageChange = async (e) => {
		const imagesData = e.target.files;
		clearErrors("image");
		const file = imagesData[0];
		if (!file)
			return setError("image", {
				type: "custom",
				message: "Upload the file ",
			});
		// const isValid =
		// 	file &&
		// 	file.size > 0 &&
		// 	file.type.startsWith("image/") &&
		// 	allowedTypes.includes(file.type);

		// if (isValid) {
		// 	const response = await uploadImage(file);
		// 	if (response && response.statusText == "OK" && response.status == 200)
		// 		setImageURL(response.data);
		// 	return;
		// } else
		// 	setIsSuccess((prev) => ({
		// 		...prev,
		// 		image: isValid,
		// 	}));

		await Array.from(imagesData).forEach(async (file) => {
			const imageValidity = await validateFile(file);
			if (imageValidity === true) {
				const response = await uploadImage(file);

				if (response) setImageURL(response);
				else
					setError("image", {
						type: "custom",
						message: "Server error",
					});
			} else {
				setError("image", {
					type: "custom",
					message: imageValidity,
				});
			}
		});
	};

	const generateSignature = async (apiSecret, timestamp, publicId) => {
		// Implement your signature generation logic here
		// This usually involves hashing the required parameters
		const params = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

		const signature = CryptoJS.SHA1(params).toString(CryptoJS.enc.Hex);

		// .catch((err) => console.error(err));
		// const signature = await import("crypto-js").then((crypto) => {
		// 	return crypto.createHash("sha1").update(params).digest("hex");
		// }).catch(err=>console.error(err));
		return signature;
	};
	const removeImage = async (publicId) => {
		try {
			const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

			const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY; // Replace with your Cloudinary API key
			const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET; // Replace with your Cloudinary API secret

			const timestamp = Math.floor(Date.now() / 1000); // Current timestamp

			// Generate the signature for the delete request
			const signature = await generateSignature(apiSecret, timestamp, publicId);

			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
				{
					public_id: publicId,
					api_key: apiKey,
					timestamp: timestamp,
					signature: signature,
				}
			);
			console.log("🚀 ~ removeImage ~ response:", response)
			if (response && response.statusText === "OK" && response.status === 200)
				return true;
			else return false;
			// append({ file:response.data });
			// If using useFieldArray, remove the field
			// remove(index);
		} catch (error) {
			console.error(error);
			return false;
		}
		// finally {
		// }
	};

	const handleImageRemove = async (publicId, index) => {
		clearErrors("image");
		// Get current images as an array
		// const images = watch("images");
		// // Convert FileList to an array if it's a FileList
		// const imagesArray =
		// 	images instanceof FileList ? Array.from(images) : images;

		// // Check if imagesArray is an array
		// if (!Array.isArray(imagesArray)) {
		// 	console.error("Expected 'images' to be an array but got:", imagesArray);
		// 	return; // Exit the function if images is not an array
		// }

		// // Create a new array without the removed image
		// const updatedImages = imagesArray.filter((_, i) => i !== index);
		// // Update the form state
		// setValue("images", updatedImages);

		const isImageRemove = await removeImage(publicId);

		if (isImageRemove) setImageURL(null)

		// try {
		// 	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
		// 	const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

		// 	const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY; // Replace with your Cloudinary API key
		// 	const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET; // Replace with your Cloudinary API secret

		// 	const timestamp = Math.floor(Date.now() / 1000); // Current timestamp

		// 	// Generate the signature for the delete request
		// 	const signature = await generateSignature(apiSecret, timestamp, publicId);

		// 	const response = await axios.post(
		// 		`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
		// 		{
		// 			public_id: publicId,
		// 			api_key: apiKey,
		// 			timestamp: timestamp,
		// 			signature: signature,
		// 		}
		// 	);
		// 	if (response && response.statusText === "OK" && response.status === 200)
		// 		// append({ file:response.data });
		// 		// If using useFieldArray, remove the field
		// 		remove(index);
		// } catch (error) {}
		// finally {
		// }
	};
	const handleImagesRemove = async (publicId, index) => {
		clearErrors("images");
		// Get current images as an array
		// const images = watch("images");
		// // Convert FileList to an array if it's a FileList
		// const imagesArray =
		// 	images instanceof FileList ? Array.from(images) : images;

		// // Check if imagesArray is an array
		// if (!Array.isArray(imagesArray)) {
		// 	console.error("Expected 'images' to be an array but got:", imagesArray);
		// 	return; // Exit the function if images is not an array
		// }

		// // Create a new array without the removed image
		// const updatedImages = imagesArray.filter((_, i) => i !== index);
		// // Update the form state
		// setValue("images", updatedImages);


		const isImageRemove = await removeImage(publicId);

		if (isImageRemove) remove(index);

		// try {
		// 	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
		// 	const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

		// 	const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY; // Replace with your Cloudinary API key
		// 	const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET; // Replace with your Cloudinary API secret

		// 	const timestamp = Math.floor(Date.now() / 1000); // Current timestamp

		// 	// Generate the signature for the delete request
		// 	const signature = await generateSignature(apiSecret, timestamp, publicId);

		// 	const response = await axios.post(
		// 		`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
		// 		{
		// 			public_id: publicId,
		// 			api_key: apiKey,
		// 			timestamp: timestamp,
		// 			signature: signature,
		// 		}
		// 	);
		// 	if (response && response.statusText === "OK" && response.status === 200)
		// 		// append({ file:response.data });
		// 		// If using useFieldArray, remove the field
		// 		remove(index);
		// } catch (error) {}
		// finally {
		// }
	};

	const isColorMatch = (value) => value === color || "Please Select the color";

	const validationRules = {
		// image validator rules

		image: {
			required: "Image is required.",
			accept: ".jpeg, .jpg, .png",
			// validate: validateFile,
			validate: (value) => validateFile(value[0]),
			onChange: handleImageChange,
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
			onChange: (e) => {
				const value = e.target.value;
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
			validate: isColorMatch,
			// onChange: () => trigger("color"),
			onChange: validateColor,
		},
		// dimension validator rules
		dimension: {
			required: "Dimension is required.",
			onChange: (e) => {
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
			minLength: 3,
			onChange: (e) => {
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
			onChange: (e) => {
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
			// validate: (value) => value.length === 10 || "",
			onChange: (e) => {
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
				const isValidLength = value.trim().length >= 200; // Check for minimum length
				setIsSuccess((prev) => ({
					...prev,
					description: value && isValidLength && !errors["description"], // Update success state
				}));

				if (!isValidLength) {
					// Optionally, you can set an error message or handle it accordingly
					setError("description", {
						type: "custom",
						message: "Description must be at least 200 characters long.",
					});
				} else {
					// Clear the error if the length is valid
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
			// required: "Image is required.",
			validate: {
				isValue: () => fields.length || "Images is required.",
				// isValidValue: () =>
				// 	fields.every(({ file }) => validateFile(file)) ||
				// 	"Only JPEG,JPG and PNG files are accepted.",
				isMinValue: () => fields.length >= 2 || "Minimum 3 images needed",
				isMaxValue: () => fields.length < 6 || "Maximum 5 images needed",
			},
			onChange: handleImagesChange,
		},
		files: {
			required: "Image is required.",
			validate: () => fields.length || "Image is required.",

			//! file must be an object with cloudinary response.
			// validate: (files) => files.every(({ file }) => validateFile(file)),

			// validate: (value) =>
			// 	validateFile(value) || "Only JPEG, JPG, and PNG files are allowed.",
			onChange: handleImagesChange,
		},
	};

	// const imageData = watch("image");
	// useEffect(() => {
	// 	if (imageData && imageData.length > 0) {
	// 		const file = imageData[0]; // Access the first file
	// 		// Create a URL for the image file
	// 		const ImageUrl = URL.createObjectURL(file);
	// 		setImageURL(ImageUrl);
	// 		// Set the image URL to state or use it directly in the render
	// 		// setImagePreview(imageUrl); // Assuming setImagePreview is a state setter
	// 	}
	// }, [imageData]);

	// Form resetting Function
	const resetForm = async () => {
		await fields.forEach(async (field) => {
			await removeImage(field.file.public_id);
		});

		reset(), setIsSuccess(defaultSuccessValue);
		setImageURL(null);
		setImageURLs([]);
		remove();
		setColor("");
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
					onSubmit={handleSubmit(ON_SUBMIT)}
					noValidate>
					{/* Icon */}

					{/* {imageURL && (
						<img
							className="rounded w-16 h-16 mx-auto"
							src={imageURL}
							alt="image description"
						/>
					)} */}

					{/* <InputField
						NAME={"image"}
						LABEL={"Image"}
						PLACEHOLDER={"Select the file"}
						TYPE="file"
						REGISTER={register}
						ERRORS={errors}
						IS_SUCCESS={isSuccess["image"]}
						VALIDATION_RULES={validationRules}
					/> */}
					<ImageUploader
						NAME={"image"}
						LABEL={"Image"}
						MAX_LENGTH={1}
						TYPE="file"
						REGISTER={register}
						ERRORS={errors}
						onChange={handleImageChange}
						IS_SUCCESS={isSuccess["image"]}
						VALIDATION_RULES={validationRules}
						HANDLE_FILE_REMOVE={handleImageRemove}
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
					<div className=" ">
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
									)}{" "}
								</span>
								<input
									disabled
									value={color}
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
							{ value: "small", label: "Small" },
							{ value: "medium", label: "Medium" },
							{ value: "large", label: "Large" },
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
					{/* <InputField
						NAME={"images"}
						LABEL={"Images"}
						PLACEHOLDER={"Select the files"}
						TYPE="file"
						REGISTER={register}
						ERRORS={errors}
						onChange={handleFileChange}
						IS_SUCCESS={isSuccess["images"]}
						VALIDATION_RULES={validationRules}
						multiple
					/> */}
					<ImageUploader
						NAME={"images"}
						LABEL={"Images"}
						MAX_LENGTH={5}
						TYPE="file"
						REGISTER={register}
						ERRORS={errors}
						onChange={handleImagesChange}
						IS_SUCCESS={isSuccess["images"]}
						VALIDATION_RULES={validationRules}
						HANDLE_FILE_REMOVE={handleImagesRemove}
						FIELDS={fields}
						RENDER={(data) => data.file}
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
