import React from "react";
import PropTypes from "prop-types";
import { FaRegTimesCircle } from "react-icons/fa";
import { TbPencil } from "react-icons/tb";

/**
 * EditToggler - A toggle component for switching between edit and view modes
 *
 * @param {Object} props
 * @param {boolean} [props.isEditing=false] - Current edit mode state
 * @param {function} [props.onEdit] - Called when entering edit mode
 * @param {function} [props.onClose] - Called when exiting edit mode
 */
const EditToggler = ({
	isEditing = false,
	onEdit = () => {},
	onClose = () => {},
}) => {
	const commonClasses =
		"h-6 w-6 cursor-pointer hover:scale-105 transition-transform duration-200 text-indigo-600 inline-block mr-2";

	return (
		<div className="inline-block" role="switch" aria-checked={isEditing}>
			{isEditing ? (
				<FaRegTimesCircle
					onClick={onClose}
					className={`${commonClasses} hover:text-red-600`}
					aria-label="Exit edit mode"
					tabIndex="0"
					onKeyDown={(e) => e.key === "Enter" && onClose()}
				/>
			) : (
				<TbPencil
					onClick={onEdit}
					className={commonClasses}
					aria-label="Enter edit mode"
					tabIndex="0"
					onKeyDown={(e) => e.key === "Enter" && onEdit()}
				/>
			)}
		</div>
	);
};

EditToggler.propTypes = {
	isEditing: PropTypes.bool,
	onEdit: PropTypes.func,
	onClose: PropTypes.func,
};

export default React.memo(EditToggler);
