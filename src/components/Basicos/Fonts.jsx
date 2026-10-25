import React from "react";

const Fonts = ({
  children,
  className = "",
  color = "default",
  hover = false,
  tamano = "texto",
}) => {
  const baseStyles = "flex justify-center  ";

  const colors = {
    default: "inherit",
    black: "text-black",
    white: "text-white",
    danger: "text-danger",
    warning: "text-warning",
    primary: "text-primary uppercase",
    secundary: "text-secundary uppercase ",
    success: "tracking-wide text-success",
    important: "tracking-wide text-danger  ",
    dark: "bg-gray-800 border border-gray-700 text-white",
  };

  const hoverStyles = hover ? "hover:text-white" : "";

  const tamanos = {
    title:
      "font-semibold text-[.80em] md:text-[1.20em] lg:text-[1.40em] xl:text-[1.60em] font-artifiko ",
    subtitle:
      "font-medium text-[.60em] md:text-[.70em]  lg:text-[.80em]  xl:text-[1.0em] font-Artifika ",
    texto:
      "font-thin font-openSans text-[.70em] md:text-[.75em]  lg:text-[.80em]  xl:text-[.90em]",
  };

  return (
    <div
      className={`${baseStyles}  ${colors[color]} ${hoverStyles} ${tamanos[tamano]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Fonts;
