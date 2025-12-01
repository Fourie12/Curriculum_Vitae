import React, { useState, useEffect } from 'react';
import './LoginPage.css';

function LoginPage({ setIsLoggedIn, setShowLoginPage }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [users, setUsers] = useState([]);

	// Load users from public/data/users.json
	useEffect(() => {
		const loadUsers = async () => {
			try {
				try {
					const response = await fetch('/data/users.json');
					if (response.ok) {
						const data = await response.json();
						setUsers(data);
						// Save to localStorage for future use
						localStorage.setItem('users', JSON.stringify(data));
					} else {
						throw new Error('Users file not found');
					}
				} catch (error) {
					console.log('No users.json found, using default user');
					// Use default user if JSON file doesn't exist
					const defaultUsers = [
						{
							username: "admin",
							password: "password123"
						}
					];
					setUsers(defaultUsers);
					localStorage.setItem('users', JSON.stringify(defaultUsers));
				}
			} catch (error) {
				console.error('Error loading users:', error);
			}
		};

		loadUsers();
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		const user = users.find(
			(u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
		);
		if (user) 
			{localStorage.setItem('loggedInUser', username);
			setIsLoggedIn(true);
			setShowLoginPage(false);
			setError(''); // Clear any previous errors
		} else {
			setError('Invalid username or password');
		}
	};

	return (
		<div className="login-container">
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<label>Username:</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
				<button
					type="button"
					onClick={() => setShowLoginPage(false)}
					className="btn-back"
				>
					Back
				</button>
				{error && <p className="error">{error}</p>}
			</form>
		</div>
	);
}

export default LoginPage;
