import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { parseNumber } from "../utils/generals";

/**
 * CountUpNumber - Animated number counter with suffix support
 * @param {number} value - Target value (default: 0)
 * @param {number} duration - Animation duration in ms (default: 2000)
 * @param {number} decimalPlaces - Decimal precision (default: 0)
 */
const CountUpNumber = ({ value = 0, duration = 2000 }) => {
	const { numeric, suffix } = parseNumber(value);
	const [count, setCount] = useState(0);
	const startTimeRef = useRef(null);

	useEffect(() => {
		let animationId;

		const step = (timestamp) => {
			if (!startTimeRef.current) startTimeRef.current = timestamp;
			const progress = timestamp - startTimeRef.current;
			const progressRatio = Math.min(progress / duration, 1);
			const currentValue = Math.floor(progressRatio * numeric);
			setCount(currentValue);
			if (progress < duration) {
				animationId = requestAnimationFrame(step);
			} else {
				setCount(numeric);
			}
		};

		requestAnimationFrame(step);
		animationId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(animationId);
	}, [numeric, duration]);

	return (
		<span>
			{count}
			{suffix}
		</span>
	);
};

CountUpNumber.propTypes = {
	value: PropTypes.number.isRequired,
	duration: PropTypes.number,
};

export default CountUpNumber;
