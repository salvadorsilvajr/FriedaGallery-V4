import { useLogout } from "../hooks/useLogout";
import { useKindUser } from "../hooks/useKindUser";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ImUserPlus } from "react-icons/im";
import { GiShoppingCart } from "react-icons/gi";
import { MdContactPhone } from "react-icons/md";
import { updateDoc, doc, db } from "../firebase/config";
import profilePic from "../assets/profile.jpg";
import Enlace from "../styles/Enlace";
import Imagen from "../styles/Imagen";
import DropDownHeader from "../styles/DropDownHeader";

// needs for DropDoenMenu ************
import { MenuAdmin, MenuOptions } from "../data/dropdownOptios";
// needs for DropDoenMenu **********

export default function Header() {
	const navigate = useNavigate();
	const { admin, sameUser, regularUser } = useKindUser();

	const { logout } = useLogout();

	const logoutUser = async (e) => {
		e.preventDefault();
		navigate("/");
		// update online status
		await updateDoc(doc(db, "UsersTestCss", regularUser.id), {
			online: false,
		});
		logout();
		window.location.reload();
	};

	return (
		<header className=' header from-var(--color-bg-app) flex min-h-20 w-full flex-row items-center justify-between bg-radial-[at_50%_75%] via-primary to-secundary to-95% px-5 md:min-h-30 md:justify-around md:px-20'>
			<div className='w-14 md:w-22'>
				<Link to='/'>
					<Imagen variant='logo' src={Logo} alt='Frieda Silva' />
				</Link>
			</div>

			<div className='font-artifiko text-md text-text md:text-5xl xl:text-7xl hover:animate-bounce md:visible invisible '>
				Frieda Silva
			</div>

			<div className='flex'>
				<div className=' flex flex-col items-center justify-center'>
					<Enlace variant='NavMenu' name='Contact' to='/contact'>
						<div className=' flex flex-col items-center'>
							<MdContactPhone size='1.3rem' />
						</div>
					</Enlace>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<Enlace variant='NavMenu' name='Cart' to='/'>
						<div className='flex flex-col items-center'>
							<GiShoppingCart size='1.3rem' />
						</div>
					</Enlace>
				</div>

				{regularUser ? (
					<>
						<div className='relative flex flex-col justify-center'>
							<div className='m-auto pb-2'>
								<Imagen
									variant='user'
									src={
										regularUser.photoURL === null
											? profilePic
											: regularUser.photoURL
									}
									// src={profilePic}
									alt=''
									className='h-10 w-10 rounded-full object-cover'
								/>
							</div>
							{sameUser && admin ? (
								<DropDownHeader
									variant='NavMenu'
									name={regularUser.displayName}
									// name='Salvador'
									MenuOptions={MenuAdmin}
									logoutUser={logoutUser}
								></DropDownHeader>
							) : (
								<DropDownHeader
									variant='NavMenu'
									name={regularUser.displayName}
									// name='Salvador'
									MenuOptions={MenuOptions}
									logoutUser={logoutUser}
								></DropDownHeader>
							)}
						</div>
					</>
				) : (
					<div className='flex  justify-between text-text md:w-25'>
						<Enlace variant='NavMenu' name='Log In' to='/Login'>
							<div className='flex flex-col items-center'>
								<ImUserPlus size='1.3rem' />
							</div>
						</Enlace>
					</div>
				)}
			</div>
		</header>
	);
}
