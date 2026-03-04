const videoData = {
    1: { title: "Introduction to Web Development", channel: "Tech Academy", subscribers: "1.2M", views: "1.2M", likes: 45000, dislikes: 320, description: "Learn the basics of web development including HTML, CSS, and JavaScript. Perfect for beginners!" },
    2: { title: "JavaScript Tutorial for Beginners", channel: "Code Master", subscribers: "850K", views: "850K", likes: 38000, dislikes: 280, description: "Complete JavaScript tutorial covering all fundamentals and advanced concepts." },
    3: { title: "CSS Grid Layout Complete Guide", channel: "Design Pro", subscribers: "620K", views: "620K", likes: 28000, dislikes: 150, description: "Master CSS Grid layout with practical examples and real-world projects." },
    4: { title: "React JS Full Course 2024", channel: "Dev Channel", subscribers: "2.1M", views: "2.1M", likes: 95000, dislikes: 450, description: "Complete React course from basics to advanced topics including hooks and context." },
    5: { title: "Python Programming Masterclass", channel: "Python Hub", subscribers: "1.5M", views: "1.5M", likes: 67000, dislikes: 380, description: "Learn Python programming from scratch with hands-on projects." },
    6: { title: "Node.js Backend Development", channel: "Backend Dev", subscribers: "780K", views: "780K", likes: 35000, dislikes: 220, description: "Build scalable backend applications with Node.js and Express." },
    7: { title: "Database Design Tutorial", channel: "Data Expert", subscribers: "450K", views: "450K", likes: 20000, dislikes: 180, description: "Learn database design principles and SQL queries." },
    8: { title: "Git and GitHub for Beginners", channel: "Code Academy", subscribers: "920K", views: "920K", likes: 42000, dislikes: 190, description: "Master version control with Git and collaborate using GitHub." }
};

const comments = [
    { author: "John Doe", time: "2 days ago", text: "Great tutorial! Very helpful for beginners." },
    { author: "Jane Smith", time: "1 week ago", text: "Excellent explanation. Thanks for sharing!" },
    { author: "Mike Johnson", time: "3 days ago", text: "This helped me understand the concept better." }
];

const recommendedVideos = [
    { id: 2, title: "JavaScript Tutorial for Beginners", channel: "Code Master", views: "850K", time: "1 week ago", thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=168&h=94&fit=crop" },
    { id: 3, title: "CSS Grid Layout Complete Guide", channel: "Design Pro", views: "620K", time: "3 days ago", thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=168&h=94&fit=crop" },
    { id: 4, title: "React JS Full Course 2024", channel: "Dev Channel", views: "2.1M", time: "1 month ago", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=168&h=94&fit=crop" },
    { id: 5, title: "Python Programming Masterclass", channel: "Python Hub", views: "1.5M", time: "2 weeks ago", thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=168&h=94&fit=crop" },
    { id: 6, title: "Node.js Backend Development", channel: "Backend Dev", views: "780K", time: "5 days ago", thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=168&h=94&fit=crop" }
];

const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('id') || '1';
const video = videoData[videoId];

if (video) {
    document.getElementById('videoTitle').textContent = video.title;
    document.getElementById('videoViews').textContent = `${video.views} views`;
    document.getElementById('likeCount').textContent = video.likes.toLocaleString();
    document.getElementById('dislikeCount').textContent = video.dislikes.toLocaleString();
    document.getElementById('channelName').textContent = video.channel;
    document.getElementById('subscriberCount').textContent = `${video.subscribers} subscribers`;
    document.getElementById('videoDescription').textContent = video.description;
}

document.getElementById('likeBtn').addEventListener('click', function() {
    this.style.backgroundColor = '#065fd4';
});

document.getElementById('dislikeBtn').addEventListener('click', function() {
    this.style.backgroundColor = '#065fd4';
});

document.getElementById('subscribeBtn').addEventListener('click', function() {
    if (this.classList.contains('subscribed')) {
        this.classList.remove('subscribed');
        this.textContent = 'Subscribe';
    } else {
        this.classList.add('subscribed');
        this.textContent = 'Subscribed';
    }
});

function renderComments() {
    const commentsList = document.getElementById('commentsList');
    document.getElementById('commentCount').textContent = comments.length;
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
            </div>
        </div>
    `).join('');
}

document.getElementById('addCommentBtn').addEventListener('click', () => {
    const input = document.getElementById('commentInput');
    if (input.value.trim()) {
        comments.unshift({
            author: "You",
            time: "Just now",
            text: input.value
        });
        input.value = '';
        renderComments();
    }
});

function renderRecommended() {
    const container = document.getElementById('recommendedVideos');
    container.innerHTML = recommendedVideos.map(video => `
        <div class="recommended-video" onclick="window.location.href='video.html?id=${video.id}'">
            <div class="recommended-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
            </div>
            <div class="recommended-info">
                <h4>${video.title}</h4>
                <div class="recommended-meta">
                    <div>${video.channel}</div>
                    <div>${video.views} views • ${video.time}</div>
                </div>
            </div>
        </div>
    `).join('');
}

renderComments();
renderRecommended();


document.getElementById('shareBtn').addEventListener('click', () => {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({ title: video.title, url: url });
    } else {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
});

document.getElementById('saveBtn').addEventListener('click', function() {
    this.style.backgroundColor = '#065fd4';
    alert('Video saved to your library!');
});


document.getElementById('theaterBtn').addEventListener('click', () => {
    document.querySelector('.video-container').classList.toggle('theater-mode');
});

document.getElementById('miniPlayerBtn').addEventListener('click', () => {
    alert('Miniplayer activated - Video continues playing in corner');
});

let playbackSpeed = 1;
document.getElementById('speedBtn').addEventListener('click', () => {
    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    playbackSpeed = speeds[(currentIndex + 1) % speeds.length];
    document.getElementById('videoPlayer').playbackRate = playbackSpeed;
    alert(`Playback speed: ${playbackSpeed}x`);
});

document.getElementById('channelName').addEventListener('click', () => {
    window.location.href = 'channel.html';
});

document.addEventListener('keydown', (e) => {
    const video = document.getElementById('videoPlayer');
    if (e.key === ' ') {
        e.preventDefault();
        video.paused ? video.play() : video.pause();
    } else if (e.key === 'ArrowRight') {
        video.currentTime += 5;
    } else if (e.key === 'ArrowLeft') {
        video.currentTime -= 5;
    } else if (e.key === 'f') {
        video.requestFullscreen();
    } else if (e.key === 'm') {
        video.muted = !video.muted;
    } else if (e.key === 'ArrowUp') {
        video.volume = Math.min(1, video.volume + 0.1);
    } else if (e.key === 'ArrowDown') {
        video.volume = Math.max(0, video.volume - 0.1);
    }
});
