import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UseMyUserContext from "../../context/UserContext";
import { useUsers } from "../../hooks/useUsers";
import { FaUserEdit } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { PiSignOutFill } from "react-icons/pi";
import { GrGallery } from "react-icons/gr";
import Fonts from "../../components/Basicos/Fonts";
import Buttons from "../../components/Basicos/Buttons";
import Back from "../../components/Back";

const UserPage = () => {
  const navigate = useNavigate();
  const { userState } = UseMyUserContext();
  const { logout } = useUsers();
  const user = userState.dataUser;

  const handleLogOut = () => {
    logout();
    navigate("/");
    // window.location.reload();
  };
  return (
    <>
      <Back />
      <div className="lg:w-6/8 w-full flex justify-center">
        <div className="flex flex-row lg:w-6/8 w-full justify-evenly m-2 border border-1 border-gray-300 rounded-lg">
          {user && user.isAdmin === "1" ? (
            <>
              <NavLink
                to="/userPage"
                end
                className="p-3 hover:bg-primary/10 rounded-lg"
              >
                {({ isActive }) => (
                  <div
                    className={
                      isActive
                        ? "flex-col bg-gray-300 rounded-lg px-3 md:px-1 "
                        : "flex-col"
                    }
                  >
                    <div className="md:w-16   flex justify-center items-center ">
                      <FaUserEdit size="1.6rem " />
                    </div>
                    <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                      <Fonts tamano="texto">Profile</Fonts>
                    </div>
                  </div>
                )}
              </NavLink>
              <NavLink
                to="/userPage/createPiece"
                className="p-3 hover:bg-primary/10 rounded-lg"
              >
                {({ isActive }) => (
                  <div
                    className={
                      isActive
                        ? "flex-col bg-gray-300 rounded-lg px-3 md:px-1 "
                        : "flex-col"
                    }
                  >
                    <div className="md:w-16   flex justify-center items-center">
                      <RiImageAddFill size="1.6rem" />
                    </div>
                    <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                      <Fonts>New Piece</Fonts>
                    </div>
                  </div>
                )}
              </NavLink>
              <NavLink
                to="/userPage/gallery"
                className="p-3 hover:bg-primary/10 rounded-lg"
              >
                {({ isActive }) => (
                  <div
                    className={
                      isActive
                        ? "flex-col bg-gray-300 rounded-lg px-3 md:px-1 "
                        : "flex-col"
                    }
                  >
                    <div className="md:w-16   flex justify-center items-center">
                      <GrGallery size="1.6rem" />
                    </div>
                    <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                      <Fonts>Gallery</Fonts>
                    </div>
                  </div>
                )}
              </NavLink>

              <NavLink
                onClick={handleLogOut}
                className="p-3 hover:bg-primary/10 rounded-lg"
                to="#"
              >
                {({ isActive }) => (
                  <div
                    className={
                      isActive
                        ? "flex-col  rounded-lg px-3 md:px-1 "
                        : "flex-col"
                    }
                  >
                    <div className="md:w-16   flex justify-center items-center">
                      <PiSignOutFill size="1.6rem" />
                    </div>
                    <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                      <Fonts>LogOut</Fonts>
                    </div>
                  </div>
                )}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="my-auto" to="/editProfile">
                {({ isActive }) => (
                  <Buttons
                    estilo="outline"
                    className={
                      isActive
                        ? "flex-col bg-gray-300 rounded-lg px-3 md:px-1 "
                        : "flex-col"
                    }
                  >
                    {/* <div className="md:w-16   flex justify-center items-center">
                    <PiSignOutFill size="1.6rem" />
                  </div> */}
                    <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                      <Fonts>Profile</Fonts>
                    </div>
                  </Buttons>
                )}
              </NavLink>
              <NavLink onClick={handleLogOut} className="my-auto" to="#">
                {({ isActive }) => (
                  <div
                    className={
                      isActive
                        ? "flex-col bg-gray-300 rounded-lg px-3 md:px-1 "
                        : "flex-col"
                    }
                  >
                    <div className="md:w-16   flex justify-center items-center">
                      <PiSignOutFill size="1.6rem" />
                    </div>
                    <div className="md:w-16 lg:w-18 flex text-center justify-center hidden md:block ">
                      <Fonts>LogOut</Fonts>
                    </div>
                  </div>
                )}
              </NavLink>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default UserPage;
