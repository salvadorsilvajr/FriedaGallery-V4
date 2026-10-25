<<<<<<< HEAD
import MainMenu from "../components/MainMenu";
import MyCarousel from "../components/MyCarousel";
import { useState } from "react";

function Home() {
  const [usedCategoria, setUseCategoria] = useState(null);

  return (
    <main className="flex flex-col justify-center lg:flex-row">
      <section className="lg:w-1/8">
        <MainMenu
          setUseCategoria={setUseCategoria}
          usedCategoria={usedCategoria}
        />
      </section>
      {/* <section className='lg:w-6/8'> */}
      <MyCarousel usedCategoria={usedCategoria} />
      {/* </section> */}
      <section className="lg:w-1/8">Right Sectionn</section>
    </main>
  );
}
=======
import React from "react";
import Card from "../components/Card/Card.jsx";
import CardBody from "../components/Card/CardBody";
import CardFooter from "../components/Card/CardFooter";
import CardHeader from "../components/Card/CardHeader";
import CardImage from "../components/Card/CardImage";
import CardTitle from "../components/Card/CardTitle";
import { cardsData } from "../data/cardsData";

const Home = () => {
	return (
		<div className='min-h-screen bg-linear-to-br from-gray-50 to-gray-400 p-8'>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-12'>
					<h1 className='text-5xl font-bold text-gray-800 mb-4'>
						Travel Destinations
					</h1>
					<p className='text-xl text-gray-600'>
						Reusable Card Component with Dynamic Data
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{cardsData.map((card) => (
						<Card
							key={card.id}
							variant={card.id % 2 === 0 ? "primary" : "default"}
							padding='none'
						>
							{card.image && <CardImage src={card.image} alt={card.title} />}
							<div className='p-6'>
								<CardHeader>
									{card.category && (
										<span className='inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-2'>
											{card.category}
										</span>
									)}
									<CardTitle
										className={card.id % 2 === 0 ? "text-blue-800" : ""}
									>
										{card.title}
									</CardTitle>
									{card.rating && (
										<div className='flex items-center gap-1'>
											<span className='text-yellow-500'>★</span>
											<span>{card.rating} / 5.0</span>
										</div>
									)}
								</CardHeader>
								{card.description ? (
									<CardBody
										className={card.id % 2 === 0 ? "text-blue-700" : ""}
									>
										{card.description}
									</CardBody>
								) : (
									<CardBody className='text-gray-400 italic'>
										No description for this destination
									</CardBody>
								)}
								<CardFooter
									className={card.id % 2 === 0 ? "border-blue-200" : ""}
								>
									<div className='flex items-center justify-between'>
										{card.price ? (
											<span className='text-2xl font-bold text-gray-800'>
												{card.price}
											</span>
										) : (
											<span className='text-gray-500 text-sm'>
												Contact for pricing
											</span>
										)}
										<button className='px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
											Book Now
										</button>
									</div>
								</CardFooter>
							</div>
						</Card>
					))}
				</div>
				<div className='mt-16'>
					<Card variant='dark' padding='large'>
						<h2 className='text-3xl font-bold mb-4'>Project Structure</h2>
						<div className='space-y-3 text-gray-300 font-mono text-sm'>
							<p>📁 src/</p>
							<p className='ml-4'>📁 components/</p>
							<p className='ml-8'>📁 Card/</p>
							<p className='ml-12'>📄 Card.jsx - Main card wrapper</p>
							<p className='ml-12'>📄 CardHeader.jsx - Header section</p>
							<p className='ml-12'>📄 CardTitle.jsx - Title component</p>
							<p className='ml-12'>📄 CardBody.jsx - Body content</p>
							<p className='ml-12'>📄 CardFooter.jsx - Footer section</p>
							<p className='ml-12'>📄 CardImage.jsx - Image with fallback</p>
							<p className='ml-4'>📁 data/</p>
							<p className='ml-8'>📄 cardsData.js - Sample data</p>
							<p className='ml-4'>📄 App.jsx - Main application</p>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};
>>>>>>> 34f1a434b99a1ec25e9eeeb09af0c4aa6da57e2d

export default Home;
