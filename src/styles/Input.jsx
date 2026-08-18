export default function Input({
	// children,
	labelname,
	name,
	value,
	type,
	variant = "text",
	placeholder = "name of the input",
	...props
}) {
	const baseStyles = " block w-full rounded-md bg-white md:text-lg text-xs";

	const variants = {
		text: "px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-2 focus:-outline-offset-2 focus:outline-secundary focus:invalid:border-pink-500 focus:invalid:outline-pink-500 ",

		email:
			"px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-2 focus:-outline-offset-2 focus:outline-secundary focus:invalid:border-pink-500 focus:invalid:outline-pink-500",

		image:
			"px-3 py-1.5 text-base text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 invalid:border-pink-500 invalid:text-pink-600 ",
	};

	const combinedStyles = `${baseStyles} ${variants[variant]}`;
	return (
		// note the first and last 2 lines are for set the format in page you want the input

		// <div className='mt-10 sm:mx-auto sm:w-full md:w-120]'>
		// <form onSubmit={handleSubmit} className='space-y-6'>
		// *********************************************
		<div className='w-full'>
			<label
				htmlFor={name}
				className='block text-sm/6 font-medium text-gray-900'
			>
				{labelname}
				<input
					id={name}
					type={type}
					name={name}
					value={value || ""}
					placeholder={placeholder}
					// required
					autoComplete='true'
					className={combinedStyles}
					{...props}
				>
					{/* {children} */}
					{/* <span className='md:visible invisible '>{name}</span> */}
				</input>
			</label>
		</div>

		// note the first and last 2 lines are for set the format in page you want the input

		// </form>
		// </div>
		// ********************************************
	);
}
