import { useState, useEffect } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { db, query, collection, onSnapshot, where } from "../firebase/config";
import Paginacion from "./Paginacion";
import ImageGallery from "../styles/ImageGallery";

export default function MyCarousel({ usedCategoria }) {
	const [indexActive, setIndexActive] = useState(0);
	const [error, setError] = useState(null);
	const [documents, setDocuments] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	let pageSize = 6;
	const countPages = Math.ceil(documents.length / pageSize);
	const startIndex = currentPage * pageSize - pageSize;

	let activePage = [...documents].splice(startIndex, pageSize);

	const [numActive, setNumActive] = useState(0);

	useEffect(() => {
		const getCuentas = async () => {
			let ref = "";
			if (!usedCategoria) {
				ref = query(collection(db, "projects"));
			} else {
				ref = query(
					collection(db, "projects"),
					where("category", "==", usedCategoria),
					// limit(4)
				);
				setCurrentPage(1);
			}

			const unsubscribe = onSnapshot(
				ref,
				(snapshot) => {
					let results = [];
					snapshot.docs.forEach((doc) => {
						results.push({ ...doc.data(), id: doc.id });
					});

					// update state
					setDocuments(results);
					setError(null);
				},
				(error) => {
					console.log(error);
					setError("could not fetch the data");
				},
			);
			activePage = [...documents].splice(startIndex, pageSize);

			return () => unsubscribe();
		};
		getCuentas();
	}, [usedCategoria]);

	const handleclickThumbnail = (i) => {
		setIndexActive(i);
	};

	return (
		<div className='container w-full'>
			{error && (
				<div className='flex justify-center'>
					<div className='text-2xl text-red-700'>{error}</div>
				</div>
			)}
			{/* <!-- Full-width images with number text --> */}
			{documents.length <= 0 && (
				<div className='flex w-full justify-center'>
					<h1 className='text-center text-3xl'>Nothing here</h1>
				</div>
			)}
			<div className='relative flex items-center justify-center'>
				{/* **************  main imgae ***************** */}

				<div className=''>
					{activePage.map((doc, i) => (
						<div
							key={doc.id}
							className={i === indexActive ? "block" : "hidden"}
						>
							<div className='relative'>
								<Link state={doc} to={`/gallery/${doc.id}`}>
									<button className='absolute bottom-0 h-10 w-full cursor-pointer bg-black text-3xl text-white opacity-60'>
										Details
									</button>
								</Link>
								<div
									className={` ${doc.Imageorientation === "landscape" ? "lg:w-172 md:w-138 w-104" : "lg:w-118 md:w-104 w-90"}`}
								>
									<img
										style={{ height: "auto", maxWidth: "full" }}
										className={i === indexActive ? "block" : "hidden"}
										src={doc.photoURL}
										alt={doc.name}
										// style={{ width: "100%", height: "33rem" }}
									/>
								</div>
							</div>

							<div className='hidden flex-col items-center text-2xl md:flex'>
								<h3>{doc.name}</h3>
								<Rating value={doc.rating} />
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='my-2 flex flex-row justify-center'>
				<Paginacion
					countPages={countPages}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					numActive={numActive}
					setNumActive={setNumActive}
					setIndexActive={setIndexActive}
				/>
			</div>

			{/* <!-- Thumbnail images --> */}
			<div className='mt-3.5 flex items-center justify-center'>
				<div
					className='row-span-[80px] grid w-5/6 grid-cols-6 gap-2'
					data-thumbnail
				>
					{activePage.map((doc, i) => (
						<ImageGallery
							i={i}
							doc={doc}
							handleclickThumbnail={handleclickThumbnail}
							indexActive={indexActive}
							// className={
							// 	i === indexActive
							// 		? "demo cursor active m-auto"
							// 		: "demo cursor m-auto"
							// }
							src={doc.photoURL}
							key={doc.id}
						/>
						// <div className='aspect-square overflow-hidden bg-gray-100 rounded-lg'>
						// 	<img
						// 		className='h-auto max-w-full rounded-lg'
						// 		onClick={() => handleclickThumbnail(i, doc)}
						// 		key={doc.id}
						// 		// className={
						// 		// 	i === indexActive
						// 		// 		? "demo cursor active m-auto"
						// 		// 		: "demo cursor m-auto"
						// 		// }
						// 		src={doc.photoURL}
						// 		// style={{ width: "100%", maxHeight: "11rem" }}
						// 		alt={doc.name}
						// 	/>
						// </div>
					))}
				</div>
			</div>
		</div>
	);
}
