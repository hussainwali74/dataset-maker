import axios from "axios"
import React, { useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { BsThreeDots } from "react-icons/bs"
// const axios = require(axios)

const Record = ({ sample, sentence, language_id, language_name }) => {
	const [recording, setRecording] = useState(false)
	const { id, name } = JSON.parse(localStorage.getItem("user"))

	const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
		audio: true,
		type: "audio/wav",
		onStop: (blobUrl, blob) => {
			const url = URL.createObjectURL(blob)
			let formData = new FormData()

			//person_name-person_id-language_id-sentence.id-date
			const today = new Date()
			// const file_name = `${id}-${language_id}-${sentence.id}-${today.toISOString()}.wav`
			const file_name = `${name}-${id}-${language_id}-${
				sentence.id
			}-${today.toDateString()}-${language_name}.wav`

			console.log("-------------------------------------------------------")
			console.log("file_name :>>", file_name)
			console.log("-------------------------------------------------------")

			formData.append("file", blob, file_name)

			let upload_url
			if (sample) {
				upload_url = "sentence/upload_audio_sample"
			} else {
				upload_url = "sentence/upload_audio"
			}

			axios
				.post(upload_url, formData)
				.then((d) => console.log("after post blob :>>", d))
				.catch((e) => console.log("error in post blob :>>", e))
		},
	})

	const handleStartRecording = () => {
		setRecording(!recording)
		if (!recording) {
			clearBlobUrl()
			startRecording()
		} else {
			stopRecording()
		}
	}

	const getStartRecordingText = () => {
		if (sample !== undefined) {
			return "Start Recording Sample"
		} else {
			return "Start Recording"
		}
	}

	return (
		<div>
			<div className="flex flex-col items-center justify-center w-full p-2 space-y-2 bg-white border-t-2 md:space-y-0 xl:flex-row audio-buttons ">
				{!mediaBlobUrl && recording && (
					<p className="pr-2 text-sm text-gray-600 ">
						<BsThreeDots className="w-8 h-8 text-yellow-500 transition-colors:{'bg-yellow-400'} animate-ping" />
					</p>
				)}

				{mediaBlobUrl && (
					<audio controls className="w-full h-10 bg-white xl:w-3/4">
						<source src={mediaBlobUrl} className="bg-white" type="audio/ogg" />
						<source src={mediaBlobUrl} className="bg-white" type="audio/mpeg" />
						Your browser does not support the audio element.
					</audio>
				)}

				<button
					className={`w-full px-5 py-2  xl:w-1/4  text-sm font-medium tracking-wider text-white transition duration-200 ease-in ${
						recording
							? "bg-red-400 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500"
							: `bg-green-400  border-green-300 hover:bg-green-500 hover:shadow-lg hover:border-green-500 
							 ${!mediaBlobUrl && "xl:w-full "} `
					}   border-2 rounded-full shadow-sm flex-no-shrink `}
					onClick={() => handleStartRecording(startRecording, stopRecording)}
				>
					{recording ? "Stop Recording" : mediaBlobUrl ? "Record Again" : getStartRecordingText()}
				</button>
			</div>
		</div>
	)
}

export default Record
