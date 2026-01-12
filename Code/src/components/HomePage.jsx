import React, { useState, useEffect } from 'react';
import './HomePage.css';
import profileImageDefault from '../assets/profile.jpg';

function HomePage({ darkMode, setDarkMode }) {
	const [sidebarVisible, setSidebarVisible] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	// Editable profile data state
	const [profile, setProfile] = useState({
		image: '',
		interests: [],
		futurePlans: ''
	});

	// Add this new state
	const [interestsText, setInterestsText] = useState("");

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth <= 1000);
			if (window.innerWidth > 1000) setSidebarVisible(true);
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Load profile data from JSON file
	useEffect(() => {
		const loadProfile = async () => {
			try {
				// Load from JSON file
				try {
					console.log('Attempting to fetch /profile.json');
					const response = await fetch(`${import.meta.env.BASE_URL}profile.json`);
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
				<section id="intro">
					I am a qualified computer scientist from Stellenbosch univeristy with strong foundations in algorithms, networks, and software engineering. Experienced as an undergraduate teaching assistant, with hands-on project work in systems programming, networking, and compiler design.
				</section>
				<section id="education">
					<h2>Education</h2>

					<div className="education-item">
						<h3>Stellenbosch University — <em>Bachelor of Science in Computer Science</em></h3>
						<p><strong>Graduated:</strong> 2025<br />
							Focal Area: <strong>Computer Science and Operations Research</strong><br /></p>
							Degree average: <b>60%</b><br />
							Computer science average: <b>65.9%</b><br />
							Operations Research average: <b>57.3%</b><br />
							<div className="uni-marks">
								<div className="column left">
									<p>Computer Science 113: <b>82%</b><br />
									Computer Science 144: <b>63%</b><br />
									Computer Science 214: <b>51%</b><br />
									Computer Science 244: <b>60%</b><br />
									Computer Science 313: <b>77%</b><br />
									Computer Science 314: <b>56%</b><br />
									Computer Science 343: <b>73%</b><br />
									Computer Science 344: <b>65%</b><br /><br />

									Data Science 141: <b>50%</b><br />
									Data Science 241: <b>50%</b><br /><br />

									Applied Mathematics 214: <b>61%</b><br />
									Applied Mathematics 244: <b>65%</b></p>
								</div>
								<div className="column right">
									<p>Operations Research 214: <b>68%</b><br />
									Operations Research 244: <b>63%</b><br />
									Operations Research 314: <b>50%</b><br />
									Operations Research 322: <b>60%</b><br />
									Operations Research 344: <b>52%</b><br />
									Operations Research 352: <b>51%</b><br /><br />

									Mathematics 114: <b>64%</b><br />
									Mathematics 144: <b>54%</b><br />
									Mathematics 154: <b>50%</b><br />
									Mathematics 214: <b>51%</b><br />
									Mathematics 244: <b>50%</b><br /><br />

									Probability Theory and Statistics 114: <b>66%</b><br />
									Physics 114: <b>68%</b><br /></p>
								</div>
							</div>
							<p>Program focused on problem solving with efficient algorithm design from low level assembly to high level html. Full stack development was the whole focus of the program, teaching us backend, frontend and everything in between. Some of the core things we focused on were algorithms and skills of a good software engineer, not just having us learn a language, but to have us truly know how to code. Some of the things the program involved where: Networking, Server and client side code, data handling, efficient code, low level system design and tools like version control systems.</p>
					</div>

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
						<h3>Additional Learning &amp; Certifications</h3>
						<ul className="body-list">
							<li>Certificate of Completion – Stellenbosch University Techpreneurship Centre</li>
							A full-time 4-week bootcamp course (26 July – 20 August 2021) covering <strong>data science</strong>, <strong>machine learning</strong>, and <strong>entrepreneurial development</strong>.
						</ul>
					</div>
				</section><br />

				<section className="experience" id="experience">
				<h2>Experience / Skills</h2>
					<p>Demi (undergrad teaching assistant) for computer science: Assisted students in understanding their programs in both C and Assembly. Conducted lab sessions where I provided debugging support and helped them understand the content better.</p>
					<p>Good working knowledge of many programming languages and willing to <strong>learn new languages</strong> when needed.<br />
						High level proficiency in algorithm design and understanding network concepts, and software engineering practices through both academic and practical projects.<br />
						My academic history also includes a lot of <strong>Data Science</strong>, <strong>mathematics</strong>, <strong>Applied Mathematics</strong> and <strong>Operations Research</strong> modules which helps me alot to write efficient programs and mathematically complex programms</p>

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
					<div className="project-item">
						<h3>Collaborative Payment Splitting Application</h3>
						<p><strong>Technologies:</strong> Python, Supabase, JavaScript, HTML, CSS</p>
						<p>Developed in collaboration with a real company, providing valuable industry experience. Built the frontend interface for a group expense management system enabling users to create friend groups, record shared expenses, and automatically calculate bill splits. Application tracks payment history and outstanding balances between group members. Responsible for frontend development including user interface design and client-side logic.</p>
					</div>

					<div className="project-item">
						<h3>Multiplayer Trivia Game</h3>
						<p><strong>Technologies:</strong> Python, Supabase, JavaScript, HTML, CSS, Web Scraping</p>
						<p>Created a real-time multiplayer trivia game with server-based architecture supporting multiple concurrent players. Primarily responsible for data acquisition pipeline, developing web scrapers to gather trivia questions and implementing data cleaning procedures to ensure question quality and consistency. Utilized Supabase for backend services managing game state, player connections, and question database.</p>
					</div>

					<div className="project-item">
						<a className="project-link" href="https://github.com/Fourie12/Curriculum_Vitae" target="_blank" rel="noopener noreferrer">
							<h3>Interactive CV Website 🔗</h3>
						</a>
						<p><strong>Technologies:</strong> React, Vite, JavaScript, CSS</p>
						<p>Developed a fully functional single-page application featuring user authentication, dynamic blog post management, and editable profile sections. Implemented client-side state management without backend dependencies, utilizing browser storage for data persistence. Independently designed and built all components including a custom login system that enables content editing capabilities.</p>
					</div>

					<div className="project-item">
						<a className="project-link" href="https://github.com/Fourie12/VoipTest" target="_blank" rel="noopener noreferrer">
							<h3>Multi-User Chatroom with VoIP Capabilities 🔗</h3>
						</a>
						<p><strong>Technologies:</strong> Java, JavaFX, Socket Programming, Encryption</p>
						<p>Built a real-time communication platform supporting hundreds of concurrent users with live text chat, voice calling, and voice note functionality. Primarily responsible for backend architecture and server implementation, handling client connections, message routing, and end-to-end encryption. Developed custom GUI using JavaFX with user authentication and account creation system. Server managed all client communications with encrypted data transmission for secure messaging.</p>
					</div>

					<div className="project-item">
						<h3>Peer-to-Peer File Sharing Application</h3>
						<p><strong>Technologies:</strong> Java, Custom Network Protocol</p>
						<p>Designed and implemented a decentralized file sharing system using a custom-built protocol. Features include searchable public folders across connected peers with privacy-preserving anonymous connections. Users can search shared content across the network without exposing their full directory structure. Developed both command-line and GUI interfaces, with significant technical challenges in maintaining user anonymity while enabling efficient peer discovery and file transfer.</p>
					</div>

					<div className="project-item">
						<h3>Custom Language Compiler</h3>
						<p><strong>Technologies:</strong> C, JVM Bytecode</p>
						<p>Built a complete compiler from scratch targeting JVM bytecode for a custom programming language specification. Implemented all compilation stages including lexical analysis, parsing, semantic analysis with type checking, and code generation. Successfully generated executable JVM bytecode with particular complexity in implementing robust type checking and understanding JVM instruction set architecture.</p>
					</div>

					<div className="project-item">
						<h3>Banking Fraud Detection System</h3>
						<p><strong>Technologies:</strong> Python, Machine Learning (Regression, Random Forest)</p>
						<p>Developed a machine learning model to identify fraudulent banking transactions using regression and random forest algorithms. Trained on a large-scale financial dataset, achieving strong accuracy in fraud classification. Implemented feature engineering and model evaluation to optimize detection performance.</p>
					</div>

					<div className="project-item">
						<a className="project-link" href="https://github.com/Fourie12/sprinklers" target="_blank" rel="noopener noreferrer">
							<h3>Automated Irrigation Control System 🔗</h3>
						</a>
						<p><strong>Technologies:</strong> Python, PHP, HTML, Raspberry Pi</p>
						<p>Engineered an IoT irrigation system using Raspberry Pi to control solenoid valves and water pumps via relay modules. Python handles hardware control logic for automated and manual watering activation, while a web interface built with PHP and HTML provides remote scheduling and manual control capabilities. System enables programmed watering schedules accessible through a browser-based dashboard.</p>
					</div>
				</section>

				<section className="additional-experience" id="additional-experience">
					<h2>Additional Work Experience</h2>
						<div className="work-item">
							<h3>Technical Team Member — <em>Brackenfell Wes Gemeente</em></h3>
							<p><strong>Duration:</strong> March 2020 - Present</p>
							<strong>Reference:</strong> Riaan Wiid, Technical Team Leader - <a href="tel:+27763740190">076 374 0190</a>
							<p>Maintain and operate sound and video equipment for weekly services. Manage livestream broadcasts, mix live sound, and implement system upgrades. Responsible for troubleshooting technical issues and ensuring reliable audio-visual production.</p>
						</div>

						<div className="work-item">
							<h3>Motorcycle Technician — <em>MotoJunction</em></h3>
							<p><strong>Duration:</strong> June 2023 - August 2023</p>
							<strong>Reference:</strong> JP Vermeulen, Owner - <a href="tel:+27729916390">072 991 6390</a>
							<p>Holiday position performing motorcycle servicing and repairs. Conducted routine maintenance, diagnosed mechanical issues, and assisted senior technicians with complex repair work.</p>
						</div>
				</section>
			</section>

			<aside className={`sticky-sidebar ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
				<nav className="sidebar-nav">
					<a href="#education">Education</a>
					<a href="#experience">Experience / Skills</a>
					<a href="#projects">Projects</a>
					<a href="#additional-experience">Additional Experience</a>
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
					</div>

					<h2>Stephan Fourie</h2>

					{/* Contact */}
					<h3>Contact</h3>
					<div className="editable-section">
						<strong>Phone:</strong> <a href="tel:+27832735089">+27 83 273 5089</a>
						<strong>Email</strong> <a href="mailto:sfourie10@gmail.com">sfourie10@gmail.com</a>
					</div>


					{/* Interests Section */}
					<h3>Interests</h3>
					<div className="editable-section">
						<ul className="interests-list">
							{profile.interests.map((item, i) => (
								<li key={i}>{item}</li>
							))}
						</ul>
					</div>

					{/* Future Plans Section */}
					<h3>Future plans</h3>
					<div className="editable-section">
						<p style={{ whiteSpace: 'pre-wrap' }}>{profile.futurePlans}</p>
					</div>
				</div>
			</aside>
		</div>
	);
}

export default HomePage;
