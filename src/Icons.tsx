import React from 'react';

export const Loading: React.FC = () => {
	return <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="App-loading">
		<circle fill="none" stroke="#000" cx="15" cy="15" r="14"></circle>
	</svg>
}

export const Success: React.FC = () => {
	return <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="App-success">
	    <polyline fill="none" stroke="#000" points="4,10 8,15 17,4" />
	</svg>
}