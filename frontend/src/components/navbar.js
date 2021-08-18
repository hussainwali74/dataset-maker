import { AiOutlineLogout } from "react-icons/ai"
import { useHistory, NavLink } from "react-router-dom"
const Navbar = () => {
	const history = useHistory()
	const logout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("user")
		history.push("/login")
	}
	const showOnAdmin = () => {
		const user = JSON.parse(localStorage.getItem("user"))
		if (user.email == "admin@hussain.com") {
			return true
		} else {
			return false
		}
	}
	const CSV = () => {
		if (showOnAdmin()) {
			return (
				<>
					<NavLink to={"/sentence-upload"} activeClassName="text-white bg-gray-900 rounded-md">
						<p className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
							Upload Sentences
						</p>
					</NavLink>

					<NavLink
						to={"/sentence-upload-sample"}
						activeClassName="text-white bg-gray-900 rounded-md"
					>
						<p className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
							Upload Sample Sentences
						</p>
					</NavLink>
				</>
			)
		}
		return ""
	}
	return (
		<div>
			<nav className="bg-gray-800">
				<div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<button
								type="button"
								className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>

								<svg
									className="block w-6 h-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>

								<svg
									className="hidden w-6 h-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
							<div className="flex items-center flex-shrink-0">
								<img
									className="block w-auto h-8 lg:hidden"
									src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
									alt="Workflow"
								/>
								<img
									className="hidden w-auto h-8 lg:block"
									src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
									alt="Workflow"
								/>
							</div>
							<div className="hidden sm:block sm:ml-6">
								<div className="flex space-x-4">
									<NavLink
										exact
										to={"/"}
										activeClassName="text-white bg-gray-900 rounded-md"
									>
										<p
											className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white "
											aria-current="page"
										>
											Home
										</p>
									</NavLink>

									<CSV />
								</div>
							</div>
						</div>
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<button
								onClick={logout}
								className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white "
							>
								<AiOutlineLogout />
							</button>
						</div>
					</div>
				</div>

				<div className="sm:hidden" id="mobile-menu">
					<div className="px-2 pt-2 pb-3 space-y-1">
						<p
							className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
							aria-current="page"
						>
							Sentence
						</p>

						<p className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
							Updload
						</p>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
