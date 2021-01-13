import React from "react";
import { Route, Switch } from "react-router-dom";

import Navi from "./UI/Navi";
import MeProvider from "./UI/Me";

export default function Main() {
	return (
		<MeProvider>
			<Navi />
			<div className="ui container">
				<Switch>
					<Route path="*">
						<h1>hello world</h1>
					</Route>
				</Switch>
			</div>
		</MeProvider>
	);
}
