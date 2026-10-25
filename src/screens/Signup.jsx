import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
// import { useAuthContext } from "../hooks/useAuthContext";
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
	const [displayName, setDisplayName] = useState("");

	// const [faceUser, setFaceUser] = useState(null);

	const { signup, isPending, error } = useSignup();
	const [showPassword, setShowPassword] = useState(false);
	// const [userDetails, setUserDetails] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(email, password, displayName);
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
								Create a New Account
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
									// onChange={(e) => setEmail(e.target.value)}
									// type='email'
									// name='Email Address'
									// variant='email'
									// placeholder='youremail@gmail.com'
								/>
								{/* </div> */}

								<>
									{/* <div className='mt-2'> */}
									<Input
										style={{ marginBottom: "1px" }}
										onChange={(e) => setPassword(e.target.value)}
										name='password'
										value={password}
										labelname='Password'
										type={showPassword ? "text" : "password"}
										variant='text'
										placeholder='enter your Password'
										// onChange={(e) => setPassword(e.target.value)}
										// name='Password'
										// type={showPassword ? "text" : "password"}
										// variant='text'
										// placeholder='enter your Password'
									/>
									<div className='flex w-full flex-row justify-end  text-sm'>
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
									{/* <div className='mt-2'> */}
									<Input
										onChange={(e) => setDisplayName(e.target.value)}
										name='displayName'
										type='text'
										value={displayName}
										labelname='Display Name'
										variant='text'
										placeholder='Choose your Display Name'
										// onChange={(e) => setDisplayName(e.target.value)}
										// type='displayName'
										// name='Display Name'
										// variant='text'
										// placeholder='Choose Your Display Name'
									/>
									{/* </div> */}
								</>

								<div className='w-full'>
									{isPending ? (
										<Button type='submit' name='Loading...' />
									) : (
										<Button type='submit' name='Create new Account' />
									)}
								</div>
							</form>

							<p className='my-10 text-center text-sm text-gray-500'>
								Do you have an Account ?
								<Link
									to='/login'
									className='font-semibold text-secundary hover:text-sec-hover md:ml-4 hover:text-lg'
								>
									Go Back to Log In
								</Link>
							</p>
						</div>
					</div>
				</section>
				<section className='sm:w-0 lg:w-1/4'></section>
			</main>
		</>
	);
}
