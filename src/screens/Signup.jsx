import { useState } from "react";
import UseMyUserContext from "../context/UserContext";
import Input from "../components/Basicos/Input";
import Buttons from "../components/Basicos/Buttons";
import { useUsers } from "../hooks/useUsers";
// import { useSignup } from "../hooks/useSignup";
import { MdVisibility } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, isPending } = useUsers();
  const { userState } = UseMyUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    userName: "",
  });

  const { email, password, userName } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    signup(email, password, userName, "UsersTestCss");
    navigate("/");
  };

  return (
    <section id="login" className="w-full">
      <p>Log In Componet </p>
      {!userState.dataUser ? (
        <p className="text-red-500 font-bold"> not user</p>
      ) : (
        <p>{userState.dataUser.displayName}</p>
      )}

      <hr />

      {/* {error && <Msg type="error" msg={error.message} />} */}
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-3 col-start-3">
          <form onSubmit={handleOnSubmit}>
            <Input
              onChange={handleChange}
              labelname="Your Email"
              name="email"
              value={formData.email}
              variant="email"
              required
              placeholder="Title o Question Here"
              type="email"
            />
            <Input
              onChange={handleChange}
              labelname="Your Password"
              name="password"
              value={formData.password}
              variant="text"
              required
              placeholder="Add your Password"
              type={showPassword ? "text" : "password"}
            />

            <div className="flex w-full flex-row justify-end mt-2 text-sm">
              <span
                //   href="#"
                onClick={() => setShowPassword((prevState) => !prevState)}
                className="flex justify-end text-sm font-semibold text-secundary hover:text-sec-hover cursor-pointer"
              >
                <MdVisibility
                  style={{
                    marginRight: ".5rem",
                    height: "1.5em",
                    width: "1.5em",
                  }}
                />
                Display password
              </span>
            </div>
            <Input
              onChange={handleChange}
              labelname="Display Name"
              name="userName"
              value={formData.userName}
              variant="text"
              required
              placeholder="choose your Display Name"
              type="text"
            />
            {isPending ? (
              <Buttons
                estilo="full"
                tamano="full"
                name="Loading..."
                background="primary"
                type="submit"
              ></Buttons>
            ) : (
              <Buttons
                estilo="full"
                tamano="full"
                name="Submit"
                background="primary"
                type="submit"
              ></Buttons>
            )}
          </form>
          <p className="my-10 text-center text-sm text-gray-500">
            Do you have an Account ?
            <Link
              to="/login"
              className="font-semibold text-secundary hover:text-sec-hover md:ml-4 hover:text-lg"
            >
              Go Back to Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
