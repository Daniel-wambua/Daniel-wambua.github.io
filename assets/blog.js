// CYBER BLOG FUNCTIONALITY
document.addEventListener('DOMContentLoaded', () => {
    // Load blog posts
    fetchBlogPosts();
    
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', searchPosts);
    document.getElementById('blogSearch').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchPosts();
    });
    
    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPosts(btn.dataset.category);
        });
    });
});

async function fetchBlogPosts() {
    try {
        const response = await fetch('assets/data/blog-posts.json');
        const data = await response.json();
        renderBlogPosts(data.posts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

function renderBlogPosts(posts) {
    const featuredContainer = document.getElementById('featuredPosts');
    const allPostsContainer = document.getElementById('allPosts');
    
    // Clear existing content
    featuredContainer.innerHTML = '';
    allPostsContainer.innerHTML = '';
    
    // Separate featured and regular posts
    const featuredPosts = posts.filter(post => post.featured);
    const regularPosts = posts.filter(post => !post.featured);
    
    // Render featured posts
    featuredPosts.forEach(post => {
        featuredContainer.appendChild(createBlogCard(post, true));
    });
    
    // Render all posts
    regularPosts.forEach(post => {
        allPostsContainer.appendChild(createBlogCard(post));
    });
}

function createBlogCard(post, isFeatured = false) {
    const card = document.createElement('div');
    card.className = `blog-card ${isFeatured ? 'featured' : ''}`;
    
    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-img">
        <div class="blog-content">
            <span class="blog-category">${post.category.toUpperCase()}</span>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-meta">
                <span>${post.date}</span>
                <span>${post.readTime} read</span>
            </div>
            <a href="" class="read-more">READ FULL REPORT →</a>
        </div>
    `;
    
    return card;
}

function searchPosts() {
    const searchTerm = document.getElementById('blogSearch').value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    
    fetch('assets/data/blog-posts.json')
        .then(response => response.json())
        .then(data => {
            let filteredPosts = data.posts;
            
            // Apply category filter
            if (activeCategory !== 'all') {
                filteredPosts = filteredPosts.filter(post => post.category === activeCategory);
            }
            
            // Apply search filter
            if (searchTerm) {
                filteredPosts = filteredPosts.filter(post => 
                    post.title.toLowerCase().includes(searchTerm) || 
                    post.excerpt.toLowerCase().includes(searchTerm) ||
                    post.content.toLowerCase().includes(searchTerm)
                );
            }
            
            renderBlogPosts(filteredPosts);
        });
}

function filterPosts(category) {
    if (category === 'all') {
        fetchBlogPosts();
    } else {
        fetch('assets/data/blog-posts.json')
            .then(response => response.json())
            .then(data => {
                const filteredPosts = data.posts.filter(post => post.category === category);
                renderBlogPosts(filteredPosts);
            });
    }
}