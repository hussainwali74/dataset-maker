import { useState } from "react"
import axios from "axios"
import { isAdmin } from "../helpers/auth"
import { getSingleSentence } from "../services/sentence.service"

const EditSentenceComponent = ({ sentence }) => {
	const [form, setForm] = useState({ sentence: sentence?.sentence })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [editing, setEditing] = useState(false)
	const [sentence1, setSentence1] = useState(sentence)

	const handleOnSubmit = async (e) => {
		e.preventDefault()
		try {
			setIsSubmitting(true)
			const { data } = await axios.patch("sentence/" + sentence1?.id, form)
			if (data.error) {
				alert(data.error)
			}
			sentence = await getSingleSentence(sentence1.id)
			setSentence1(sentence)
			setEditing(false)
			setIsSubmitting(false)
		} catch (error) {
			setIsSubmitting(false)
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

	if (!editing) {
		return (
			<div className="flex items-start justify-between pb-2 text" title={sentence1?.english_meaning}>
				{sentence1?.id} - {sentence1?.sentence}{" "}
				{isAdmin() && (
					<button
						className={`bg-red-400 pt-0 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500 xl:w-12 p-1 text-white transition duration-200 ease-in  border-2 rounded-full shadow-sm flex-no-shrink `}
						onClick={() => setEditing(true)}
					>
						edit
					</button>
				)}
			</div>
		)
	} else if (editing) {
		return (
			<div
				className="flex items-start justify-between pb-2 space-x-1 text"
				title={sentence1?.english_meaning}
			>
				<form
					onSubmit={handleOnSubmit}
					className="flex w-full space-x-2 space-y-1 text-left xl:space-y-0"
				>
					<input
						type="text"
						className="w-40 h-8 px-4 py-0 text-black rounded-full xl:w-full form-input"
						name="sentence"
						value={form.sentence}
						onChange={handleChange}
					/>
					<button
						className="w-1/4 py-2 pb-1 bg-green-400 border-green-300 rounded-full top-2 hover:bg-green-500 hover:shadow-lg hover:border-green-500"
						type="submit"
						disabled={isSubmitting}
					>
						Update
					</button>
					<button
						className="w-1/4 py-2 pb-1 bg-red-400 border-red-300 rounded-full top-2 hover:bg-red-500 hover:shadow-lg hover:border-red-500"
						type="button"
						onClick={() => setEditing(false)}
					>
						Cancel
					</button>
				</form>
			</div>
		)
	}
}

export default EditSentenceComponent
