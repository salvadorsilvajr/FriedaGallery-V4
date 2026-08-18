import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useGoogle } from "../hooks/useGoogle";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useFacebook } from "../hooks/useFacebook";
import { useNavigate, Link } from "react-router-dom";
import { MdVisibility } from "react-icons/md";
import Back from "../components/Back";
import Input from "../styles/Input";
import Button from "../styles/Button";

export default function Login() {
	// const { user } = useAuthContext();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// const [faceUser, setFaceUser] = useState(null);

	const { login, error, isPending } = useLogin();
	const { signinwithgoogle } = useGoogle();
	const { signinwithfacebook } = useFacebook();
	const [showPassword, setShowPassword] = useState(false);
	// const [userDetails, setUserDetails] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
		navigate("/");
	};

	const HandlegoogleSignIn = () => {
		signinwithgoogle();
		// toast.success(" user logged in Successfully", {
		// 	position: "top-center",
		// });
		navigate("/");
	};
	const HandlefacebookignIn = () => {
		signinwithfacebook();
		// checkifuserExist(signinwithfacebook);

		// toast.success(" user logged in Successfully", {
		// 	position: "top-center",
		// });
		navigate("/");
	};

	return (
		<>
			<Back />
			{error && (
				<div>
					<button className='flex w-full rounded-md bg-red-600 text-amber-300'>
						<span className='m-auto text-lg font-bold'>{error.message}</span>
					</button>
				</div>
			)}
			<main className='flex flex-row justify-center md:mt-25'>
				<section className='sm:w-0 lg:w-1/4'></section>
				<section className='min-h-[40%] w-dvw lg:w-2/4'>
					<div className='flex min-h-full flex-col justify-center px-6 py-8 md:py-0'>
						<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
							<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
								Sign in to your account
							</h2>
						</div>

						<div className='mt-10 sm:mx-auto sm:w-full md:w-120'>
							<form onSubmit={handleSubmit}>
								{/* <div className='mt-2'> */}
								<Input
									onChange={(e) => setEmail(e.target.value)}
									name='email'
									type='email'
									value={email}
									labelname='Email Address'
									variant='email'
									placeholder='youremail@gmail.com'
								/>
								{/* </div> */}

								{/* <div> */}
								{/* <div className='mt-2'> */}
								<Input
									onChange={(e) => setPassword(e.target.value)}
									name='password'
									value={password}
									labelname='Password'
									type={showPassword ? "text" : "password"}
									variant='text'
									placeholder='enter your Password'
								/>
								<div className='flex w-full flex-row justify-end mt-2 text-sm'>
									<span
										//   href="#"
										onClick={() => setShowPassword((prevState) => !prevState)}
										className='flex justify-end text-sm font-semibold text-secundary hover:text-sec-hover cursor-pointer'
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
								{/* </div> */}
								{/* </div> */}

								<div className='w-full'>
									{isPending ? (
										<Button
											variant='secundary'
											type='submit'
											name='Loading...'
										/>
									) : (
										<Button variant='secundary' type='submit' name='Sign In' />
									)}
								</div>
							</form>

							<p className='my-10 text-center text-sm text-gray-500'>
								Not a member?
								<Link
									to='/signup'
									className='font-semibold text-secundary hover:text-sec-hover md:ml-4 hover:text-lg'
								>
									Start here Create an Account
								</Link>
							</p>
							<div className='my-4 flex justify-center justify-items-center'>
								<Button
									onClick={HandlegoogleSignIn}
									variant='SignInMedia'
									Google={true}
								></Button>
								<Button
									onClick={HandlefacebookignIn}
									variant='SignInMedia'
									Face={true}
								></Button>
							</div>
						</div>
					</div>
				</section>
				<section className='sm:w-0 lg:w-1/4'></section>
			</main>
		</>
	);
}
