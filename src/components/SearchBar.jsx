import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import MiniLoader from "./MiniLoader";

const SearchBar = ({
	ON_SUBMIT,
	CLEAR_SEARCH,
	INPUT_STYLE,
	BUTTON_STYLE,
	IS_LOADING = false,
}) => {
	const { register, handleSubmit } = useForm();

	return (
		<form
			className="flex-1 flex w-full rounded-lg"
			onSubmit={handleSubmit(ON_SUBMIT)}>
			<div className="relative w-full">
				<input
					type="search"
					id="search-dropdown"
					{...register("searchTerm", {
						required: true,
						onChange: (e) => !e.target.value.trim() && CLEAR_SEARCH(),
					})}
					className={INPUT_STYLE}
					placeholder="Search"
					required
				/>
				<button
					type="submit"
					disabled={IS_LOADING}
					className={`absolute top-0 end-0 font-serif px-8 ${BUTTON_STYLE}`}>
					{IS_LOADING ? (
						<MiniLoader />
					) : (
						<>
							<p className="hidden md:block lg:mx-2"> Search </p>
							<svg
								className="w-4 h-4 md:hidden"
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
						</>
					)}
				</button>
			</div>
		</form>
	);
};

SearchBar.propTypes = {
	ON_SUBMIT: PropTypes.func.isRequired,
	CLEAR_SEARCH: PropTypes.func.isRequired,
	INPUT_STYLE: PropTypes.string,
	BUTTON_STYLE: PropTypes.string,
	IS_LOADING: PropTypes.bool,
};
export default SearchBar;
