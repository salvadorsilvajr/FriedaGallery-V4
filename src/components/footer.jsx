import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Fonts from "../components/Basicos/Fonts";
import { MenuFooter } from "../data/dropdownOptios";

export default function ScrollComponent() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // console.log(currentScrollY);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling UP
      } else {
        setIsVisible(true); // Scrolling DOWN
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="m-0 p-0 box-border">
      <div
        className={`p-2 mx-6 my-2 fixed -bottom-15 md:-bottom-20 xl:-bottom-22 left-0 w-[90%] lg:w-[98%]  rounded-lg bg-white border-1 border-primary text-black p-4 transition-transform duration-300 z-50 ${
          isVisible ? "-translate-y-full" : "translate-y-10"
        }`}
      >
        <div className="flex justify-around">
          {MenuFooter.map((option) => (
            <NavLink key={option.id} to={option.address}>
              {({ isActive }) => (
                <div
                  className={
                    isActive
                      ? "flex-col bg-gray-200 rounded-lg px-3 md:px-1 "
                      : "flex-col"
                  }
                >
                  <div className="md:w-16   flex justify-center">
                    <option.icon size="1.6rem" />
                  </div>
                  <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                    <Fonts>{option.name}</Fonts>
                  </div>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
