const videos = [
    { id: 1, title: "Introduction to Web Development", channel: "Tech Academy", views: "1.2M", time: "2 days ago", duration: "15:30", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=320&h=180&fit=crop", category: "javascript" },
    { id: 2, title: "JavaScript Tutorial for Beginners", channel: "Code Master", views: "850K", time: "1 week ago", duration: "22:45", thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=320&h=180&fit=crop", category: "javascript" },
    { id: 3, title: "CSS Grid Layout Complete Guide", channel: "Design Pro", views: "620K", time: "3 days ago", duration: "18:20", thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=320&h=180&fit=crop", category: "css" }
];

let watchLater = [];
let likedVideos = [];
let history = [];

if (typeof localStorage !== 'undefined') {
    watchLater = JSON.parse(localStorage.getItem('watchLater')) || [];
    likedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
    history = JSON.parse(localStorage.getItem('history')) || [];
}

function addToHistory(videoId) {
    if (!history.includes(videoId)) {
        history.unshift(videoId);
        if (history.length > 50) history.pop();
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('history', JSON.stringify(history));
        }
    }
}

function toggleWatchLater(videoId) {
    const index = watchLater.indexOf(videoId);
    if (index > -1) {
        watchLater.splice(index, 1);
    } else {
        watchLater.push(videoId);
    }
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('watchLater', JSON.stringify(watchLater));
    }
}

function toggleLike(videoId) {
    const index = likedVideos.indexOf(videoId);
    if (index > -1) {
        likedVideos.splice(index, 1);
    } else {
        likedVideos.push(videoId);
    }
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
    }
}

function renderVideos(videosToRender) {
    if (typeof document === 'undefined') return;
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;
    
    videoGrid.innerHTML = '';
    
    videosToRender.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `<div>${video.title}</div>`;
        videoGrid.appendChild(videoCard);
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { videos, addToHistory, toggleWatchLater, toggleLike, renderVideos };
}
