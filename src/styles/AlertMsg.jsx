import { updateNewInfoRequest } from "../hooks/otherFuntioins";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Imagen from "./Imagen";

const AlertMsg = ({ infoRequest }) => {
	const [show, setShow] = useState(true);
	const updateinfoRew = (inforeq) => {
		updateNewInfoRequest(inforeq.id, setShow);
	};

	return (
		<>
			<div className='flex justify-center'>
				{infoRequest.map((inforeq) => (
					<div
						key={inforeq.id}
						className='w-70 bg-white text-text ring-2   ring-secundary p-3 m-2'
					>
						<div className='flex justify-between'>
							<strong>{inforeq.nombre}</strong>

							<strong>
								<FaRegWindowClose
									onClick={() => updateinfoRew(inforeq)}
									show={show.toString()}
									className='text-danger cursor-pointer'
									size={22}
								/>{" "}
							</strong>
						</div>
						<hr />
						<div>
							<p> {inforeq.question} </p>
						</div>
						<div>
							{inforeq.userPic && (
								<Imagen
									variant='user'
									// style={{ marginRight: ".8em" }}
									// className='header-user-pic'
									src={inforeq.userPic}
									alt=''
								/>
							)}

							<p>{inforeq.email}</p>
							{/* <p>
								<strong>{inforeq.telefono}</strong>
							</p> */}
							<strong>{inforeq.comment}</strong>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default AlertMsg;
