import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Button } from 'primereact/button';

function Counter() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Button label="+1" onClick={() => setCount(count + 1)} />
			<Button label={count} />
			<Button label="-1" onClick={() => setCount(count - 1)} />
		</>
	);
}

const App = (
	<Router>
		<Counter />
	</Router>
);

export default App;
