import React, { useState, useEffect, useContext, Suspense } from 'react';
import useWindowWidth from './useWindowWidth';
import { ThemeContext } from './ThemeContext';

export default function App() {
	const [count, setCount]: [number, (x: number) => void] = useState(5);
	const width: number = useWindowWidth();
	const { color, background } = useContext(ThemeContext);

	useEffect(() => {
		document.title = count;
	}, [count])

	return <div style={{ color, background }}>
		<div>
			Test {count}
		</div>
		<div>
			<button onClick={() => { setCount(count-1) }}>Subtract</button>
			<button onClick={() => { setCount(count+1) }}>Add</button>
		</div>
		Window width: {width}
	</div>;
}
