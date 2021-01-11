import React from "react";

import Placeholder from "./lib/UI/Placeholder";
import Error from "./lib/UI/Error";
import useError from "./lib/Hook/error";

import Setup from "./Setup/Main";

export default function Main() {
	const error = useError();

	return (
		<div className="ui container">
			<Error error={error} />
			{/* <Placeholder /> */}

			<Setup />
		</div>
	);
}
