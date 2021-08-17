import axios from "axios"
import React, { useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { BsThreeDots } from "react-icons/bs"
import { ReactMic } from "react-mic"
// const axios = require(axios)

const Record = ({ sample, sentence, language_id, language_name }) => {
	const [recording, setRecording] = useState(false)
	const { id, name } = JSON.parse(localStorage.getItem("user"))

	const handleStartRecording = () => {
		setRecording(!recording)
	}

	const getStartRecordingText = () => {
		if (sample !== undefined) {
			return "Start Recording Sample"
		} else {
			return "Start Recording"
		}
	}
	const handleOnStop = (recordedBlob) => {
		console.log(`recordedBlob`, recordedBlob)
	}
	const handleOnData = (recordedBlob) => {
		console.log(`recordedBlob onData`, recordedBlob)
	}

	const handleOnBlock = (recordedBlob) => {
		console.log(`recordedBlob onBlock`, recordedBlob)
	}

	return (
		<div>
			<div className="flex flex-col items-center justify-center w-full p-2 space-y-2 bg-white border-t-2 md:space-y-0 xl:flex-row audio-buttons ">
				<ReactMic
					record={recording} // defaults -> false.  Set to true to begin recording
					pause={false} // defaults -> false (available in React-Mic-Gold)
					visualSetting="sinewave" // defaults -> "sinewave".  Other option is "frequencyBars"
					className={"w-full"} // provide css class name
					onStop={handleOnStop} // required - called when audio stops recording
					onData={handleOnData} // optional - called when chunk of audio data is available
					onBlock={handleOnBlock} // optional - called if user selected "block" when prompted to allow microphone access (available in React-Mic-Gold)
					strokeColor={"orange"} // sinewave or frequency bar color
					backgroundColor={"grey"} // background color
					mimeType="audio/webm" // defaults -> "audio/webm".  Set to "audio/wav" for WAV or "audio/mp3" for MP3 audio format (available in React-Mic-Gold)
					echoCancellation={true} // defaults -> false
					autoGainControl={false} // defaults -> false
					noiseSuppression={false} // defaults -> false
					channelCount={2} // defaults -> 2 (stereo).  Specify 1 for mono.
					bitRate={256000} // defaults -> 128000 (128kbps).  React-Mic-Gold only.
					sampleRate={96000} // defaults -> 44100 (44.1 kHz).  It accepts values only in range: 22050 to 96000 (available in React-Mic-Gold)
					timeSlice={3000} // defaults -> 4000 milliseconds.  The interval at which captured audio is returned to onData callback (available in React-Mic-Gold).
				/>

				<button
					className={`w-full px-5 py-2  xl:w-1/4  text-sm font-medium tracking-wider text-white transition duration-200 ease-in ${
						recording
							? "bg-red-400 border-red-300 hover:bg-red-500 hover:shadow-lg hover:border-red-500"
							: `bg-green-400  border-green-300 hover:bg-green-500 hover:shadow-lg hover:border-green-500 
						${"xl:w-full "} `
					}   border-2 rounded-full shadow-sm flex-no-shrink `}
					onClick={() => handleStartRecording()}
				>
					{recording ? "Stop Recording" : "Start Record "}
				</button>
			</div>
		</div>
	)
}

export default Record
