import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import './App.css';

function App() {
	const [darkMode, setDarkMode] = useState(() => {
		const savedMode = localStorage.getItem('darkMode');
		return savedMode ? JSON.parse(savedMode) : false;
	});


	useEffect(() => {
		const modeClass = darkMode ? 'dark-mode' : 'light-mode';
		document.body.className = modeClass;
		document.documentElement.className = modeClass;
		
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
	}, [darkMode]);

	return (
		<div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
			<HomePage
				darkMode={darkMode}
				setDarkMode={setDarkMode}
			/>
		</div>
	);
}

export default App;
