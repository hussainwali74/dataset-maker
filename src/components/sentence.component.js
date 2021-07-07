import React from "react"
import { useEffect, useState } from "react"
import Record from "./record.component"
const Sentence = () => {
	let url = "https://audio-previews.elements.envatousercontent.com/files/142778859/preview.mp3"
	const audio = new Audio(url)
	const [playing, setPlaying] = useState(false)
	useEffect(() => {}, [])
	const handlePlay = () => {
		setPlaying(!playing)
		// playing ? audio.pause() : audio.play()
		if (playing) {
			audio.pause()
		} else {
			audio.play()
		}
	}
	return (
		<div>
			<div className="container w-screen h-full pb-2 my-2 text-gray-700 rounded-sm shadow-sm ">
				<div className="pt-2 m-2 mb-0 bg-gray-100 border-2 rounded-md sentence">
					<div className="pb-2 text">
						hello world Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, ipsam
					</div>
					<div className="pt-2 border-t-2 audio-buttons">
						<div className="flex items-center justify-around px-2 ">
							<audio controls className="w-full ">
								<source src={url} type="audio/ogg" />
								<source src="horse.mp3" type="audio/mpeg" />
								Your browser does not support the audio element.
							</audio>
						</div>
					</div>
					<div className="record ">
						<Record />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Sentence
