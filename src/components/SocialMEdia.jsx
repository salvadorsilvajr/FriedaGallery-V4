import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
// import "./SocialMedia.css";

const SocialMedia = () => {
	return (
		<section className='redes-sociales p-5 text-white text-center w-4.2 text-5xl mx-3.5 rounded-6 py-1.5'>
			<div className='contenedor flex justify-center'>
				<a
					className='facebook p-1 mr-3'
					rel='noopener noreferrer'
					href='https://www.facebook.com/profile.php?id=100083307700773'
					target='_blank'
				>
					{/* <i className='fab fa-facebook-square'></i> */}
					<FaFacebookSquare />
				</a>

				<a
					className='instagram p-1 mr-3'
					rel='noopener noreferrer'
					href='https://www.instagram.com/friedagallery.com2/'
					target='_blank'
				>
					<i className='fab fa-instagram-square'></i>
					<FaSquareInstagram />
				</a>
				<a
					className='linkedln p-1 mr-2'
					rel='noopener noreferrer'
					href='#!'
					//   target='_blank'
				>
					{/* <i className='fab fa-linkedin'></i> */}
					<FaLinkedin />
				</a>
			</div>
		</section>
	);
};

export default SocialMedia;
