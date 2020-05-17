import React from 'react';
import './App.scss';

import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Home from "./views/Home/Home"

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Home/>
					</Route>
					<Redirect to="/"/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
