import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";

const SearchBar = ({ ON_SUBMIT, CLEAR_SEARCH }) => {
	const { register, handleSubmit } = useForm();

	return (
		<form className="flex-1 flex w-full" onSubmit={handleSubmit(ON_SUBMIT)}>
			<div className="relative w-full">
				<input
					type="search"
					id="search-dropdown"
					{...register("searchTerm", {
						required: true,
						onChange: (e) => !e.target.value.trim() && CLEAR_SEARCH(),
					})}
					className="focus:outline-none block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 focus:ring-gray-500 dark:bg-gray-600 dark:placeholder-gray-400 rounded-e-lg rounded-s-lg dark:text-white border border-gray-300 focus:border-gray-500 dark:border-gray-600 dark:focus:border-gray-500"
					placeholder="Search"
					required
				/>

				<button
					type="submit"
					className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-e-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-800">
					<svg
						className="w-4 h-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20">
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</button>
			</div>
		</form>
	);
};

SearchBar.propTypes = {
	ON_SUBMIT: PropTypes.func.isRequired,
	CLEAR_SEARCH: PropTypes.func.isRequired,
};
export default SearchBar;
