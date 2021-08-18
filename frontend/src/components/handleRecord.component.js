const HandleRecordComponent = ({
	sentence,
	sample,
	mediaBlobUrl,
	recording,
	handleStartRecording,
	getStartRecordingText,
	startRecording,
	stopRecording,
}) => {
	return (
		<div>
			<button
				className={`w-full px-5 py-2  xl:w-1/4  text-sm font-medium tracking-wider text-white transition duration-200 ease-in ${
					recording
						? "bg-red-400 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500"
						: `bg-green-400 xl:w-full border-green-300 hover:bg-green-500 hover:shadow-lg hover:border-green-500 
						${!mediaBlobUrl && "xl:w-full "} `
				}   border-2 rounded-full shadow-sm flex-no-shrink `}
				onClick={() => handleStartRecording(startRecording, stopRecording)}
			>
				{recording
					? "Stop Recording"
					: mediaBlobUrl
					? "Record Again"
					: sentence?.recordedAudio?.audio_url
					? "Record Again"
					: "Start Recording"}
			</button>
		</div>
	)
}

export default HandleRecordComponent
