import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import axios from "axios"
import { getToken, TOKEN } from "./helpers/auth"

// ========================================================================
// =========================   AXIOS configurations   =====================
// ========================================================================
// server
axios.defaults.baseURL = "http://roomie.pk:5000/"
// local
// axios.defaults.baseURL = "http://localhost:5000/"

axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem(TOKEN)
axios.defaults.headers.post["Content-Type"] = "application/json"

axios.interceptors.request.use(
	(request) => {
		console.log("REQUEST INTERCEPTED: ", request)
		// Edit request config
		request.headers = { Authorization: " Bearer " + getToken() }
		return request
	},
	(error) => {
		// console.log(error)
		return Promise.reject(error)
	}
)

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
