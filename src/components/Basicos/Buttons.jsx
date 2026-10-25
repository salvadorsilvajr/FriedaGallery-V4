import React from "react";

const Buttons = ({
	children,
	className = "",
	variant = "default",
	hover = false,
	estilo = "texto",
}) => {
	const baseStyles = "flex justify-center bg-inherit uppercase";
	const variants = {
		default: "bg-black",
		primary: "bg-primary text-white  m-2 p-1",
		secundary: "bg-secundary ",
		success: "",
		dark: "bg-gray-800 border border-gray-700 text white",
	};

	const hoverStyles = hover ? "hover:text-sec-hover" : "";

	const estilos = {
		small:
			" text-[.60em] md:text-[.70em] lg:text-[.80em] font-artifiko px-[.75em] md:px-[1em] lg:px-[1.2em] tracking-widest rounded-lg lg:w-25 w-18 md:w-22 hover:bg-emerald-100  hover:text-secundary",

		mediuem: "text-lg lg:text-2xl font-Artifika p-2",
		large: "p-2 font-Matemasie text-xs lg:text-sm xl:text-base",
		full: "p-2 font-Artifika tracking-wider text-danger  text-xs lg:text-sm xl:text-base",
	};

	return (
		<div
			className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${estilos[estilo]} ${className}`}
		>
			{children}
		</div>
	);
};

export default Buttons;
