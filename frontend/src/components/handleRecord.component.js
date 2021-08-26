import axios from "axios"
const HandleRecordComponent = ({
	sentence,
	loading,
	sample,
	mediaBlobUrl,
	recording,
	handleStartRecording,
	getStartRecordingText,
	startRecording,
	language_name,
	stopRecording,
	getSentences,
}) => {
	const handleButtonClick = async () => {
		if (sentence?.recordedAudio?.audio_url || (!recording && mediaBlobUrl)) {
			if (sentence?.recordedAudio) {
				let data
				try {
					data = await axios.patch(
						"sentence/delete_recording/" + language_name + "/" + sample,
						sentence
					)
					if (data.status) {
						getSentences()
					}
				} catch (error) {
					alert("error deleting recording")

					console.log("error deleting recording :>>", error)
					console.log("-------------------------------------------------------")
				}
			}
		} else {
			// RECORD
			handleStartRecording(startRecording, stopRecording)
		}
	}
	const isRecordedUrl = (sentence) => {
		if (sentence?.recordedAudio?.audio_url && !sample) {
			console.log("-------------------------------------------------------")
			console.log("sentence.recordedAudio.audio_url :>>", sentence.recordedAudio.audio_url)
			console.log("-------------------------------------------------------")

			return true
		} else {
			return false
		}
	}

	return (
		<div>
			<button
				disabled={loading}
				className={`w-full px-5  py-1 xl:w-1/4  text-sm font-medium tracking-wider text-white transition duration-200 ease-in ${
					recording
						? "bg-red-400 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500 xl:w-full"
						: mediaBlobUrl || isRecordedUrl(sentence)
						? " bg-red-400 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500 xl:w-full"
						: ` bg-green-400 xl:w-full border-green-300 hover:bg-green-500 hover:shadow-lg hover:border-green-500 
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

export default HandleRecordComponent
