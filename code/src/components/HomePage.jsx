import React, { useState, useEffect } from 'react';
import './HomePage.css';
import profileImageDefault from '../assets/profile.jpg';
import editIcon from '../assets/edit.png';
import Blog from './Blog.jsx';

function HomePage({ darkMode, setDarkMode, isLoggedIn, setIsLoggedIn, setShowLoginPage }) {
	const [sidebarVisible, setSidebarVisible] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	// Editable profile data state
	const [profile, setProfile] = useState({
		image: '',
		interests: [],
		futurePlans: ''
	});

	const [editingInterests, setEditingInterests] = useState(false);
	const [editingPlans, setEditingPlans] = useState(false);

	// Add this new state
	const [interestsText, setInterestsText] = useState("");

	// Start editing with current interests
	const startEditingInterests = () => {
		setInterestsText(profile.interests.join(', '));
		setEditingInterests(true);
	};

	const handleInterestsChange = (e) => {
		setInterestsText(e.target.value);
	};

	const saveInterests = () => {
		const newInterests = interestsText
			.split(',')
			.map(i => i.trim())
			.filter(i => i.length > 0);
		setProfile(prev => ({ ...prev, interests: newInterests }));
		setEditingInterests(false);
	};

	const saveFuturePlans = () => {
		setEditingPlans(false);
	};

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth <= 768);
			if (window.innerWidth > 768) setSidebarVisible(true);
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Load profile data from JSON file and localStorage
	useEffect(() => {
		const loadProfile = async () => {
			try {
				// First check if we have saved data in localStorage
				const savedProfile = localStorage.getItem('userProfile');
				if (savedProfile) {
					const parsedProfile = JSON.parse(savedProfile);
					setProfile(parsedProfile);
					return;
				}

				// If no localStorage data, try to load from JSON file
				try {
					console.log('Attempting to fetch /data/profile.json');
					const response = await fetch('/data/profile.json');
					if (response.ok) {
						const data = await response.json();
						// Use the data as-is from the JSON file
						const processedProfile = {
							image: data.image || '',
							interests: data.interests,
							futurePlans: data.futurePlans
						};
						console.log('Processed profile');
						setProfile(processedProfile);
						// Save to localStorage for future use
						localStorage.setItem('userProfile', JSON.stringify(processedProfile));
					} else {
						throw new Error('Profile file not found');
					}
				} catch (error) {
					console.log('No profile.json found, using default data. Error:', error);
					// Use default data if JSON file doesn't exist
					const defaultProfile = {
						image: '',
						interests: [
							'We are not intrested',
							'Truely'
						],
						futurePlans: 'The future is dark and gray and gloomy.'
					};
					setProfile(defaultProfile);
					localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
				}
			} catch (error) {
				console.error('Error loading profile:', error);
			}
		};

		loadProfile();
	}, []);

	// Save profile data to localStorage whenever profile changes
	useEffect(() => {
		if (profile.image !== '' || profile.interests.length > 0 || profile.futurePlans !== '') {
			localStorage.setItem('userProfile', JSON.stringify(profile));
		}
	}, [profile]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setProfile(prev => ({
					...prev,
					image: event.target.result
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="main-content">
			{isMobile && (
				<button
					className="sidebar-toggle-btn"
					onClick={() => setSidebarVisible(!sidebarVisible)}
				>
					☰
				</button>
			)}

			<section className="home-container">
				<h1>Welcome to my life</h1>
				<section id="education">
					<h2>Education</h2>

					<div className="education-item">
						<h3>Brackenfell High School — <em>Matric Graduate with Honours</em></h3>
						<p><strong>Graduated:</strong> 2020</p>
						<ul className="body-list">
							<li>Achieved <strong>85%</strong> in Mathematics</li>
							<li>Achieved <strong>89%</strong> in Information Technology</li>
							<li>Achieved <strong>78%</strong> in Physical Science</li>
							<li>Achieved <strong>72%</strong> in Life Science</li>
							<li>Achieved <strong>80%</strong> in Afrikaans</li>
							<li>Achieved <strong>78%</strong> in English</li>
							<li>Achieved <strong>82%</strong> in Life Orientation</li>
						</ul>
					</div>

					<div className="education-item">
						<h3>Stellenbosch University — <em>Bachelor of Science in Computer Science (In Progress)</em></h3>
						<p><strong>Expected Graduation:</strong> 2025<br />
							Focal Area: <strong>Computer Science and Operations Research</strong><br />
							Completed <strong>two Computer Science modules with distinction (75%+)</strong>:<br /></p>
							<ul className="body-list">
								<li><strong>CS113</strong> – Computer Science for Actuarial Studies </li>
								<li><strong>CS313</strong> – Computer Networks</li>
							</ul>
							<p>Currently pursuing a degree in Computer Science with a strong focus on programming, algorithms, and problem-solving.</p>
					</div>

					<div className="education-item">
						<h3>Additional Learning &amp; Certifications</h3>
						<ul className="body-list">
							<li>Certificate of Completion – Stellenbosch University Techpreneurship Centre</li>
							A full-time 4-week bootcamp course (26 July – 20 August 2021) covering <strong>data science</strong>, <strong>machine learning</strong>, and <strong>entrepreneurial development</strong>.
						</ul>
					</div>
				</section><br />

				<section className="experience" id="experience">
				<h2>Experience / Skills</h2>
					<p>Demi (undergrad teaching assisstant) for computer science: Assissted students in understanding their programs in both C and Assembly. Conducted lab sesstions where I provided debugging support and helped them understand the content better.</p>
					<p>Good working knowledge of many programming languages and willing to <strong>learn new languages</strong> when needed.<br />
						High level proficiency in algorithm design and understanding network concepts, and software engineering practices through both academic and practical projects.<br />
						My academic history also includes alot of <strong>Data Science</strong>, <strong>mathematics</strong> and <strong>Applied Mathematics</strong> modules which helps me alot to write efficient programms and mathematically complex programms</p>

					<h3>Technical skills</h3>
					<h4>Programming languages:</h4>
					<ul>
						<li>C</li>
						<li>Java</li>
						<li>SQL</li>
						<li>Assembly</li>
						<li>Python</li>
						<li>PHP</li>
						<li>JavaScript</li>
						<li>HTML</li>
						<li>Object Pascal</li>
						<li>R</li>
					</ul>
					<h4>Core Skills:</h4>
					<ul>
						<li>OOP, algorithms and data structures, debugging & testing</li>
						<li>Software engineering and modular design</li>
						<li>Concurrency and parallel programming (threads, shared memory)</li>
						<li>Networking (TCP/IP, protocols, client-server)</li>
						<li>Database design and SQL</li>
						<li>Web development (HTML, CSS, JS, basic React)</li>
					</ul>
					<h4>Tools:</h4>
					<ul>
						<li>Git</li>
						<li>Linux</li>
						<li>VIM/NeoVIM</li>
						<li>Docker(basic)</li>
					</ul>
				</section>

				<section className="projects" id="projects">
					<h2>Projects</h2>
					<ul>
						<li>Personal CV website: Built using React</li>
						<li>Chatroom with VoIP and voicenote functionality: Built with Java</li>
						<li>Peer to peer file sharing app: Built using java</li>
						<li>Compiler: Built using C and runs on JRE</li>
						<li>Fruad detection algorithm: Built with python using ML techiques</li>
						<li>Automatic irigation system: Built with python, PHP and HTML</li>
					</ul>
				</section>

				<section id="blog">
					<Blog
						darkMode={darkMode}
						setDarkMode={setDarkMode}
						isLoggedIn={isLoggedIn}
						setIsLoggedIn={setIsLoggedIn}
						setShowLoginPage={setShowLoginPage}
					/>
				</section>
			</section>

			<aside className={`sticky-sidebar ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
				<div className="login-out-container">
					{isLoggedIn ? (
						<button
							className="login-out-btn logout"
							onClick={() => setIsLoggedIn(false)}
						>
							Logout
						</button>
					) : (
						<button
							className="login-out-btn"
							onClick={() => setShowLoginPage(true)}
						>
							Login
						</button>
					)}
				</div>

				<nav className="sidebar-nav">
					<a href="#education">Education</a>
					<a href="#experience">Experience / Skills</a>
					<a href="#blog">Blog</a>
					<a href="#projects">Projects</a>
				</nav>

				<button
					className="sidebar-dark-toggle"
					onClick={() => setDarkMode(!darkMode)}
				>
					Toggle {darkMode ? 'Light' : 'Dark'} Mode
				</button>

				<hr className="sidebar-divider" />

				<div className="sidebar-scroll">
					{/* Profile Image with edit icon */}
					<div className="profile-section">
						<img
							src={profile.image || profileImageDefault}
							alt="Profile photo"
							className="profile-image"
						/>
						{isLoggedIn && (
							<>
								<label htmlFor="profile-upload" className="edit-icon">
									<img src={editIcon} alt="Edit" />
								</label>
								<input
									id="profile-upload"
									type="file"
									accept="image/*"
									style={{ display: 'none' }}
									onChange={handleImageChange}
								/>
							</>
						)}
					</div>

					<h2>Stephan Fourie</h2>

					{/* Interests Section */}
					<h3>Interests</h3>
					<div className="editable-section">
						{editingInterests ? (
							<textarea
								value={interestsText}
								onChange={handleInterestsChange}
								onBlur={saveInterests}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
										saveInterests();
									} else if (e.key === 'Escape') {
										setEditingInterests(false);
									}
								}}
								autoFocus
							/>
						) : (
							<ul className="interests-list">
								{profile.interests.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						)}
						{isLoggedIn && !editingInterests && (
							<img
								src={editIcon}
								alt="Edit"
								className="edit-icon"
								onClick={startEditingInterests}
							/>
						)}
					</div>

					{/* Future Plans Section */}
					<h3>Future plans</h3>
					<div className="editable-section">
						{editingPlans ? (
							<textarea
								value={profile.futurePlans}
								onChange={(e) => setProfile({ ...profile, futurePlans: e.target.value })}
								onBlur={saveFuturePlans}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
										saveFuturePlans();
									} else if (e.key === 'Escape') {
										setEditingPlans(false);
									}
								}}
								autoFocus
								rows={4}
							/>
						) : (
							<p style={{ whiteSpace: 'pre-wrap' }}>{profile.futurePlans}</p>
						)}
						{isLoggedIn && !editingPlans && (
							<img
								src={editIcon}
								alt="Edit"
								className="edit-icon"
								onClick={() => setEditingPlans(true)}
							/>
						)}
					</div>
				</div>
			</aside>
		</div>
	);
}

export default HomePage;
