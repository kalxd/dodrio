import React from "react";

import Placeholder from "./lib/UI/Placeholder";
import Error from "./lib/UI/Error";
import useError from "./lib/Hook/error";

import Provider from "./Provider";
import Setup from "./Setup/Main";

export default function Main() {
	const error = useError();

	return (
		<Provider>
			<div className="ui container">
				<Error error={error} />
				<Setup />
			</div>
		</Provider>
	);
}
