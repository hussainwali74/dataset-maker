import axios from "axios"
import { useState } from "react"
import Wrapper from "../components/wrapper.component"

const SentenceUploadSamplePage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [file, setFile] = useState(null)

	const onHandleSubmit = async (e) => {
		e.preventDefault()
		const fileData = new FormData()
		fileData.append("file", file)
		try {
			// 1 is language_id => here=>Burushaski
			setIsSubmitting(true)
			await axios.post("sentence/upload_csv_sample/1", fileData)
			setIsSubmitting(false)
		} catch (error) {
			console.log("error :>>", error)
			console.log("-------------------------------------------------------")
		}
	}

	const handleChange = (e) => {
		setFile(e.target.files[0])
	}

	return (
		<Wrapper>
			<h1 className="py-4 text-white">Upload Sample sentences csv file for Burushaski Lanugage</h1>
			<form
				onSubmit={onHandleSubmit}
				className="flex flex-col w-full p-2 space-y-1 text-left xl:space-y-4"
			>
				<div className="flex space-x-2 text-white field ">
					<label htmlFor="file" className="pt-2 w-28 xl:w-36 text-md">
						Upload file
					</label>
					<input
						type="file"
						className="w-40 px-4 py-0 rounded-full xl:w-full form-input"
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
		</Wrapper>
	)
}

export default SentenceUploadSamplePage
