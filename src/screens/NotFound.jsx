import Back from "../components/Back";

export default function NotFound() {
	return (
		<>
			<Back />
			<section>
				<div className='mx-auto mt-18 flex h-70 w-2xs xl:w-6xl justify-center rounded-xl bg-yellow-300 md:h-100 md:w-2xl'>
					<div className='flex flex-col justify-center text-center text-danger'>
						<div className='text-3xl font-semibold tracking-wide md:text-7xl'>
							Oops !!!!
						</div>
						<span className='mt-1 block text-2xl leading-tight font-medium text-black md:text-5xl'>
							404 - Page Not Found!
						</span>
					</div>
				</div>
			</section>
		</>
	);
}
