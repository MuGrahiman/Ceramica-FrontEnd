import React from 'react'
import AuthLayout from '../../components/AuthLayout';

const Mail = () => {
    return (
		<AuthLayout>
			<div className=" text-center">
				<header className="mb-8">
					<h1 className="text-2xl font-bold mb-1">Enter your Mail</h1>
				
				</header>
				<form >
			<div className="mb-4">
			
				<input
					// {...register("email", { required: true })}
					type="email"
					name="email"
					id="email"
					placeholder="Email Address"
					className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
				/>
			</div>
			<div>
				<button className="w-full flex flex-wrap gap-1 items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
					{/* {btnText} */}enter
				</button>
			</div>
		</form>
				
			</div>
		</AuthLayout>
	);
}

export default Mail
