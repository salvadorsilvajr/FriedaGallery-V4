import Back from "../components/Back";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { useKindUser } from "../hooks/useKindUser";
import { Ratings } from "../data/dropdownOptios";
// import Enlace from "../styles/Enlace";
import Select from "../styles/Select";
import Rating from "../components/Rating";
// import Button from "../styles/Button";
import { useState } from "react";
import { validate } from "uuid";

export default function GalleryDetails() {
	const location = useLocation();
	const Piece = location.state;
	const { admin, sameUser, regularUser } = useKindUser();
	const [rate, setRate] = useState(Ratings[0]);

	// console.log(newrate);
	const handleEdit = () => {
		console.log("Edit");
	};

	const updateRate = (e) => {
		const newRate = e.target.innerText;
		switch (newRate) {
			case "Bad":
				setRate({
					id: 1,
					name: "bad",
					value: 100,
					label: newRate,
					userId: regularUser.id,
				});
				break;
			case "Fair":
				setRate({
					id: 2,
					name: "fair",
					value: 200,
					label: newRate,
					userId: regularUser.id,
				});
				break;
			case "Good":
				setRate({
					id: 3,
					name: "good",
					value: 300,
					label: newRate,
					userId: regularUser.id,
				});
				break;
			case "VeryGood":
				setRate({
					id: 4,
					name: "verygood",
					value: 400,
					label: newRate,
					userId: regularUser.id,
				});
				break;
			case "Excellent":
				setRate({
					id: 5,
					name: "excellebt",
					value: 500,
					label: newRate,
					userId: regularUser.id,
				});
				break;

			default:
				return;
		}
	};

	console.log(rate);

	const handleDelete = () => {
		console.log("Delete");
		// deleteDocument(Piece.id);
		// deleteImg(Piece);
		// navigate("/gallery");
	};

	return (
		<main className='flex flex-col justify-center lg:flex-row'>
			<section className='lg:w-1/8'>left Section</section>
			<section className='lg:w-6/8'>
				<Back BackTo='../' />
				<div className='mx-2 flex justify-end p-2'>
					<div className='flex mr-2 justify-end'>
						{!admin && (
							<div
								onClick={handleEdit}
								className='mr-3 cursor-pointer w-14 flex flex-col justify-center text-center'
							>
								<span className='text-xs lg:text-lg'>Add to</span>
								<div className=' flex flex-col items-center'>
									<GiShoppingCart color='#48b548' size='1.5rem' />
								</div>
							</div>
						)}
						{admin && (
							<>
								<div
									onClick={handleEdit}
									className='mr-3 cursor-pointer w-14 flex flex-col justify-center text-center'
								>
									<span className='md:visible invisible '>Edit</span>
									<div className='m-2 flex flex-col items-center'>
										<FaRegEdit color='#48b548' size='1.5rem' />
									</div>
								</div>
								<div
									onClick={handleDelete}
									className='cursor-pointer w-14 flex flex-col justify-center text-center'
								>
									<span className='md:visible invisible '>Delete</span>
									<div className='m-2 flex flex-col items-center'>
										<MdDeleteForever color='red' size='1.5rem' />
									</div>
								</div>
							</>
						)}
					</div>
				</div>

				<div className='flex flex-col justify-center lg:flex-row '>
					<div
						className={` ${Piece.Imageorientation === "landscape" ? "mx-6 lg:w-8/8" : "mx-10 md:mx-34 lg:w-4/8"}`}
					>
						<img src={Piece.photoURL} alt={Piece.name} />
						<div
							className={` ${!sameUser ? "flex justify-center" : "flex justify-between"}`}
						>
							<Rating tamano='2.5em' value={Piece.rating} />
							{sameUser && (
								<div>
									<Select
										onClick={updateRate}
										setFormData={setRate}
										value={rate}
										variant='select'
										name={rate.label}
										MenuOptions={Ratings}
									></Select>
								</div>
							)}
						</div>
					</div>
					<div
						className={` ${Piece.Imageorientation === "landscape" ? "lg:w-8/8" : " lg:w-4/8"}`}
					>
						<div className='flex flex-col justify-center'>
							<div className='flex  justify-center font-Artifika md:text-2xl text-lg my-2 tracking-widest'>
								<span>{Piece.PieceName}</span>
							</div>
							<div className='flex  justify-center font-Artifika md:text-lg text-md my-2 tracking-widest'>
								<span>{Piece.details}</span>
							</div>
							<div className='flex  justify-around font-Artifika md:text-lg text-md my-2 tracking-widest'>
								<div>
									<span>$ {Piece.price}</span>
								</div>
								<div>
									<span>Reviews {Piece.numReviews}</span>
								</div>
							</div>
							<div className='flex  justify-around font-Artifika md:text-lg text-md my-2 tracking-widest'>
								<div>
									{Piece.countInStock > 0 ? (
										<span className='flex flex-row'>
											On Stuck:
											<p className='font-bold text-xl text-green-700 ml-2'>
												{Piece.countInStock}
											</p>
										</span>
									) : (
										<span className='flex flex-row'>
											On Stuck : <p className='text-red-600 ml-2'>SOLD</p>
										</span>
									)}
									{/* <span>On Stuck - {Piece.countInStock}</span> */}
								</div>
								<div>
									<span>Year {Piece.year}</span>
								</div>
							</div>
							<div className='flex  justify-center font-Artifika md:text-lg text-md my-2 tracking-widest'>
								<span>** Comments **</span>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='lg:w-1/8 lg:visible invisible '>
				<div className='text-center'>Active Users</div>
			</section>
		</main>
	);
}
