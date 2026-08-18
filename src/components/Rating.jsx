import React from "react";
// import { Star } from "lucide-react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
// import PropTypes from 'prop-types';

const Rating = ({ value, tamano = "2em" }) => {
	return (
		<div className='flex flex-row justify-center mt-3'>
			<span style={{ color: "#fcc603" }}>
				{value >= 1 ? (
					<FaStar size={tamano} />
				) : value >= 0.05 ? (
					<FaStarHalfAlt size={tamano} />
				) : (
					<FaRegStar size={tamano} />
				)}
			</span>
			<span style={{ color: "#fcc603" }}>
				{value >= 2 ? (
					<FaStar size={tamano} />
				) : value >= 1.5 ? (
					<FaStarHalfAlt size={tamano} />
				) : (
					<FaRegStar size={tamano} />
				)}
			</span>
			<span style={{ color: "#fcc603" }}>
				{value >= 3 ? (
					<FaStar size={tamano} />
				) : value >= 2.5 ? (
					<FaStarHalfAlt size={tamano} />
				) : (
					<FaRegStar size={tamano} />
				)}
			</span>
			<span style={{ color: "#fcc603" }}>
				{value >= 4 ? (
					<FaStar size={tamano} />
				) : value >= 3.5 ? (
					<FaStarHalfAlt size={tamano} />
				) : (
					<FaRegStar size={tamano} />
				)}
			</span>
			<span style={{ color: "#fcc603" }}>
				{value >= 5 ? (
					<FaStar size={tamano} />
				) : value >= 4.5 ? (
					<FaStarHalfAlt size={tamano} />
				) : (
					<FaRegStar size={tamano} />
				)}
			</span>
			{/* <span>{text && text}</span> */}
		</div>
	);
};

// Rating.propTypes = {
//    value: PropTypes.number.isRequired,
//    text: PropTypes.string.isRequired,
//    color: PropTypes.string,
// }

export default Rating;
