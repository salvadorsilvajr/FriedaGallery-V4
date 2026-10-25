import { useRef, useState, useEffect } from "react";
import { useKindUser } from "../hooks/useKindUser";
import ProfilePic from "../assets/profile.jpg";
import { ImProfile } from "react-icons/im";
import {
	userUpdatePro,
	updateUserPic,
	delOldUserPic,
} from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Back from "../components/Back";
import Button from "../styles/Button";
import Input from "../styles/Input";
import Image from "../styles/Imagen";

const Profile = () => {
	const { regularUser } = useKindUser();
	const navigate = useNavigate();
	const myPic = useRef();
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const [fileName, setFileName] = useState("");
	const [preview, setPreview] = useState("");
	const [FormData, setFormData] = useState({
		userId: "",
		displayName: "",
		photoURL: "",
		company: "",
		title: "",
	});

	useEffect(() => {
		if (regularUser) {
			setFormData({
				userId: regularUser.id,
				displayName: regularUser.displayName,
				photoURL: regularUser.photoURL,
				company: regularUser.company,
				title: regularUser.title,
			});
		}
	}, [regularUser]);

	const userOldPic = regularUser.photoRef;

	const { displayName, userId, photoURL, company, title } = FormData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		userUpdatePro(userId, displayName, company, title);
		if (file === null) {
			navigate("/");
		} else {
			delOldUserPic(userOldPic);
			updateUserPic(fileName, file, userId, setProgress);
			navigate("/");
		}
	};

	return (
		<>
			<Back />
			<main className='flex flex-row justify-center md:mt-25'>
				<section className='sm:w-0 lg:w-1/4'></section>
				<section className='min-h-[40%] w-dvw lg:w-2/4'>
					<div className='flex min-h-full flex-col justify-center px-6 py-8 md:py-0'>
						<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
							<h2 className='justify-center items-center text-center h-15 flex  flex-row font-Artifika text-2xl/9 text-gray-900'>
								Perfil <ImProfile size='40 ' className='ml-8' />
							</h2>
						</div>
						<div className='mt-10 sm:mx-auto sm:w-full md:w-120'>
							<form onSubmit={onSubmit} className='space-y-6'>
								{/* *****************  Linea *********************** */}
								<div className='flex justify-evenly'>
									{photoURL === "" ? (
										<div className='flex flex-col text-center'>
											<p>CURRENT</p>
											<Image variant='profile' src={ProfilePic} />
										</div>
									) : (
										<div className='flex flex-col text-center '>
											<p>CURRENT</p>
											<Image variant='profile' src={photoURL} />
										</div>
									)}

									{preview ? (
										<div className='flex flex-col text-center  '>
											<p>NEW</p>
											<Image variant='profile' src={preview} />
										</div>
									) : (
										<>
											<div className='flex flex-col text-center justify-center cursor-pointer'>
												<p>NEW</p>
												<Image
													onClick={(event) => {
														event.preventDefault();
														myPic.current.click();
													}}
													variant='profile'
													src={ProfilePic}
												/>
												<Input
													onChange={(event) => {
														const file = event.target.files[0];

														if (file && file.type.substr(0, 5) === "image") {
															setFile(file);
															setFileName(`${uuidv4()}-${file.name}`);
														} else {
															setFile(null);
														}
														if (file) {
															const reader = new FileReader();
															reader.onloadend = () => {
																const Base64 = reader.result;
																setPreview(Base64);
															};
															reader.readAsDataURL(file);
														} else {
															setPreview(null);
														}
													}}
													ref={myPic}
													accept='image/*'
													style={{ display: "none" }}
													labelname=''
													type='file'
													name='file'
													// value=''
													variant='text'
													required
													placeholder='Add your Name here'
												/>
												{/* *****************  Linea *********************** */}
												<div className='mt-4'>
													<progress value={progress} max='100' />
												</div>
											</div>
										</>
									)}
								</div>
								{/* *****************  Linea *********************** */}
								<Input
									onChange={onChange}
									labelname='Your Name'
									name='displayName'
									value={displayName}
									type='text'
									variant='text'
									required
									placeholder='Add your Name here'
								/>

								{/* *****************  Linea *********************** */}
								<Input
									onChange={onChange}
									labelname='Company'
									name='company'
									value={company}
									type='text'
									variant='text'
									// required
									placeholder='Name of your Company'
								/>

								{/* *****************  Linea *********************** */}
								<Input
									onChange={onChange}
									labelname='Your Title'
									name='title'
									value={title}
									type='text'
									variant='text'
									// required
									placeholder='Your Tittle there'
								/>

								<div>
									<Button name='Update Information' variant='secundary'>
										Primary Button
									</Button>
								</div>
							</form>
						</div>
					</div>
				</section>
				<section className='sm:w-0 lg:w-1/4'></section>
			</main>
		</>
	);
};

export default Profile;
