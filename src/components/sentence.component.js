import React from "react"
import Navbar from "./navbar"
import Record from "./record.component"
const Sentence = () => {
	let url = "https://audio-previews.elements.envatousercontent.com/files/142778859/preview.mp3"
	return (
		<div className="w-full h-full overflow-hidden bg-primary">
			<Navbar />
			<div className="p-0 md:p-10">
				<div className="w-full h-full p-2 text-gray-700 rounded-sm shadow-sm md:p-4 ">
					<div className="p-4 mb-0 bg-gray-100 border-2 rounded-md sentence">
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
				<div className="w-full h-full p-2 text-gray-700 rounded-sm shadow-sm md:p-4 ">
					<div className="p-4 mb-0 bg-gray-100 border-2 rounded-md sentence">
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
				<div className="w-full h-full p-2 text-gray-700 rounded-sm shadow-sm md:p-4 ">
					<div className="p-4 mb-0 bg-gray-100 border-2 rounded-md sentence">
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
				<div className="w-full h-full p-2 text-gray-700 rounded-sm shadow-sm md:p-4 ">
					<div className="p-4 mb-0 bg-gray-100 border-2 rounded-md sentence">
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
				<div className="w-full h-full p-2 text-gray-700 rounded-sm shadow-sm md:p-4 ">
					<div className="p-4 mb-0 bg-gray-100 border-2 rounded-md sentence">
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
				<div className="w-full h-full p-2 text-gray-700 rounded-sm shadow-sm md:p-4 ">
					<div className="p-4 mb-0 bg-gray-100 border-2 rounded-md sentence">
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
		</div>
	)
}

export default Sentence
