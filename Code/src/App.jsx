import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [uName, setUname] = useState('');
	const [showLoginPage, setShowLoginPage] = useState(false);
	
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
			{showLoginPage ? (
				<LoginPage
					setIsLoggedIn={setIsLoggedIn}
					setShowLoginPage={setShowLoginPage}
				/>
			) : (
				<HomePage
					darkMode={darkMode}
					setDarkMode={setDarkMode}
					isLoggedIn={isLoggedIn}

					setIsLoggedIn={setIsLoggedIn}
					setShowLoginPage={setShowLoginPage}
				/>
			)}
		</div>
	);
}

export default App;
