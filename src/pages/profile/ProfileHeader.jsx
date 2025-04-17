import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { ImPencil2, ImSpinner9 } from "react-icons/im";
import useHandleFiles from "../../hooks/useHandleFiles";
import ImageUploader from "../../components/ImageUploader";
import { IoCloseSharp } from "react-icons/io5";
import Avatar from "./Avatar";
import AvatarHandler from "./AvatarHandler";
import { MdEdit, MdEditOff } from "react-icons/md";
import useToast from "../../hooks/useToast";
import { useUpdateUserMutation } from "../../redux/store";
import useApiHandler from "../../hooks/useApiHandler";
import MiniLoader from "../../components/MiniLoader";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
const dummyImage =
	"https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1741285501~exp=1741289101~hmac=d629ec566545ef3b552d0a991e687ad2ed1aab9f352ae82b2df97cd3ad059148&w=740";

/**
 * ProfileHeader - Main profile header component with avatar and basic info
 * Handles avatar uploads and edit mode toggling
 */
const ProfileHeader = ({
	user,
	onEditing,
	isEditing,
	onSubmit,
	isUpdating,
}) => {
	const [file, setFile] = useState(() => ({
		url: user?.profilePhoto?.url,
		public_id: user?.profilePhoto?.public_id,
		type: user?.profilePhoto?.type,
	}));
	const { handleFileChange, handleFileRemove, fileLoading } = useHandleFiles();
	const showToast = useToast();
	const onFileRemove = useCallback(async () => {
		await handleFileRemove({
			label: "avatar",
			publicId: file.public_id,
			onError: (error) => showToast(error, "error"),
		});
		setFile({
			url: dummyImage,
			public_id: null,
			type: null,
		});
	}, [file.public_id, handleFileRemove, showToast]);

	const handleImageSubmission = useCallback(async () => {
		if (!file || !file.public_id) {
			const result = await Swal.fire({
				title: "Are you removing profile photo?",
				text: "You can revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#cac704",
				cancelButtonColor: "#3085d6",
				confirmButtonText: "Yes, removing!",
			});

			if (!result.isConfirmed) return;
		}
		onSubmit({ profilePhoto: file });
	}, [file, onSubmit]);

	return (
		<div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-float mb-6">
			<div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
				<div className="absolute -bottom-16 left-6">
					<div className="relative group">
						{isUpdating ? (
							<div
								className="h-32 w-32 rounded-full border-4 border-white
								 bg-white object-cover shadow-xl  animate-ping"
							/>
						) : isEditing ? (
							<AvatarHandler
								file={file}
								isLoading={fileLoading["avatar"] || isUpdating}
								onFileChange={async (e) =>
									await handleFileChange({
										label: "avatar",
										files: e.target.files,
										maxFiles: 1,
										minFile: 1,
										currentFields: [],
										onError: (error) =>
											error.message || "Profile photo not uploaded",
										appendData: ({ public_id, url, type, format }) =>
											setFile({
												public_id,
												url,
												type: `${type}/${format}`,
											}),
									})
								}
								onFileRemove={onFileRemove}
							/>
						) : (
							<Avatar
								imgLink={user?.profilePhoto?.url || dummyImage}
								imgAlt={`
                                ${user.firstName} 
                                ${user.lastName}
                                `}
							/>
						)}
						<button
							disabled={fileLoading["avatar"] || isUpdating}
							className={`absolute bottom-0 right-0 rounded-full p-2 border-2  
                						${isEditing ? "bg-blue-500" : "bg-emerald-500"}
               						 	border-white animate-pulse cursor-pointer`}
							aria-label={isEditing ? "Save avatar" : "Edit avatar"}
							onClick={handleImageSubmission}>
							{isEditing ? (
								<MdEdit className="text-white text-center" />
							) : (
								<FaCheck className="text-white text-center" />
							)}
						</button>
					</div>
				</div>
				<div className="absolute bottom-4 right-6">
					<button
						onClick={onEditing}
						className="px-4 py-2 bg-white/90 text-indigo-600 rounded-full shadow-md hover:bg-white transition-all duration-200">
						{isEditing ? "Cancel" : "Edit Profile"}
					</button>
				</div>
			</div>
			{/* User Info Section */}
			<div className="pt-20 px-6 pb-6">
				<div className="flex flex-col items-center sm:items-start gap-2">
					<h1 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
						{user.firstName || "N/A"} {user.lastName || "N/A"}
					</h1>
					<p className="text-gray-600 mt-2">{user.email || "N/A"}</p>
					{user.otpVerified && (
						<span className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
							Verified Account
						</span>
					)}
				</div>
			</div>
		</div>
	);
};
// Added to ProfileHeader.js
ProfileHeader.propTypes = {
	user: PropTypes.shape({
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		email: PropTypes.string.isRequired,
		profilePhoto: PropTypes.shape({
			url: PropTypes.string,
			public_id: PropTypes.string,
			type: PropTypes.string,
		}),
		otpVerified: PropTypes.bool,
	}).isRequired,
	isEditing: PropTypes.bool.isRequired,
	onEditing: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	isUpdating: PropTypes.bool.isRequired,
};
export default ProfileHeader;
