import { toast } from "react-toastify";
import UseMyUserContext from "../context/UserContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { updateDoc, doc, db } from "../firebase/config";
// import { useLogout } from "../hooks/useLogout";
import { useUsers } from "../hooks/useUsers";
import Imagenes from "../components/Basicos/Imagenes";

export default function FormProvider() {
  const { userState } = UseMyUserContext();
  const navigate = useNavigate();
  const { logout } = useUsers();

  const { authIsReady } = userState;
  // console.log(userState);

  const logoutUser = async (e) => {
    e.preventDefault();
    navigate("/");
    // update online status
    await updateDoc(doc(db, "UsersTestCss", userState.user.uid), {
      online: false,
    });
    localStorage.removeItem("data");
    logout();
    window.location.reload();
  };

  return (
    <>
      {authIsReady && (
        <div className="flex min-h-full flex-col justify-center px-6 py-8 md:py-0">
          <div className="h-14 w-full text-white bg-black text-center pt-3 mb-5">
            useReducer with create-contec, use-contex and Provider
          </div>
          <div className="flex flex-row">
            <span>user Status: </span>
            {!userState.user ? (
              <p className="text-red-500 font-bold"> not user</p>
            ) : (
              <Imagenes
                src={userState.dataUser.photoURL}
                alt=""
                tamano="profile"
                estilo="profile"
                className="m-1"
              >
                {/* {state.user.displayName} */}
              </Imagenes>
            )}
          </div>
          <div className="flex flex-row justify-evenly ">
            {!userState.user ? (
              <button className="bg-yellow-100 m-2 p-2 rounded-lg cursor-pointer">
                <Link to="/login">Login</Link>
              </button>
            ) : (
              <button
                onClick={logoutUser}
                className="bg-yellow-100 m-2 p-2 rounded-lg cursor-pointer"
              >
                Logout
              </button>
            )}

            <button className="bg-yellow-100 m-2 p-2 rounded-lg cursor-pointer">
              <Link to="/Signup">Create Account</Link>
            </button>
            {userState.user && (
              <button className="bg-yellow-100 m-2 p-2 rounded-lg cursor-pointer">
                <Link to="/edituser">Edit Profile</Link>
              </button>
            )}
            {/* <button className="bg-yellow-100 m-2 p-2 rounded-lg cursor-pointer">
              <Link to="/edituser">Edit Profile</Link>
            </button> */}
          </div>
          <hr />
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
