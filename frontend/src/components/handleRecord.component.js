import axios from "axios"
import { useState } from "react"
const HandleRecordComponent = ({
	sentence,
	sample,
	mediaBlobUrl,
	recording,
	handleStartRecording,
	getStartRecordingText,
	isLoading,
	startRecording,
	language_name,
	stopRecording,
	getSentences,
}) => {
	const [loading, setLoading] = useState(isLoading)

	const handleButtonClick = async () => {
		if (sentence?.recordedAudio?.audio_url || (!recording && mediaBlobUrl)) {
			if (sentence?.recordedAudio) {
				let data
				setLoading(true)
				try {
					data = await axios.patch(
						"sentence/delete_recording/" + language_name + "/" + sample,
						sentence
					)
					if (data.status) {
						await getSentences()
					}
					setLoading(false)
				} catch (error) {
					alert("error deleting recording")
					setLoading(false)

					console.log("error deleting recording :>>", error)
					console.log("----------------------------------------------------")
				}
			}
		} else {
			// RECORD
			handleStartRecording(startRecording, stopRecording)
		}
	}
	const isRecordedUrl = (sentence) => {
		if (sentence?.recordedAudio?.audio_url && !sample) {
			return true
		} else {
			return false
		}
	}
	if (loading) {
		return (
			<button
				disabled={true}
				className={`w-full px-5 py-2  xl:w-1/4  text-sm font-medium tracking-wider text-white  bg-yellow-400 border-yellow-300  pointer-events-none  border-2 rounded-full shadow-sm flex-no-shrink `}
				onClick={() => handleButtonClick()}
			>
				Please Wait...
			</button>
		)
	} else if (!loading) {
		return (
			<div>
				<button
					disabled={loading}
					className={`w-full px-5 py-2  xl:w-1/4  text-sm font-medium tracking-wider text-white transition duration-200 ease-in ${
						recording
							? "bg-red-400 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500 xl:w-full"
							: mediaBlobUrl || isRecordedUrl(sentence)
							? "bg-red-400 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500 xl:w-full"
							: `bg-green-400 xl:w-full border-green-300 hover:bg-green-500 hover:shadow-lg hover:border-green-500
					${!mediaBlobUrl && "xl:w-full "} `
					}   border-2 rounded-full shadow-sm flex-no-shrink `}
					onClick={() => handleButtonClick()}
				>
					{recording
						? "Stop Recording"
						: mediaBlobUrl || isRecordedUrl(sentence)
						? "Delete"
						: "Start Recording"}
				</button>
			</div>
		)
	}
}

export default HandleRecordComponent
