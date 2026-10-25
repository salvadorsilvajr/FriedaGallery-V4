const Paginacion = ({
	setCurrentPage,
	currentPage,
	countPages,
	setIndexActive,
}) => {
	const prevPage = currentPage - 1;
	const nextPage = currentPage + 1;

	const moveNextPage = () => {
		if (nextPage <= countPages) {
			setCurrentPage(currentPage + 1);
			setIndexActive(0);
		}
	};
	const movePrevPage = () => {
		if (prevPage >= 1) {
			setCurrentPage(currentPage - 1);
			setIndexActive(0);
		}
	};

	// ******** create an array from the number of pages ******

	const pages = Array.from({ length: countPages }, (_, i) => i + 1);

	// ******** create an array from the number of pages ******

	return (
		<>
			<a
				onClick={movePrevPage}
				className='mr-6 w-auto cursor-pointer bg-gray-200 p-2 text-lg font-bold text-zinc-500 hover:bg-gray-400 md:top-35 lg:top-50'
			>
				&#10094; page
			</a>
			<ul className='flex min-w-2 flex-row items-center'>
				{pages.map((page) => (
					<li
						key={page}
						onClick={() => {
							(setCurrentPage(page), setIndexActive(0));
						}}
						style={{
							// backgroundColor: "red",
							width: "1.7rem",
							height: "2rem",
							textAlign: "center",
							cursor: "pointer",
							border: "1px solid gray",
						}}
						className={currentPage === page ? "activepage" : ""}
					>
						{page}
					</li>
				))}
			</ul>
			<a
				onClick={moveNextPage}
				className='ml-6 w-auto cursor-pointer bg-gray-200 p-2 text-lg font-bold text-zinc-500 hover:bg-gray-400 md:top-35 lg:top-50'
			>
				page &#10095;
			</a>
		</>
	);
};

export default Paginacion;
