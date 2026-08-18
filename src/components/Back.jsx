import { FaBackward } from "react-icons/fa6";
import Enlace from "../styles/Enlace";

export default function Back({ BackTo = "/" }) {
	return (
		<div className='flex'>
			<Enlace variant='Back' name='BACK' iconname='Lover' to={BackTo}>
				<div className='flex flex-col items-center'>
					<FaBackward />
				</div>
			</Enlace>
		</div>
	);
}
