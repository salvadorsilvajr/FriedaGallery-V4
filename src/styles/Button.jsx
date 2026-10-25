import { FaGooglePlusG } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

export default function Button({
	// children,
	name,
	variant = "secundary",
	Google,
	Face,

	...props
}) {
	const baseStyles = " flex justify-center rounded-xl cursor-pointer";

	const variants = {
		primary:
			"flex min-w-[80px] justify-center rounded-md bg-emerald-50 px-1 py-1.5 text-xs font-bold text-(--color-secundary) shadow-xs hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-secundary) md:text-lg lg:px-3",
		secundary:
			"mt-5 inline-block w-full text-white uppercase text-base tracking-[0.15rem] transition-all duration-300  relative overflow-hidden z-1 px-3 py-3  after:content-[] after:absolute after:w-full after:h-full after:bg-secundary after:z-[-2]  after:left-0 after:bottom-0 before:content-[] before:absolute before:w-[0%] before:h-full before:bg-sec-hover before:transition-all before:duration-300 before:z-[-1]  before:left-0 before:bottom-0 hover:before:w-full",

		SignInMedia:
			"m-2 flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundary ",
	};

	const combinedStyles = `${baseStyles} ${variants[variant]}`;
	return (
		<button {...props} className={combinedStyles}>
			{name}
			{Google && (
				<>
					<span>
						<FaGooglePlusG color='#d50f25' size={"3rem"} />
					</span>
					<p className='ml-3 text-xs text-amber-400 md:text-2xl'>
						{" "}
						Sign in with Google
					</p>
				</>
			)}
			{Face && (
				<>
					<span>
						<FaFacebookSquare color='#fff' size={"3rem"} />
					</span>
					<p className='ml-3 text-xs text-white md:text-2xl'>
						{" "}
						Sign in with Facebook
					</p>
				</>
			)}

			{/* {children} */}
			{/* <span className='md:visible invisible '>{name}</span> */}
		</button>
	);
}
