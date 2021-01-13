import React from "react";
import { Route, Switch } from "react-router-dom";

export default function Main() {
	return (
		<>
			<div className="ui container">
				<Switch>
					<Route path="*">
						<h1>hello world</h1>
					</Route>
				</Switch>
			</div>
		</>
	);
}
