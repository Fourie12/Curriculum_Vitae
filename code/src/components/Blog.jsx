import React, { useState, useEffect } from 'react';
import './Blog.css';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';

function Blog({ isLoggedIn }) {
	const [posts, setPosts] = useState([]);
	const [editingPostId, setEditingPostId] = useState(null);
	const [editedContent, setEditedContent] = useState('');
	const [newTitle, setNewTitle] = useState('');
	const [newContent, setNewContent] = useState('');
	const [newTags, setNewTags] = useState('');
	const [sortOrder, setSortOrder] = useState('desc');
	const [filterTag, setFilterTag] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [newImages, setNewImages] = useState([]);
	const [fullscreenImage, setFullscreenImage] = useState(null);

	const username = localStorage.getItem('loggedInUser') || 'Anonymous';

	// Load posts
	useEffect(() => {
		const loadPosts = async () => {
			try {
				const savedPosts = localStorage.getItem('blogPosts');
				if (savedPosts) {
					setPosts(JSON.parse(savedPosts));
					return;
				}

				try {
					const response = await fetch('/data/blog.json');
					if (response.ok) {
						const data = await response.json();
						setPosts(data);
						localStorage.setItem('blogPosts', JSON.stringify(data));
					} else {
						throw new Error('Blog file not found');
					}
				} catch {
					const defaultPosts = [
						{
							id: 1,
							title: 'Something went wrong',
							content: 'I have lost my jsons.',
							author: 'System',
							date: new Date().toISOString(),
							tags: ['error']
						}
					];
					setPosts(defaultPosts);
					localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
				}
			} catch (error) {
				console.error('Error loading blog posts:', error);
			}
		};

		loadPosts();
	}, []);

	// Save posts
	useEffect(() => {
		if (posts.length > 0) {
			localStorage.setItem('blogPosts', JSON.stringify(posts));
		}
	}, [posts]);

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const savePost = (postId) => {
		setPosts(prev =>
			prev.map(post =>
				post.id === postId ? { ...post, content: editedContent } : post
			)
		);
		setEditingPostId(null);
	};

	const deletePost = (postId) => {
		setPosts(prev => prev.filter(post => post.id !== postId));
	};

	const addPost = () => {
		if (!newTitle.trim() || !newContent.trim()) return;

		const tagsArray = newTags
			.split(',')
			.map(tag => tag.trim())
			.filter(tag => tag.length > 0);

		const newPost = {
			id: Date.now(),
			title: newTitle.trim(),
			content: newContent.trim(),
			tags: tagsArray,
			author: username,
			images: newImages.length > 0 ? newImages : [],
			date: new Date().toISOString(),
		};

		setPosts(prev => [newPost, ...prev]);
		setNewTitle('');
		setNewContent('');
		setNewTags('');
		setNewImages([]);
	};

	const handleTitleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			document.querySelector('.new-post-content').focus();
		}
	};

	const handleContentKeyDown = (e) => {
		if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			addPost();
		}
	};

	// Unique tags list for filter buttons
	const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

	const sortedPosts = [...posts].sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
	});
		
	const toggleTag = (tag) => {
		setSelectedTags(prev =>
			prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
		);
	}
	
	const filteredPosts = sortedPosts.filter(post => {
		// Filter by tags (if any)
		const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => post.tags?.includes(tag));

		// Filter by search term in title or content (case-insensitive)
		const lowerSearch = searchTerm.toLowerCase();
		const matchesSearch =
			post.title.toLowerCase().includes(lowerSearch) ||
			post.content.toLowerCase().includes(lowerSearch);

		return matchesTags && matchesSearch;
	});

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);

		const readers = files.map(file => {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result);
				reader.readAsDataURL(file);
			});
		});

		Promise.all(readers).then(results => {
			setNewImages(results);
		});
	};


	return (
		<div className="blog-container">
			<h2>Blog</h2>

			<div className="blog-controls">
				<div className="tag-filter-container">
					<strong>Filter tags:</strong>
					{allTags.length === 0 ? (
						<span className="no-tags">No tags yet</span>
					) : (
						allTags.map(tag => (
							<button
								key={tag}
								type="button"
								className={`tag-filter-btn ${selectedTags.includes(tag) ? 'selected' : ''}`}
								onClick={() => toggleTag(tag)}
							>
								{tag}
							</button>
						))
					)}
				</div>

				<input
					type="text"
					className="search-input"
					placeholder="Search posts..."
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>

				<div className="filter-btns">
					<button
						className="clear-filters-btn"
						onClick={() => {
							setSelectedTags([]);
							setSearchTerm('');
							setSortOrder('desc');
						}}
					>
						Clear Filters
					</button>

					<button
						className="sort-btn"
						onClick={() => setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'))}
					>
						Sort: {sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
					</button>
				</div>
			</div>

			{isLoggedIn && (
				<div className="new-post-container">
					<input
						className="new-post-title"
						type="text"
						placeholder="New post title"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						onKeyDown={handleTitleKeyDown}
					/>
					<textarea
						className="new-post-content"
						placeholder="Blog about it... (Ctrl+Enter to post)"
						value={newContent}
						onChange={(e) => setNewContent(e.target.value)}
						onKeyDown={handleContentKeyDown}
						rows={4}
					/>
					<input
						className="new-post-tags"
						type="text"
						placeholder="Tags (comma-separated)"
						value={newTags}
						onChange={(e) => setNewTags(e.target.value)}
					/>
					<input
						type="file"
						accept="image/*"
						className="new-post-image"
						multiple
						onChange={handleImageChange}
					/>
					<br />
					<button
						onClick={addPost}
						disabled={!newTitle.trim() || !newContent.trim()}
					>
						Post to blog
					</button>
				</div>
			)}

			<ul className="blog-list">
				{filteredPosts.length === 0 ? (
					<li className="no-posts">
						No blog posts found
						{selectedTags.length > 0 && (
							<span> for tag{selectedTags.length > 1 ? 's' : ''} {selectedTags.map((tag, i) => (
								<span key={tag}>
									{`"${tag}"`}{i < selectedTags.length - 1 ? ', ' : ''}
								</span>
							))}</span>
						)}
						{searchTerm.trim() !== '' && (
							<span> matching "{searchTerm.trim()}"</span>
						)}
						.
					</li>
				) : (
					filteredPosts.map(post => (
						<li key={post.id} className="blog-post">
							<div className={`blog-header ${isLoggedIn ? 'with-buttons' : ''}`}>
								{isLoggedIn && (username === post.author) && (
									<button
										className="blog-icon-btn"
										onClick={() => {
											setEditingPostId(post.id);
											setEditedContent(post.content);
										}}
										title="Edit post"
									>
										<img src={editIcon} alt="Edit" />
									</button>
								)}

								<div className="blog-title-date">
									<h3>{post.title}</h3>
									<span className="blog-date">
										{formatDate(post.date)} ~ {post.author || 'Unknown'}
									</span>
								</div>

								{isLoggedIn && (username === post.author) && (
									<button
										className="blog-icon-btn"
										onClick={() => {
											if (window.confirm('Are you sure you want to delete this post?')) {
												deletePost(post.id);
											}
										}}
										title="Delete post"
									>
										<img src={deleteIcon} alt="Delete" />
									</button>
								)}
							</div>

							<div className="editable-section">
								{editingPostId === post.id ? (
									<textarea
										value={editedContent}
										onChange={(e) => setEditedContent(e.target.value)}
										onBlur={() => savePost(post.id)}
										onKeyDown={(e) => {
											if (e.key === 'Escape') {
												setEditingPostId(null);
											} else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
												savePost(post.id);
											}
										}}
										autoFocus
										rows={4}
									/>
								) : (
									<p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
								)}
							</div>
							
							{post.images && post.images.length > 0 && (
								<div className="blog-image-container">
									{post.images.map((img, index) => (
										<img 
											key={index} 
											src={img} 
											alt={`${post.title}-${index}`} 
											className="blog-post-image"
											onClick={() => setFullscreenImage(img)}
										/>
									))}
								</div>
							)}

							{post.tags && post.tags.length > 0 && (
								<div className="blog-tags">
									{post.tags.map((tag, index) => (
										<span key={index} className="tag-badge">{tag}</span>
									))}
								</div>
							)}
						</li>
					))
				)}
			</ul>
			{fullscreenImage && (
				<div className="fullscreen-overlay" onClick={() => setFullscreenImage(null)}>
					<img src={fullscreenImage} alt="Full size" className="fullscreen-image" />
				</div>
			)}
		</div>
	);
}

export default Blog;
