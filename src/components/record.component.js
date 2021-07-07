import React, { useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"

const Record = () => {
	const [recording, setRecording] = useState(false)

	const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
		audio: true,
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

	return (
		<div>
			<div className="flex items-center justify-around w-full p-2 mt-2 bg-white border-t-2 audio-buttons ">
				<p className="pr-2 text-sm text-gray-600">{status}</p>

				{mediaBlobUrl && (
					<audio controls className="w-full h-10 bg-white">
						<source src={mediaBlobUrl} className="bg-white" type="audio/ogg" />
						<source src={mediaBlobUrl} className="bg-white" type="audio/mpeg" />
						Your browser does not support the audio element.
					</audio>
				)}

				<button
					className={`w-56 px-5 pt-1 pb-2 ml-4 text-sm font-medium tracking-wider text-white transition duration-200 ease-in ${
						recording
							? "bg-red-400 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500"
							: "bg-green-400 border-green-300 hover:bg-green-500 hover:shadow-lg hover:border-green-500"
					}   border-2 rounded-full shadow-sm flex-no-shrink `}
					onClick={() => handleStartRecording(startRecording, stopRecording)}
				>
					{recording ? "Stop Recording" : mediaBlobUrl ? "Record Again" : "Start Recording"}
				</button>
			</div>
		</div>
	)
}

export default Record
