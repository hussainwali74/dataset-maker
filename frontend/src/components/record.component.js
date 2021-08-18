import axios from "axios"
import React, { useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { BsThreeDots } from "react-icons/bs"
import HandleRecordComponent from "./handleRecord.component"
import { getUserName } from "../helpers/auth"
// const axios = require(axios)

const Record = ({ sample, sentence, language_id, language_name }) => {
	const [recording, setRecording] = useState(false)
	const { id, name } = JSON.parse(localStorage.getItem("user"))
	const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder(
		{
			audio: true,
			type: "audio/wav",
			onStop: (blobUrl, blob) => {
				console.log("onStop recording")
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

				console.log(`upload_url`, upload_url)
				axios
					.post(upload_url, formData)
					.then((d) => console.log("after post blob :>>", d))
					.catch((e) => console.log("error in post blob :>>", e))
			},
		},
		(error) => console.log("shsdsd", error)
	)

	const handleStartRecording = () => {
		setRecording(!recording)
		if (!recording) {
			clearBlobUrl()
			startRecording()
		} else {
			stopRecording()
			console.log("mediaBlobUrl :>>", mediaBlobUrl)
		}
	}

	const getStartRecordingText = () => {
		if (sample !== undefined) {
			return "Start Recording Sample"
		} else {
			return "Start Recording"
		}
	}

	const REACT_APP_HOST = process.env["REACT_APP_HOST"] || "http://localhost:5000/"

	const HOST = REACT_APP_HOST + language_name + "/" + getUserName() + "/"

	if (sentence?.recordedAudio) {
		console.log("-------------------------------------------------------")
		console.log("sentence.recordedAudio :>>", sentence.recordedAudio)
		console.log("-------------------------------------------------------")
		return (
			<div className="flex flex-col items-center justify-center w-full p-2 space-y-2 bg-white border-t-2 md:space-y-0 xl:flex-row audio-buttons ">
				{!sentence.recordedAudio?.audio_url && recording && (
					<p className="px-4 pr-2 text-sm text-gray-600 ">
						<BsThreeDots className="w-8 h-8 text-yellow-500 transition-colors:{'bg-yellow-400'} animate-ping" />
					</p>
				)}

				{sentence.recordedAudio?.audio_url && (
					<audio controls className="w-full h-10 bg-white xl:w-3/4">
						<source
							src={HOST + sentence.recordedAudio?.audio_url}
							className="bg-white"
							type="audio/wav"
						/>
						<source
							src={HOST + sentence.recordedAudio?.audio_url}
							className="bg-white"
							type="audio/mpeg"
						/>
						Your browser does not support the audio element.
					</audio>
				)}

				<HandleRecordComponent
					sentence={sentence}
					sample={sample}
					mediaBlobUrl={mediaBlobUrl}
					recording={recording}
					handleStartRecording={handleStartRecording}
					getStartRecordingText={getStartRecordingText}
					startRecording={startRecording}
					stopRecording={stopRecording}
				/>
			</div>
		)
	}
	return (
		<div className="flex flex-col items-center justify-center w-full p-2 space-y-2 bg-white border-t-2 md:space-y-0 xl:flex-row audio-buttons ">
			{status || "sample audio, play this if sentence is unclear"}
			{!mediaBlobUrl && recording && (
				<p className="px-4 pr-2 text-sm text-gray-600 ">
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

			<HandleRecordComponent
				sentence={sentence}
				sample={sample}
				mediaBlobUrl={mediaBlobUrl}
				recording={recording}
				handleStartRecording={handleStartRecording}
				getStartRecordingText={getStartRecordingText}
				startRecording={startRecording}
				stopRecording={stopRecording}
			/>
		</div>
	)
}

export default Record
