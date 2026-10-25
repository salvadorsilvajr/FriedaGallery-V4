import React from "react";
import Pic from "../../../src/assets/pic.png";

const imagenes = ({
  src,
  alt = "Image",
  className = "",
  hover = false,
  tamano = "profile",
  estilo = "profile",
}) => {
  const baseStyles = "p-1";

  const hoverStyles = hover ? "hover:bg-primary/50" : "";
  // console.log(tamano);

  const tamanos = {
    profile: "w-16 h-16 lg:h-18 lg:w-18  xl:w-20 xl:h-20",
    // land: "max-w-xl mx-auto  overflow-hidden rounded-lg shadow-md",
    landscape:
      "  my-auto max-h-[15em] sm:max-h-[18em] md:max-h-[21em] lg:max-h-[24em] xl:max-h-[27em]  aspect-3/2 overflow-hidden rounded-lg",
    // port: "max-w-xs  mx-auto overflow-hidden rounded-lg shadow-lg",
    land: "w-full my-auto aspect-[4/3] lg:aspect-[16/9] overflow-hidden",
    port: "max-w-screen-md mx-auto aspect-[3/4] ",
    portrait:
      "   max-w-[10em] sm:max-w-[15em] md:max-w-[20em] lg:max-w-[25em] xl:max-w-[30em]  aspect-[3/4] overflow-hidden rounded-lg",
    square:
      "w-24 h-24  md:w-40 md:h-40 lg:h-52 lg:w-52  xl:w-60 xl:h-60 aspect-square ",

    full: "w-full",
  };
  const estilos = {
    profile: " aspect-square rounded-full object-cover",
    // landscape: "w-full aspect-3/2 object-cover",
    landscape: "  inset-0 w-full h-full object-cover",
    land: " w-full h-full object-cover object-center rounded-lg",
    port: "rounded-lg w-full  object-cover",
    // portrait: "w-full aspect-3/4 object-cover  ",
    portrait: "  inset-0 w-full h-full object-cover",
    square: "w-full h-full object-cove rounded-lg",
    full: " inset-0 w-full h-full object-cover",
  };

  return (
    <div
      className={`${baseStyles}  ${hoverStyles}  ${tamanos[tamano]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full  ${estilos[estilo]} ${className}`}
        />
      ) : (
        <img
          src={Pic}
          alt={alt}
          className={`w-full h-full  ${estilos[estilo]} ${className}`}
        />
      )}
    </div>
  );
};

export default imagenes;
