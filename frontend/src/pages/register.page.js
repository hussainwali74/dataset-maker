import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"

const RegisterPage = () => {
	const history = useHistory()
	const [roles, setRoles] = useState([
		{ id: "admin", name: "Admin" },
		{ id: "language_expert", name: "Lanugage Expert" },
	])
	return (
		<div>
			<h1>Register!</h1>
			<Formik
				initialValues={{ name: "", email: "", password: "", role: "" }}
				validate={(values) => {
					const errors = {}
					if (!values.email) {
						errors.email = "Required"
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = "Invalid email address"
					}
					return errors
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(async () => {
						const { data } = await axios
							.post("auth/register", values)
							.catch((e) => console.log("error in post blob :>>", e))

						if (data.status) {
							alert("user added")
							console.log(`data on create user`, data)
						} else {
							alert(data.error)
						}

						setSubmitting(false)
					}, 400)
				}}
			>
				{({ isSubmitting }) => (
					<Form className="flex flex-col w-full p-2 space-y-1 text-left xl:space-y-2">
						<div className="flex space-x-2 field ">
							<label htmlFor="name" className="pt-2 w-28 xl:w-36 text-md">
								Name
							</label>
							<Field
								type="name"
								className="w-40 px-4 py-0 text-black rounded-full xl:w-full form-input"
								name="name"
							/>
							<ErrorMessage name="name" component="div" />
						</div>
						<div className="flex space-x-2 text-left field">
							<label htmlFor="email" className="pt-2 w-28 xl:w-36 text-md">
								Email
							</label>
							{/* <input type="email" className="w-40 px-4 py-0 text-black rounded-full xl:w-full form-input" /> */}
							<Field
								type="email"
								className="w-40 px-4 py-0 text-black rounded-full xl:w-full form-input"
								name="email"
							/>
							<ErrorMessage name="email" component="div" />
						</div>

						<div className="flex space-x-2 field ">
							<label htmlFor="Password" className="pt-2 w-28 xl:w-36 text-md">
								Password
							</label>
							<Field
								type="password"
								name="password"
								className="w-40 px-4 py-0 text-black rounded-full xl:w-full form-input"
							/>
							<ErrorMessage name="password" component="div" />
						</div>
						<div className="w-full p-0 ">
							<div className="flex space-x-2 field ">
								<label htmlFor="Role" className="pt-2 w-28 xl:w-36 text-md">
									Role
								</label>
								<select
									name="role"
									defaultValue={1}
									className="w-full px-3 py-2 bg-white border rounded outline-none"
								>
									{/* <option className="py-1">Select Language</option> */}
									{roles &&
										roles.map((role) => (
											<option key={role.id} value={role.id} className="py-1">
												{role.name}
											</option>
										))}
								</select>
							</div>
						</div>

						<div className="w-full pt-2">
							<button
								className="w-full pb-1 bg-green-400 border-green-300 rounded-full top-2 hover:bg-green-500 hover:shadow-lg hover:border-green-500"
								type="submit"
								disabled={isSubmitting}
							>
								Register
							</button>
							<Link className="pl-3 text-sm text-indigo-700" to="/login">
								Already have an account, Login
							</Link>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default RegisterPage
