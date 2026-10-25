import { Categories } from "../data/dropdownOptios";
import Button from "../styles/Button";
// console.log(Categories);

export default function MainMenu({ setUseCategoria, usedCategoria }) {
	return (
		<div>
			<ul className='my-2 flex flex-row justify-center px-2 lg:flex-col'>
				{Categories.map((categoria) => (
					<li
						onClick={() => setUseCategoria(categoria.name)}
						key={categoria.id}
						className='mx-2 my-1'
					>
						<Button name={categoria.name} variant='primary'>
							{categoria.name}
						</Button>
					</li>
				))}
				{usedCategoria !== null && (
					<li onClick={() => setUseCategoria(null)} className='mx-2 my-1'>
						<Button name='All' variant='primary'>
							All
						</Button>
					</li>
				)}
			</ul>
		</div>
	);
}
