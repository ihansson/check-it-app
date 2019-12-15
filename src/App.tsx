import React from 'react';
import './App.scss';
import Login from './Login';
import Dashboard from './Dashboard';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

const App: React.FC = () => {
	return (
		<div className="App-page">
			<Router>
				<Switch>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
