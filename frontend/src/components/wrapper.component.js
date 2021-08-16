import Navbar from "./navbar"

const Wrapper = ({ children }) => {
	return (
		<div className="w-full h-full overflow-hidden bg-primary">
			<Navbar />
			<div className="w-full p-4" style={{ height: "calc(100vh-60px" }}>
				{children}
			</div>
		</div>
	)
}

export default Wrapper
