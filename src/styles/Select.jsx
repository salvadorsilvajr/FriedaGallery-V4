import { useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";

export default function Select({
	// MenuOptions,
	name,
	logoutUser,
	MenuOptions,
	setFormData,
	// setRate,
	// MenuAdmin,
	variant = "NavMenu",
	...props
}) {
	const [show, setShow] = useState(false);

	const baseStyles = " flex flex-col   ";

	const variants = {
		NavMenu:
			"absolute top-7 text-text bg-bg-app text-center m-1 font-artifiko text-xl",
	};

	const combinedStyles = `${baseStyles} ${variants[variant]}`;

	return (
		<>
			<div
				// onMouseEnter={() => setShow(true)}
				// onMouseLeave={() => setShow(false)}
				onClick={() => setShow(!show)}
				className='relative flex w-full flex-col'
			>
				<button className='bg-bg-app rounded-md border-2 hover:bg-text-secundary cursor-pointer  hover:border-2 border-primary mb-1 flex flex-row p-1 justify-between'>
					{name}
					<FaAnglesDown />
				</button>
				{show ? (
					<ul className={combinedStyles} {...props}>
						{/* <div className={combinedStyles} {...props}> */}
						{/* {children} */}
						{MenuOptions.map((option) => (
							<li
								key={option.id}
								className='w-[inherit] lg:w-[inherit] hover:bg-primary text-center m-1 font-artifiko '
								// href={option.address}
								onClick={() => {
									setFormData(option);
								}}
							>
								{option.name}
							</li>
						))}
					</ul>
				) : (
					""
				)}
			</div>
		</>
	);
}
