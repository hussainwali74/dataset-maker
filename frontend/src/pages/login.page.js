import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"

const LoginPage = () => {
	const history = useHistory()
	const [form, setForm] = useState({ email: "", password: "" })
	const [isSubmitting, setIsSubmitting] = useState(false)

	const onHandleSubmit = async (e) => {
		e.preventDefault()
		try {
			const { data } = await axios.post("auth/login", form)

			console.log("-------------------------------------------------------")
			console.log("dataaaa :>>", data)
			console.log("-------------------------------------------------------")

			if (data.status) {
				const { token } = data.data
				const { userfinal } = data.data

				console.log("-------------------------------------------------------")
				console.log("user :>>", userfinal)
				console.log("-------------------------------------------------------")

				localStorage.setItem("token", token)
				localStorage.setItem("user", JSON.stringify(userfinal))
				history.push("/")
				console.log("-------------------------------------------------------")
				console.log("data :>>", data)
				console.log("-------------------------------------------------------")
			} else {
				alert(data.error)
			}
		} catch (error) {
			console.log("-------------------------------------------------------")
			console.log("error :>>", error)
			console.log("-------------------------------------------------------")
		}
	}

	const handleChange = (e) => {
		const { value, name } = e.target
		setForm({
			...form,
			[name]: value,
		})
	}

	return (
		<div>
			<h1>Login!</h1>

			<form
				onSubmit={onHandleSubmit}
				className="flex flex-col w-full p-2 space-y-1 text-left xl:space-y-2"
			>
				<div className="flex space-x-2 field ">
					<label htmlFor="email" className="pt-2 w-28 xl:w-36 text-md">
						Email
					</label>
					<input
						type="email"
						className="w-40 px-4 py-0 text-black rounded-full xl:w-full form-input"
						name="email"
						onChange={handleChange}
					/>
				</div>

				<div className="flex space-x-2 field ">
					<label htmlFor="Password" className="pt-2 w-28 xl:w-36 text-md">
						Password
					</label>
					<input
						type="password"
						name="password"
						className="w-40 px-4 py-0 text-black rounded-full xl:w-full form-input"
						onChange={handleChange}
					/>
				</div>

				<div className="w-full pt-2">
					<button
						className="w-full pb-1 bg-green-400 border-green-300 rounded-full top-2 hover:bg-green-500 hover:shadow-lg hover:border-green-500"
						type="submit"
						disabled={isSubmitting}
					>
						Login
					</button>
					{/* <Link className="pl-3 text-sm text-indigo-700" to="/register">
						new here? Create a new account
					</Link> */}
				</div>
			</form>
		</div>
	)
}

export default LoginPage
