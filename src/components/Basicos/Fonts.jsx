import React from "react";

const Fonts = ({
	children,
	className = "",
	variant = "default",
	hover = false,
	estilo = "texto",
}) => {
	const baseStyles = "flex justify-center bg-inherit uppercase";
	const variants = {
		default: "text-black",
		primary: "text-primary",
		secundary: "text-secundary ",
		success: "",
		dark: "bg-gray-800 border border-gray-700 text white",
	};

	const hoverStyles = hover ? "hover:text-sec-hover" : "";

	const estilos = {
		title: " text-xl lg:text-3xl xl:text-4xl font-artifiko p-2",
		subtitle: "text-lg lg:text-2xl font-Artifika p-2",
		texto: "p-2 font-Matemasie text-xs lg:text-sm xl:text-base",
		important:
			"p-2 font-Artifika tracking-wider text-danger  text-xs lg:text-sm xl:text-base",
	};

	return (
		<div
			className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${estilos[estilo]} ${className}`}
		>
			{children}
		</div>
	);
};

export default Fonts;
