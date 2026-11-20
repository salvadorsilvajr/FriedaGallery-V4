import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Imagenes from "../components/Basicos/Imagenes";
import Fonts from "../components/Basicos/Fonts";
// import { MenuHeader } from "../data/dropdownOptios";
import UseMyUserContext from "../context/UserContext";
import { FaUserPlus } from "react-icons/fa";

export default function ScrollComponent() {
  const { userState } = UseMyUserContext();
  // const navigate = useNavigate();

  const user = userState.dataUser;
  return (
    <div className="m-0 p-0 box-border w-full">
      <div className=" p-2 rounded-lg border-1 border-primary mx-6 my-2 w-[90%] lg:w-[98%]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/">
              <Imagenes
                src={logo}
                alt="Logo Image"
                estilo="profile"
                tamano="profile"
              />
            </Link>
          </div>
          <div>
            <Fonts tamano="title" color="primary">
              Frieda Silva
            </Fonts>
          </div>
          <div className="flex flex-row w-2/8 justify-evenly">
            {user && (
              <>
                <NavLink className="my-auto" to="/userpage">
                  {({ isActive }) => (
                    <div
                      className={
                        isActive
                          ? "flex-col bg-gray-300 rounded-lg px-3 md:px-1 "
                          : "flex-col"
                      }
                    >
                      <div className="md:w-16 xl:w-20  flex justify-center">
                        <Imagenes
                          src={user.photoURL}
                          alt={user.displayName}
                        ></Imagenes>
                      </div>
                      <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                        <Fonts>Menu</Fonts>
                      </div>
                    </div>
                  )}
                </NavLink>
              </>
            )}
            {!user && (
              <NavLink to="/login">
                {({ isActive }) => (
                  <div
                    className={
                      isActive
                        ? "flex-col bg-gray-300 rounded-lg px-3 md:px-1 "
                        : "flex-col"
                    }
                  >
                    <div className="md:w-16   flex justify-center">
                      <FaUserPlus size="1.6rem" />
                    </div>
                    <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                      <Fonts>SignIn</Fonts>
                    </div>
                  </div>
                )}
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
