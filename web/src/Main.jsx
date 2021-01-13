import React from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Provider from "./Provider";

export default function Main() {
	return (
		<BrowserRouter>
			<Provider>
				<App />
			</Provider>
		</BrowserRouter>
	);
}
