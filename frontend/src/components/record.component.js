import axios from "axios"
import React, { useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { BsThreeDots } from "react-icons/bs"
import HandleRecordComponent from "./handleRecord.component"
import { getUserName } from "../helpers/auth"
// const axios = require(axios)

const Record = ({ sample, sentence, getSentences, language_id, language_name }) => {
	// IF SAMPLE => SECOND LINE
	const [recording, setRecording] = useState(false)
	const { id, name } = JSON.parse(localStorage.getItem("user"))
	const [loading, setLoading] = useState(false)

	const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder(
		{
			audio: true,
			type: "audio/wav",
			onStop: (blobUrl, blob) => {
				setLoading(true)
				console.log("onStop recording")
				const url = URL.createObjectURL(blob)
				let formData = new FormData()

				//person_name-person_id-language_id-sentence.id-date
				const today = new Date()
				// const file_name = `${id}-${language_id}-${sentence.id}-${today.toISOString()}.wav`
				const file_name = `${name}-${id}-${language_id}-${
					sentence.id
				}-${today.toDateString()}-${language_name}.wav`
				setLoading(true)
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
					.then(async (d) => {
						console.log("after post blob :>>", d)
						await getSentences()

						setLoading(false)
						clearBlobUrl()
					})
					.catch((e) => {
						setLoading(false)
						alert("error uploading audio")
						console.log("error in post blob :>>", e)
						setLoading(false)
					})
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

	if (sample) {
		return (
			<div className="flex flex-col items-center justify-center w-full p-2 space-y-2 bg-white border-t-2 md:space-y-0 xl:flex-row audio-buttons ">
				{status || "sample audio, play this if sentence is unclear"}
				{!mediaBlobUrl && recording && (
					<div className="px-2">
						<p className="px-4 pr-2 text-sm text-gray-600 ">
							<BsThreeDots className="w-8 h-8 text-yellow-500 transition-colors:{'bg-yellow-400'} animate-ping" />
						</p>
					</div>
				)}
				{mediaBlobUrl && !sentence.audio && (
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
					isLoading={loading}
					getSentences={getSentences}
					recording={recording}
					language_name={language_name}
					handleStartRecording={handleStartRecording}
					getStartRecordingText={getStartRecordingText}
					startRecording={startRecording}
					stopRecording={stopRecording}
				/>
			</div>
		)
	}
	// ---------------------------------------------------------------
	// 				last line
	// ---------------------------------------------------------------
	return (
		<div className="flex flex-col items-center justify-center w-full p-2 space-y-2 bg-white border-t-2 md:space-y-0 xl:flex-row audio-buttons ">
			{!sentence.recordedAudio?.audio_url && recording && (
				<div className="px-2">
					<p className="px-4 pr-2 text-sm text-gray-600 ">
						<BsThreeDots className="w-8 h-8 text-yellow-500 transition-colors:{'bg-yellow-400'} animate-ping" />
					</p>
				</div>
			)}
			{/* IF USER HAS ALREADY RECORDED AUDIO */}
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
			{/* {mediaBlobUrl && !sentence.recordedAudio?.audio_url && (
				<audio controls className="w-full h-10 bg-white xl:w-3/4">
					<source src={mediaBlobUrl} className="bg-white" type="audio/ogg" />
					<source src={mediaBlobUrl} className="bg-white" type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			)} */}
			{loading ? (
				<button
					disabled={true}
					className={`w-full px-5 py-2  xl:w-1/4  text-sm font-medium tracking-wider text-white  bg-yellow-400 border-yellow-300  pointer-events-none  border-2 rounded-full shadow-sm flex-no-shrink `}
				>
					Please Wait...
				</button>
			) : (
				<HandleRecordComponent
					sentence={sentence}
					mediaBlobUrl={mediaBlobUrl}
					isLoading={loading}
					sample={sample}
					getSentences={getSentences}
					recording={recording}
					language_name={language_name}
					handleStartRecording={handleStartRecording}
					getStartRecordingText={getStartRecordingText}
					startRecording={startRecording}
					stopRecording={stopRecording}
				/>
			)}
		</div>
	)
}

export default Record
