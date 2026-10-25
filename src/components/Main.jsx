import React from "react";
import Fonts from "./Basicos/Fonts";
import Buttons from "./Basicos/Buttons";

const Main = () => {
	return (
		<>
			<div className='min-h-32 bg-linear-to-r/longer from-primary/30 to-secundary/10'>
				<Fonts estilo='title' variant='secundary'>
					esto es un titulo
				</Fonts>
				<hr />
				<Buttons variant='primary' estilo='small'>
					primary
				</Buttons>
			</div>
			<div className='max-w-7xl mx-auto '>
				<div className='grid min-h-screen lg:grid-cols-[250px_1fr_250px] '>
					{/* <!-- Left Sidebar (Adjust size by changing 250px) --> */}
					<aside className='bg-gray-100 p-4 h-fit'>Left Sidebar </aside>

					{/* <!-- Main Center Area (Takes up remaining space) --> */}
					<main className='bg-white p-4 min-h-svh'>
						<Fonts estilo='subtitle' variant='primary'>
							Main Page
						</Fonts>
						<hr />
						<Fonts>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Aspernatur suscipit eligendi neque eaque explicabo, veritatis nam.
							Ipsum quos consectetur ullam debitis assumenda reprehenderit natus
							dolorum excepturi? Autem perspiciatis et ullam!
						</Fonts>
						<hr />
						<Fonts estilo='important'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Aspernatur suscipit eligendi neque eaque explicabo, veritatis nam.
							Ipsum quos consectetur ullam debitis assumenda reprehenderit natus
							dolorum excepturi? Autem perspiciatis et ullam!
						</Fonts>
					</main>

					{/* <!-- Right Sidebar (Adjust size by changing 300px) --> */}
					<aside className='bg-gray-100 p-4 h-fit'>Right Sidebar</aside>
				</div>
			</div>
		</>
	);
};

export default Main;
