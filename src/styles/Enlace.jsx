import { Link } from "react-router-dom";
export default function Enlace({
	children,
	name,
	variant = "NavMenu",
	...props
}) {
	const baseStyles = " items-start justify-center ";

	const variants = {
		NavMenu: "text-text m-1 lg:m-4 m-1",
		Back: "text-secundary    m-4 text-md md:text-lg lg:text-2xl",
		DropDown:
			"block px-4 py-2 text-xl text-gray-700 focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden",
	};

	const combinedStyles = `${baseStyles} ${variants[variant]}`;
	return (
		<Link className={combinedStyles} {...props}>
			{children}
			<span className='md:visible invisible '>{name}</span>
		</Link>
	);
}
