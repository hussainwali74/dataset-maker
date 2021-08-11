import React from "react"
import { Route, Redirect } from "react-router-dom"
import { authenticated } from "./auth"

const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (authenticated() ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	)
}

export default ProtectedRoute
