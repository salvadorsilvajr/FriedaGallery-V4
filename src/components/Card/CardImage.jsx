import React from "react";

const CardImage = ({ src, alt = "Card Image", ClassName = "" }) => {
	return (
		<div className={`w-full h-48 overflow-hidden rounded-t-lg`}>
			{src ? (
				<img src={src} alt={alt} className='w-full h-full object-cover' />
			) : (
				<div className='w-full h-full bg-linear-to-r from-gray-200 to-gray-300 flex items-center justify-center'>
					<span className='text-gray-400 text-sm'>No Image available</span>
				</div>
			)}
		</div>
	);
};

export default CardImage;
