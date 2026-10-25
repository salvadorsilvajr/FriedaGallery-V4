import { useState } from "react";
import Buttons from "./Buttons";
import Fonts from "./Fonts";
import Imagenes from "./Imagenes";
import { Link, NavLink } from "react-router-dom";
import { cardsData } from "../../data/cardsData";
import logo from "../../assets/logo.png";

const HamburgerMenu = () => {
  const user = cardsData[0];
  // State to manage the menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for the hamburger icon
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { title: "Form UseReducer", url: "/" },
    { title: "UseReducer Provider User", url: "/provider" },
    { title: "UseReducer Provider product", url: "/products" },
    // { title: "Others", url: "/OthersHooks" },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="flex items-center  justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "bg-red-500 font-bold" : "text-gray-500"
              }
            >
              {user.image && (
                <Imagenes
                  src={logo}
                  alt={user.title}
                  estilo="profile"
                  tamano="profile"
                />
              )}
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          {/* Hidden on mobile (hidden), flexible row on medium screens and up (md:flex) */}
          <div className=" hidden md:flex space-x-8 font-medium">
            {navLinks.map((link, index) => (
              <NavLink key={index} to={link.url}>
                {({ isActive }) => (
                  <Buttons
                    tamano="full"
                    // isActive={isActive}
                    background={!isActive ? "white" : "primary"}
                    estilo="full"
                  >
                    <Fonts
                      color={!isActive ? "primary" : "secundary"}
                      tamano="texto"
                      className="px-4"
                      hover={true}
                    >
                      {link.title}
                    </Fonts>
                  </Buttons>
                )}
              </NavLink>
            ))}
          </div>

          {/* Hamburger Menu Button */}
          {/* Visible on mobile (flex), hidden on medium screens and up (md:hidden) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-400 hover:text-secundary focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  // "X" Close Icon when menu is open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger Icon when menu is closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Menu */}
      {/* Conditionally rendered or styled based on the 'isOpen' state */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-primary/20 transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner absolute right-0 hover:bg-secundary/20">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              onClick={() => setIsOpen(false)} // Close menu on link click
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secundary/50 hover:text-white transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
