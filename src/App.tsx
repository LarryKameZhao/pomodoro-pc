import * as React from 'react'
import './App.scss'
import {  Router, Route } from 'react-router-dom'
import login from './components/login/Login'
import signup from './components/signup/Signup'
import index from './components/home/Home'
import history from './config/history'
class App extends React.Component {
	render() {
		return (
			<Router history={history}>
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
