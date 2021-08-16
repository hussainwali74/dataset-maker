import jwt_decode from "jwt-decode"

export const TOKEN = "token"

export const storeToken = (userToken) => localStorage.setItem(TOKEN, userToken)

export const getToken = () => "" + localStorage.getItem(TOKEN)

export const authenticated = () => {
	const token = getToken()
	if (token !== "null" && token !== "undefined" && token !== undefined) {
		let decodedToken = jwt_decode(token)
		let currentDate = new Date()
		if (decodedToken.exp * 1000 < currentDate.getTime()) {
			return false
		} else {
			return true
		}
	} else {
		return false
	}

	// JWT exp is in seconds
}
