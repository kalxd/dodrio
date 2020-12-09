import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Button, ButtonGroup } from '@blueprintjs/core';

function Counter() {
	const [count, setCount] = useState(0);

	return (
		<ButtonGroup>
			<Button text="+1" onClick={() => setCount(count + 1)} />
			<Button text={count} />
			<Button text="-1" onClick={() => setCount(count - 1)} />
		</ButtonGroup>
	);
}

const App = (
	<Router>
		<Counter />
	</Router>
);

export default App;
