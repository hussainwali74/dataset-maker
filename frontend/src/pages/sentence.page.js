import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/navbar"
import Record from "../components/record.component"
const Sentence = () => {
	const [languages, setLanguages] = useState([])
	const [selectedLanguageId, setSelectedLanguageId] = useState()
	const [baseUrl, setBaseUrl] = useState("http://localhost:5000/")

	const [sentences, setSentences] = useState([])

	useEffect(() => {
		async function getLanguages() {
			const { data } = await axios.get(baseUrl + "language")
			setLanguages(data)
		}
		getLanguages()
	}, [])

	const handleSelectLanguage = (e) => {
		setSelectedLanguageId(e.target.value)
		getSentences(e.target.value)
	}

	const getSentences = async (id) => {
		const { data } = await axios.get(baseUrl + "sentence/language/" + id)
		setSentences(data)
	}

	let url = "https://audio-previews.elements.envatousercontent.com/files/142778859/preview.mp3"
	return (
		<div className="w-full h-full overflow-hidden bg-primary">
			<Navbar />
			{/* ------------------------------------------------------ */}
			{/* 						 select language			   */}
			<div className="w-full p-0 md:px-10">
				<div className="w-full h-full p-2 rounded-sm shadow-sm md:p-4 ">
					<select
						onChange={handleSelectLanguage}
						className="w-full px-3 py-2 bg-white border rounded outline-none"
					>
						<option className="py-1">Select Language</option>
						{languages &&
							languages.map((language) => (
								<option key={language.id} value={language.id} className="py-1">
									{language.name}
								</option>
							))}
					</select>
				</div>
			</div>
			{/* ------------------------------------------------------ */}
			<div className="p-0 md:p-10">
				{sentences.length &&
					sentences.map((sentence, index) => (
						<div
							key={index}
							className="w-full h-full p-2 text-gray-700 rounded-sm shadow-sm md:p-4 "
						>
							<div className="p-4 mb-0 bg-gray-100 border-2 rounded-md sentence">
								<div className="pb-2 text" title={sentence.english_meaning}>
									{sentence.sentence}
									{"http://localhost:5000/" + sentence.audio}
								</div>
								{sentence.audio ? (
									<div className="pt-2 border-t-2 audio-buttons">
										<div className="flex items-center justify-around px-2 ">
											<audio controls className="w-full ">
												<source
													src={"http://localhost:5000/" + sentence.audio}
													type="audio/ogg"
												/>
												<source src="horse.mp3" type="audio/mpeg" />
												Your browser does not support the audio element.
											</audio>
										</div>
									</div>
								) : (
									<div className="record ">
										<Record
											sample={true}
											sentence_id={sentence.id}
											language_id={selectedLanguageId}
										/>
									</div>
								)}
								<div className="record ">
									<Record sentence_id={sentence.id} language_id={selectedLanguageId} />
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default Sentence
