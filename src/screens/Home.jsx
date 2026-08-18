import MainMenu from "../components/MainMenu";
import MyCarousel from "../components/MyCarousel";
import { useState } from "react";

function Home() {
	const [usedCategoria, setUseCategoria] = useState(null);

	return (
		<main className='flex flex-col justify-center lg:flex-row'>
			<section className='lg:w-1/8'>
				<MainMenu
					setUseCategoria={setUseCategoria}
					usedCategoria={usedCategoria}
				/>
			</section>
			{/* <section className='lg:w-6/8'> */}
			<MyCarousel usedCategoria={usedCategoria} />
			{/* </section> */}
			<section className='lg:w-1/8'>Right Section</section>
		</main>
	);
}

export default Home;
