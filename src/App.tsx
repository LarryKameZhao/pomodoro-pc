import * as React from 'react'
import './App.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import login from './components/login/Login'
import signup from './components/signup/Signup'
import index from './components/index/Index'
class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact={true} path="/" component={index} />
					<Route path="/login" component={login} />
					<Route path="/signup" component={signup} />
				</div>
			</Router>
		)
	}
}

export default App
