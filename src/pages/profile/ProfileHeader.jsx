import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useHandleFiles from "../../hooks/useHandleFiles";
import MiniLoader from "../../components/MiniLoader";
import Avatar from "./Avatar";
import AvatarHandler from "./AvatarHandler";
import { toast } from "react-toastify";

const dummyImage =
	"https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg";

/**
 * ProfileHeader - Displays user profile with avatar and editable sections
 *
 * @param {Object} props
 * @param {User} props.user - User data object
 * @param {boolean} props.isEditing - Global edit mode state
 * @param {boolean} props.isAvatarEditing - Avatar-specific edit state
 * @param {boolean} props.isAvatarUpdating - Avatar loading state
 * @param {function} props.onEditing - Toggles global edit mode
 * @param {function} props.onAvatarEditing - Toggles avatar edit mode
 * @param {function} props.onAvatarSubmit - Handles avatar submission
 */
const ProfileHeader = ({
	user = {},
	isEditing = false,
	isAvatarEditing = false,
	isAvatarUpdating = false,
	onEditing = () => {},
	onAvatarEditing = () => {},
	onAvatarSubmit = () => {},
}) => {
		const { error: errorToast  } = toast;
	
	const [avatarFile, setAvatarFile] = useState({
		url: user?.profilePhoto?.url || dummyImage,
		public_id: user?.profilePhoto?.public_id || null,
		type: user?.profilePhoto?.type || null,
	});

	const { handleFileChange, handleFileRemove, fileLoading } = useHandleFiles();

	const userFullName = useMemo(
		() => `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "N/A",
		[user]
	);

	// Sync avatar with user data
	useEffect(() => {
		if (user?.profilePhoto) {
			setAvatarFile({
				url: user.profilePhoto.url || dummyImage,
				public_id: user.profilePhoto.public_id,
				type: user.profilePhoto.type,
			});
		}
	}, [user]);

	const handleAvatarRemove = useCallback(async () => {
		await handleFileRemove({
			label: "avatar",
			publicId: avatarFile.public_id,
			onError: (error) => errorToast(error),
		});
		setAvatarFile({
			url: dummyImage,
			public_id: null,
			type: null,
		});
	}, [avatarFile.public_id, errorToast, handleFileRemove]);

	const handleAvatarSubmit = useCallback(async () => {
		if (!avatarFile || !avatarFile.public_id) {
			const confirmation = await Swal.fire({
				title: "Remove profile photo?",
				text: "This will set a default avatar",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#cac704",
				cancelButtonColor: "#3085d6",
			});

			if (!confirmation.isConfirmed) return;
		}

		await onAvatarSubmit({ profilePhoto: avatarFile });
		onAvatarEditing();
	}, [avatarFile, onAvatarEditing, onAvatarSubmit]);

	const handleFileUpload = useCallback(
		async (e) => {
			await handleFileChange({
				label: "avatar",
				files: e.target.files,
				maxFiles: 1,
				minFile: 1,
				currentFields: [],
				onError: (error) => error.message || "Upload failed",
				appendData: ({ public_id, url, type, format }) =>
					setAvatarFile({
						public_id,
						url,
						type: `${type}/${format}`,
					}),
			});
		},
		[handleFileChange]
	);

	return (
		<div
			className="bg-white rounded-2xl shadow-lg overflow-hidden animate-float mb-6"
			aria-label="User profile header">
			{/* Background Banner */}
			<div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
				{/* Avatar Section */}
				<div className="absolute -bottom-16 left-6">
					<div className="relative group">
						{isAvatarUpdating ? (
							<div
								className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-xl animate-pulse"
								aria-label="Avatar loading"
							/>
						) : isAvatarEditing ? (
							<AvatarHandler
								file={avatarFile}
								isLoading={fileLoading.avatar || isAvatarUpdating}
								onFileChange={handleFileUpload}
								onFileRemove={handleAvatarRemove}
							/>
						) : (
							<Avatar
								imgLink={avatarFile.url}
								imgAlt={`${userFullName}'s avatar`}
							/>
						)}

						<button
							disabled={fileLoading.avatar || isAvatarUpdating}
							className={`absolute bottom-0 right-0 rounded-full p-2 border-2 ${
								isAvatarEditing ? "bg-emerald-500" : "bg-blue-500"
							} border-white transition-all duration-200`}
							onClick={isAvatarEditing ? handleAvatarSubmit : onAvatarEditing}
							aria-label={
								isAvatarEditing ? "Save avatar changes" : "Edit avatar"
							}>
							{isAvatarUpdating ? (
								<MiniLoader size="sm" />
							) : isAvatarEditing ? (
								<FaCheck className="text-white" />
							) : (
								<MdEdit className="text-white" />
							)}
						</button>
					</div>
				</div>

				{/* Edit Profile Button */}
				<div className="absolute bottom-4 right-6">
					<button
						onClick={onEditing}
						disabled={isAvatarUpdating}
						className="px-4 py-2 bg-white/90 text-indigo-600 rounded-full shadow-md hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						aria-label={isEditing ? "Cancel editing" : "Edit profile"}>
						{isAvatarUpdating ? (
							<MiniLoader size="sm" />
						) : isEditing ? (
							"Cancel"
						) : (
							"Edit Profile"
						)}
					</button>
				</div>
			</div>

			{/* User Info Section */}
			<div className="pt-20 px-6 pb-6">
				<div className="flex flex-col items-center sm:items-start gap-2">
					<h1 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
						{userFullName}
					</h1>
					<p className="text-gray-600 mt-2">{user?.email || "N/A"}</p>
					{user?.otpVerified && (
						<span
							className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
							aria-label="Verified account">
							Verified Account
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

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
	isEditing: PropTypes.bool,
	isAvatarEditing: PropTypes.bool,
	isAvatarUpdating: PropTypes.bool,
	onEditing: PropTypes.func,
	onAvatarEditing: PropTypes.func,
	onAvatarSubmit: PropTypes.func,
};

ProfileHeader.defaultProps = {
	isEditing: false,
	isAvatarEditing: false,
	isAvatarUpdating: false,
	onEditing: () => {},
	onAvatarEditing: () => {},
	onAvatarSubmit: () => {},
};

export default React.memo(ProfileHeader);
