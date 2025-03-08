import React from "react";
import PropTypes from "prop-types";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const SortIcons = ({ label, sort, order }) => {
	if (label !== sort) {
		return (
			<div className="border text-white">
				<GoChevronUp />
				<GoChevronDown />
			</div>
		);
	}
	if (order === null) {
		return (
			<div className="cursor-pointer hover:bg-green-100 border">
				<GoChevronUp />
				<GoChevronDown />
			</div>
		);
	} else if (order === "ASC") {
		return (
			<div className="cursor-pointer hover:bg-green-100 border">
				<GoChevronUp />
			</div>
		);
	} else if (order === "DSC") {
		return (
			<div className="cursor-pointer hover:bg-green-100 border">
				<GoChevronDown />
			</div>
		);
	}
};
SortIcons.propTypes = {
	label: PropTypes.string.isRequired,
	sort: PropTypes.string.isRequired,
	order: PropTypes.string.isRequired,
};
export default SortIcons;
