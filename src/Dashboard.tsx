import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

const Dashboard: React.FC = () => {
	return (
	<div className="App-box">
		<div className="App-dashboard">
			<div className="App-dashboard-menu">
				<nav className="App-dashboard-nav">
					<a className="active" href="/dashboard">Dashboard</a>
					<a href="/dashboard/schedule">Schedule</a>
					<a href="/dashboard/projects">Projects</a>
					<a href="/dashboard/packages">Packages</a>
					<a href="/dashboard/settings">Settings</a>
				</nav>
			</div>
			<div className="App-dashboard-messages">
				Messages
			</div>
			<div className="App-dashboard-content">
				<Router>
					<Switch>
						<Route path="/dashboard/schedule">
							Schedule
						</Route>
						<Route path="/dashboard">
							Dashboard
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	</div>)
}

export default Dashboard