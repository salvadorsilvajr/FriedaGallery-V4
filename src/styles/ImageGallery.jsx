export default function ImageGallery({
	src,
	handleclickThumbnail,
	i,
	doc,
	indexActive,
}) {
	return (
		<div className='aspect-square overflow-hidden bg-gray-100 rounded-lg'>
			<img
				onClick={() => handleclickThumbnail(i, doc)}
				src={src}
				style={{ height: "auto", maxWidth: "full", borderRadius: ".5rem" }}
				// className='h-auto max-w-full rounded-lg '
				className={
					i === indexActive
						? "demo cursor active m-auto "
						: "demo cursor m-auto"
				}
			>
				{/* {children} */}
				{/* <span className='md:visible invisible '>{name}</span> */}
			</img>
		</div>
	);
}
