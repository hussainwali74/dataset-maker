import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import "./App.css"
import Sentence from "./pages/sentence.page"
import RegisterPage from "./pages/register.page"
import LoginPage from "./pages/login.page"
import ProtectedRoute from "./helpers/ProtectedRoute"
import SentenceUploadPage from "./pages/sentences-upload.page"
import SentenceUploadSamplePage from "./pages/sentences-upload-sample.page"

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/register" exact component={RegisterPage} />
					<Route path="/login" exact component={LoginPage} />
					<Switch>
						<ProtectedRoute path="/" exact component={Sentence} />
						<ProtectedRoute path="/sentence-upload" exact component={SentenceUploadPage} />
						<ProtectedRoute
							path="/sentence-upload-sample"
							exact
							component={SentenceUploadSamplePage}
						/>
					</Switch>
				</Switch>
			</Router>
		</div>
	)
}

export default App
