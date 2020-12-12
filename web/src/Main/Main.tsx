import React from "react";
import { Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Nav from "./Nav";

import Signup from "./Page/Signup";
import Signin from "./Page/Signin";

export default function Main() {
	return (
		<>
			<Nav />

			<Container>
				<Route path="/signup">
					<Signup />
				</Route>
				<Route path="/signin">
					<Signin />
				</Route>
			</Container>
		</>
	);
}
