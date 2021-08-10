import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"

const SentenceUploadPage = () => {
	const history = useHistory()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [file, setFile] = useState(null)

	const onHandleSubmit = async (e) => {
		e.preventDefault()
		const fileData = new FormData()
		fileData.append("file", file)
		try {
			const { data } = await axios.post("http://localhost:5000/sentence/upload_csv", fileData)

			console.log("-------------------------------------------------------")
			console.log("data :>>", data)
			console.log("-------------------------------------------------------")

			// if (data.status) {
			// 	const { token } = data.data
			// 	const { userfinal } = data.data
			// 	localStorage.setItem("token", token)
			// 	localStorage.setItem("user", JSON.stringify(userfinal))
			// 	history.push("/")
			// } else {
			// 	alert(data.error)
			// }
		} catch (error) {
			console.log("-------------------------------------------------------")
			console.log("error :>>", error)
			console.log("-------------------------------------------------------")
		}
	}

	const handleChange = (e) => {
		console.log("-------------------------------------------------------")
		console.log("e.target.files[0] :>>", e.target.files[0])
		console.log("-------------------------------------------------------")
		setFile(e.target.files[0])
	}

	return (
		<div>
			<h1>Upload sentences csv file</h1>
			<form
				onSubmit={onHandleSubmit}
				className="flex flex-col w-full p-2 space-y-1 text-left xl:space-y-2"
			>
				<div className="flex space-x-2 field ">
					<label htmlFor="file" className="pt-2 w-28 xl:w-36 text-md">
						Upload file
					</label>
					<input
						type="file"
						className="w-40 px-4 py-0 text-black rounded-full xl:w-full form-input"
						name="file"
						onChange={handleChange}
					/>
				</div>
				<div className="w-full pt-2">
					<button
						className="w-full pb-1 bg-green-400 border-green-300 rounded-full top-2 hover:bg-green-500 hover:shadow-lg hover:border-green-500"
						type="submit"
						disabled={isSubmitting}
					>
						Upload
					</button>
				</div>
			</form>
		</div>
	)
}

export default SentenceUploadPage
