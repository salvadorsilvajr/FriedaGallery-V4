import { useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";

export default function DropDoenMenu({
	// MenuOptions,
	name,
	logoutUser,
	MenuOptions,
	// MenuAdmin,
	variant = "NavMenu",
	...props
}) {
	const [show, setShow] = useState(false);

	const baseStyles = " flex flex-col   ";

	const variants = {
		NavMenu:
			"absolute top-8 text-text bg-bg-app text-center  font-artifiko text-xl",
	};

	const combinedStyles = `${baseStyles} ${variants[variant]}`;

	return (
		<>
			<div
				onMouseEnter={() => setShow(true)}
				onMouseLeave={() => setShow(false)}
				// onClick={() => setShow(!show)}
				className=' flex w-25 lg:w-35 flex-col'
			>
				<button className='bg-bg-app rounded-md border-2 font-bold text-secundary hover:bg-text-secundary cursor-pointer text-xs md:text-sm lg:text-md hover:border-2 border-primary  flex flex-row p-1 justify-between '>
					<p className='w-[10ch] truncate'>{name}</p>
					<FaAnglesDown />
				</button>
				{show ? (
					<div className={combinedStyles} {...props}>
						{/* <div className={combinedStyles} {...props}> */}
						{/* {children} */}
						{MenuOptions.map((option) => (
							<a
								key={option.id}
								className='  w-[inherit] lg:w-[inherit] hover:bg-primary text-center m-1 font-artifiko text-xs lg:text-md'
								href={option.address}
							>
								{option.name}
							</a>
						))}

						<a
							onClick={logoutUser}
							className=' w-25 lg:w-35 hover:bg-primary text-center m-1 font-artifiko text-sm lg:text-md cursor-pointer'
						>
							Sign Out
						</a>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
}
