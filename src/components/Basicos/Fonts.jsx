import React from "react";

const Fonts = ({
  children,
  className,
  font = "Artifika",
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

  const fonts = {
    Matemasie: "font-Matemasie",
    Artifika: "font-Artifika",
    artifiko: "font-artifiko",
  };

  const hoverStyles = hover ? "hover:text-white" : "";

  const tamanos = {
    title:
      "font-semibold text-[1.2em] md:text-[1.25em] lg:text-[1.30em] xl:text-[1.32em]  ",
    subtitle:
      "font-medium text-[.90em] md:text-[1.10em]  lg:text-[1.15em]  xl:text-[1.20em]  ",
    texto: " text-[.70em] md:text-[.72em]  lg:text-[.74em]  xl:text-[.75em]",
  };

  return (
    <div
      className={`${baseStyles}  ${colors[color]} ${hoverStyles} ${tamanos[tamano]} ${className} ${fonts[font]}`}
    >
      {children}
    </div>
  );
};

export default Fonts;
