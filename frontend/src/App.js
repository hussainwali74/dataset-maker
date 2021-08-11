import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import "./App.css"
import Sentence from "./components/sentence.component"
import RegisterPage from "./pages/register.page"
import LoginPage from "./pages/login.page"
import ProtectedRoute from "./helpers/ProtectedRoute"
import SentenceUploadPage from "./pages/sentences-upload.page"

function App() {
	return (
		<div>
			<Router>
				<ProtectedRoute path="/" exact component={Sentence} />
				<ProtectedRoute path="/sentence-upload" exact component={SentenceUploadPage} />
				<Route path="/register" exact component={RegisterPage} />
				<Route path="/login" exact component={LoginPage} />
			</Router>
		</div>
	)
}

export default App
