import { useState, useRef } from "react";
// import Select from "react-select";

import { useAuthContext } from "../hooks/useAuthContext";
// import { AuthContextProvider } from "../context/AuthContext";
// import { useFirestore } from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
// import { Container, Button, Col, Form, Row } from "react-bootstrap";
import { Categories } from "../data/dropdownOptios";
import addImage from "../assets/addImage.png";
import { v4 as uuidv4 } from "uuid";
import { addDocument, updateGalleryPic } from "../hooks/useGallery";

import Back from "../components/Back";
import Input from "../styles/Input";
import Image from "../styles/Imagen";
import Textarea from "../styles/Textarea";
import Button from "../styles/Button";
import Select from "../styles/Select";
import { toast } from "react-toastify";

export default function Create() {
	const navigate = useNavigate();
	// const { addDocument, response } = useFirestore("projects");
	const { user } = useAuthContext();
	// console.log(user.displayName);

	const myPic = useRef();

	// form field values
	const [FormData, setFormData] = useState({
		PieceName: "",
		year: "2026",
		price: 100,
		countInStock: 1,
		details: "",
		category: "categories",
		rating: 0,
		Imageorientation: "",
		numReviews: 0,
		comments: [],
		createdBy: {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		},
	});

	// const [id, setId] = useState("");
	// const [category, setCategory] = useState("");

	const {
		PieceName,
		year,
		price,
		countInStock,
		details,
		category,
		Imageorientation,
	} = FormData;
	const [progress, setProgress] = useState(0);
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState("");
	const [preview, setPreview] = useState("");

	// const [formError, setFormError] = useState(null);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (category === "categories") {
			toast.warning("you need to Pick a Category");
			return;
		}
		if (Imageorientation === "") {
			toast.warning("you need to choose the Image Orientation");
			return;
		}
		if (!file) {
			toast.warning("you need to Pick an Image");
			return;
		}
		addDocument(FormData, fileName, file, setProgress);
		navigate("/");
		// console.log(id);
		// if (file === null) {
		// 	navigate("/");
		// } else {
		// 	console.log(id);
		// 	// delOldProjectPic(userOldPic, setId);
		// 	updateGalleryPic(fileName, file, id, setProgress);
		// }
	};

	return (
		<>
			<Back />
			<main className='flex flex-row justify-center md:mt-5'>
				<section className='sm:w-0 lg:w-1/4'></section>
				<section className='min-h-[40%] w-dvw lg:w-2/4'>
					<div className='flex min-h-full flex-col justify-center px-6 py-8 md:py-0'>
						<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
							<h2 className=' text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
								Create a New Piece
							</h2>
						</div>

						<div className='mt-10 sm:mx-auto sm:w-full md:w-120'>
							<form onSubmit={onSubmit} className='space-y-6'>
								{/* *****************  Linea *********************** */}
								<Input
									onChange={onChange}
									labelname='Name of new Piece'
									name='PieceName'
									value={PieceName}
									variant='text'
									required
									placeholder='Name of new Piece'
									type='text'
								/>
								{/* *****************  Linea *********************** */}
								{preview ? (
									<div className='flex flex-col text-center  '>
										<p>Image to add</p>
										<Image
											style={{ margin: "auto" }}
											variant='art{iece'
											src={preview}
										/>
									</div>
								) : (
									<>
										<div className='flex flex-col text-center justify-center cursor-pointer'>
											<p className='font-bold text-center tracking-wider mb-1.5'>
												Image must be less 700kb preferable 1080 X 720 pixels
												landscape or 800 X 1000 pixels portrail
											</p>
											<Image
												style={{ margin: "auto" }}
												onClick={(event) => {
													event.preventDefault();
													myPic.current.click();
												}}
												variant='artPice'
												src={addImage}
											/>
											<Input
												onChange={(event) => {
													const file = event.target.files[0];
													if (!file) {
														toast.error("Please select a file");
														return;
													}
													if (!file.type.includes("image")) {
														toast.error(
															"Selected file must be and image Moron!",
														);
														return;
													}
													if (file.size > 700000) {
														toast.error(
															"Image file size must be less than 700kb",
														);
														return;
													}
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
												variant='image'
												// required
												placeholder='Add your Name here'
											/>
											{/* *****************  Linea *********************** */}
											<div className='mt-4'>
												<progress value={progress} max='100' />
											</div>
										</div>
									</>
								)}

								{/* *********** line of Form ******** */}
								<div className='flex w-full justify-around'>
									<div className='flex items-center mb-4'>
										<input
											onChange={onChange}
											id='Imageorientation'
											type='radio'
											value='landscape'
											name={Imageorientation}
											className='w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none'
										/>
										<label
											htmlFor='Imageorientation'
											className='select-none ms-2 text-sm font-medium text-heading'
										>
											Landscape
										</label>
									</div>
									<div className='flex items-center'>
										<input
											onChange={onChange}
											id='Imageorientation'
											type='radio'
											value='portrait'
											name={Imageorientation}
											className='w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none'
										/>
										<label
											htmlFor='Imageorientation'
											className='select-none ms-2 text-sm font-medium text-heading'
										>
											Portrait
										</label>
									</div>
								</div>

								{/* *********** line of Form ******** */}
								<div className='flex w-full justify-around'>
									<Select
										setFormData={setFormData}
										value={category}
										variant='select'
										name={category}
										MenuOptions={Categories}
									></Select>
								</div>

								{/* *********** line of Form ******** */}
								<div className='flex w-full justify-around'>
									<div className='w-[30%]'>
										<Input
											onChange={onChange}
											labelname='Price'
											name='price'
											value={price}
											variant='text'
											required
											placeholder='Price'
											type='text'
										/>
									</div>
									<div className='w-[20%]'>
										<Input
											onChange={onChange}
											labelname='Year '
											name='year'
											value={year}
											variant='text'
											required
											placeholder='Year'
											type='text'
										/>
									</div>
									<div className='w-[30%]'>
										<Input
											onChange={onChange}
											labelname='Qty Stock'
											name='countInStock'
											value={countInStock}
											variant='text'
											required
											placeholder='Quantity'
											type='text'
										/>
									</div>
								</div>
								{/* *********** line of Form ******** */}
								<Textarea
									onChange={onChange}
									labelname='Description'
									name='details'
									value={details}
									variant='text'
									required
									placeholder='All Information about this piece'
									type='text'
								/>

								<div>
									<Button name='Add new Piece to Gallery' variant='secundary'>
										Primary Button
									</Button>
								</div>
							</form>
							{/* {formError && <p className='error'>{formError}</p>} */}
						</div>
					</div>
				</section>
				<section className='sm:w-0 lg:w-1/4'></section>
			</main>
		</>
	);
}
