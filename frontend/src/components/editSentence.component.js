import { useState } from "react"
import axios from "axios"

const EditSentenceComponent = ({ sentence }) => {
	const [form, setForm] = useState({ sentence: sentence.sentence })
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleOnSubmit = async (e) => {
		e.preventDefault()
		try {
			const { data } = await axios.patch("sentence/" + sentence.id, form)

			if (data.status) {
				console.log("data :>>", data)
				console.log("-------------------------------------------------------")
			} else {
				alert(data.error)
			}
		} catch (error) {
			console.log("error logging in :>>", error)
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
			<form onSubmit={handleOnSubmit} className="flex w-full p-2 space-y-1 text-left xl:space-y-2">
				<input
					type="text"
					className="w-40 px-4 py-0 text-black rounded-full xl:w-full form-input"
					name="sentence"
					onChange={handleChange}
				/>
				<button
					className="w-full pb-1 bg-green-400 border-green-300 rounded-full top-2 hover:bg-green-500 hover:shadow-lg hover:border-green-500"
					type="submit"
					disabled={isSubmitting}
				>
					Update
				</button>
			</form>
		</div>
	)
}

export default EditSentenceComponent
