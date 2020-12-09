import React, { useState } from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';

function Counter() {
	const [count, setCount] = useState(0);

	console.log(count);

	return (
		<ButtonGroup>
			<Button text="+1" onAuxClick={() => setCount(count + 1)} />
			<Button text={count} />
			<button onClick={() => setCount(count + 1)}>
			+1
		</button>
			<Button text="-1" onClick={() => setCount(count - 1)} />
		</ButtonGroup>
	);
}

const App = <Counter />;

export default App;
