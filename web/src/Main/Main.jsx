import React from "react";
import { Route, Switch } from "react-router-dom";

import Navi from "./UI/Navi";
import MeProvider from "./UI/Me";
import NotFound from "../lib/UI/NotFound";

import Signup from "./Signup";

export default function Main() {
	return (
		<MeProvider>
			<Navi />
			<div className="ui container">
				<Switch>
					<Route path="/signup">
						<Signup />
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</div>
		</MeProvider>
	);
}
