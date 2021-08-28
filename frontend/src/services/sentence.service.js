import axios from "axios"
const SentenceService = () => {
	return <div></div>
}

export default SentenceService

const getSingleSentence = async (sentence_id) => {
	try {
		const { data } = await axios.get(`/sentence/${sentence_id}`)
		if (data?.status) {
			return data.data
		} else {
			alert("error in getting sentece")
			console.log(`data.error`, data.error)
		}
	} catch (error) {
		console.log("error in fetching sentence by id :>>", error)
		console.log("-------------------------------------------------------")
		alert(error)
	}
}
export { getSingleSentence }
