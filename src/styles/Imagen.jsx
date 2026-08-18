export default function Imagen({
	// children,
	name,
	variant = "logo",
	...props
}) {
	const baseStyles = " items-start justify-center ";

	const variants = {
		logo: "rounded-2xl object-cover ",
		user: "h-10 w-10 rounded-full object-cover",
		profile: "h-36 w-36 rounded-full",
		artPice: "h-36 w-36 ",
	};

	const combinedStyles = `${baseStyles} ${variants[variant]}`;
	return (
		// <div className=' relative h-0 pb-2/3 sm:pt-1/3 lg:pt-2/3'>
		<img className={combinedStyles} {...props}>
			{/* {children} */}
			{/* <span className='md:visible invisible '>{name}</span> */}
		</img>
		// </div>
	);
}
