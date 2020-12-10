import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Button from '@material-ui/core/Button';

import Nav from "./Nav";

function Counter() {
	const [count, setCount] = useState(0);

	return (
		<Button onClick={() => setCount(count + 1)}>
			{count}
		</Button>
	);
}

const App = (
	<Router>
		<Nav />
		<Counter />
	</Router>
);

export default App;
