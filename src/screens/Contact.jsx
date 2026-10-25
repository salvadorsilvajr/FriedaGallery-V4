import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Back from "../components/Back";
import { toast } from "react-toastify";
import { createNewInfoRequest } from "../hooks/otherFuntioins";
import Button from "../styles/Button";
import Input from "../styles/Input";
import Textarea from "../styles/Textarea";
import SocialMedia from "../components/SocialMEdia";

export default function InfoPrices() {
	const { user } = useAuthContext();

	const [FormData, setFormData] = useState({
		nombre: "",
		question: "",
		email: "",
		comment: "",
		userPic: user ? user.photoURL : "",
	});

	const { nombre, question, comment, email } = FormData;

	const navigate = useNavigate();

	let formatPhoneNumber = (str) => {
		//Filter only numbers from the input
		let cleaned = ("" + str).replace(/\D/g, "");

		//Check if the input is of correct length
		let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

		if (match) {
			return "(" + match[1] + ") " + match[2] + "-" + match[3];
		}

		return null;
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,

			[e.target.id]: e.target.value,
		}));
	};

	const sendNotification = async (e) => {
		e.preventDefault();

		toast.success(
			"Gracias por contactaenos Alguin se comunicara a la brevedad  ... !",
		);
		createNewInfoRequest(FormData, formatPhoneNumber);

		setFormData(() => ({
			nombre: "",
			question: "",
			email: "",
			comment: "",
			// telefono: "",
		}));
		const myTimeout = setTimeout(getHome, 2000);

		function getHome() {
			clearTimeout(myTimeout);
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
							<SocialMedia />
							<h2 className='mt-10 text-center font-Artifika text-2xl/9 text-gray-900'>
								Contact Me
							</h2>
						</div>
						<div className='mt-10 sm:mx-auto sm:w-full md:w-120'>
							<form onSubmit={sendNotification}>
								{/* *****************  Linea *********************** */}
								<Input
									onChange={onChange}
									labelname='Your Name'
									name='nombre'
									value={nombre}
									variant='text'
									required
									placeholder='Add your Name here'
									type='text'
								/>

								{/* *****************  Linea *********************** */}
								<Input
									onChange={onChange}
									labelname='Company Title or Question'
									name='question'
									value={question}
									variant='text'
									required
									placeholder='Title o Question Here'
									type='text'
								/>
								{/* *****************  Linea *********************** */}
								<Input
									onChange={onChange}
									labelname='Your Email'
									name='email'
									value={email}
									variant='email'
									required
									placeholder='Title o Question Here'
									type='email'
								/>

								{/* *****************  Linea *********************** */}
								<Textarea
									onChange={onChange}
									labelname='Comments'
									name='comment'
									value={comment}
									variant='text'
									required
									placeholder='Add your Comment here 300 caracters...'
									type='text'
								/>

								<div className='w-full'>
									<Button name='Send Request' variant='secundary'>
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
}
