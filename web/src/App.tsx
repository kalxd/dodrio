import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Nav from "./Nav";

import Signup from "./page/Signup";

const App = (
	<Router>
		<Nav />

		<Container>
			<Route path="/signup">
				<Signup />
			</Route>
		</Container>
	</Router>
);

export default App;
