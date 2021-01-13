import React from "react";
import { Route, Switch } from "react-router-dom";

import Navi from "./UI/Navi";
import MeProvider from "./UI/Me";
import NotFound from "../lib/UI/NotFound";

export default function Main() {
	return (
		<MeProvider>
			<Navi />
			<div className="ui container">
				<Switch>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</div>
		</MeProvider>
	);
}
