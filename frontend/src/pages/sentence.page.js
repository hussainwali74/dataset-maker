import React, { useEffect, useState } from "react"
import axios from "axios"
import Record from "../components/record.component"
import Wrapper from "../components/wrapper.component"
const Sentence = () => {
	const [languages, setLanguages] = useState([])
	const [selectedLanguageId, setSelectedLanguageId] = useState()
	const [selectedLanguageName, setSelectedLanguageName] = useState()

	const [sentences, setSentences] = useState([])

	useEffect(() => {
		async function getLanguages() {
			const { data } = await axios.get("language")
			setLanguages(data)

			console.log("-------------------------------------------------------")
			console.log("data :>>", data)
			console.log("-------------------------------------------------------")

			// ONLY BURUSHASKI NOW
			setSelectedLanguageId(data[0].id)
			setSelectedLanguageName(data[0].name)
			getSentences(data[0].id)
		}
		getLanguages()
	}, [])

	const handleSelectLanguage = (e) => {
		setSelectedLanguageId(e.target.value)
		const languagename = languages.find((x) => x.id == e.target.value)

		setSelectedLanguageName(languagename.name)
		getSentences(e.target.value)
	}

	const getSentences = async (id = 1) => {
		let data
		try {
			data = await axios.get("sentence/sample/language/" + id)
			data = data.data
		} catch (error) {
			alert("eror fetching sentences")

			console.log("-------------------------------------------------------")
			console.log("error fetching samples :>>", error)
			console.log("-------------------------------------------------------")
		}

		console.log("-------------------------------------------------------")
		console.log("data samples :>>", data)
		console.log("-------------------------------------------------------")

		setSentences(data.data)
	}

	const REACT_APP_HOST = process.env["REACT_APP_HOST"] || "http://localhost:5000/"

	return (
		<Wrapper>
			{/* ------------------------------------------------------ */}
			{/* 						 select language			   */}
			<div className="w-full p-0 md:px-10">
				<div className="w-full h-full p-2 rounded-sm shadow-sm md:p-4 ">
					<select
						defaultValue={1}
						onChange={handleSelectLanguage}
						className="w-full px-3 py-2 bg-white border rounded outline-none"
					>
						{/* <option className="py-1">Select Language</option> */}
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
				{sentences?.length
					? sentences.map((sentence, index) => (
							<div
								key={index}
								className="w-full h-full p-2 text-gray-700 rounded-sm shadow-sm md:p-4 "
							>
								<div className="p-4 mb-0 bg-gray-100 border-2 rounded-md sentence">
									<div className="pb-2 text" title={sentence.english_meaning}>
										{sentence.id} - {sentence.sentence}
									</div>
									{sentence.audio ? (
										<div className="pt-2 border-t-2 audio-buttons">
											<div className="flex items-center justify-around px-2 ">
												<audio controls className="w-full ">
													<source
														src={REACT_APP_HOST + sentence.audio}
														type="audio/ogg"
													/>
													<source src="horse.mp3" type="audio/mpeg" />
													Your browser does not support the audio element.
												</audio>

												<button
													className={`w-full px-5 py-2  xl:w-1/4  text-sm font-medium tracking-wider text-white transition duration-200 ease-in  border-2 rounded-full shadow-sm flex-no-shrink `}
												>
													Start Recording
												</button>
											</div>
										</div>
									) : (
										<div className="record ">
											<Record
												sample={true}
												getSentences={getSentences}
												sentence={sentence}
												language_id={selectedLanguageId}
												language_name={selectedLanguageName}
											/>
										</div>
									)}

									{/* THIRD LINE: SPEAKER RECORD */}
									<div className="record ">
										<Record
											getSentences={getSentences}
											sentence={sentence}
											language_id={selectedLanguageId}
											language_name={selectedLanguageName}
										/>
									</div>
								</div>
							</div>
					  ))
					: "no sentences available"}
			</div>
		</Wrapper>
	)
}

export default Sentence
