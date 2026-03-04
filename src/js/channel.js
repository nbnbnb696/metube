const channelVideos = [
    { id: 1, title: "Introduction to Web Development", views: "1.2M", time: "2 days ago", duration: "15:30", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=320&h=180&fit=crop" },
    { id: 2, title: "JavaScript Tutorial for Beginners", views: "850K", time: "1 week ago", duration: "22:45", thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=320&h=180&fit=crop" },
    { id: 3, title: "CSS Grid Layout Complete Guide", views: "620K", time: "3 days ago", duration: "18:20", thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=320&h=180&fit=crop" }
];

function renderChannelVideos() {
    if (typeof document === 'undefined') return;
    const grid = document.getElementById('channelVideos');
    if (!grid) return;
    grid.innerHTML = channelVideos.map(v => `
        <div class="video-card" onclick="window.location.href='video.html?id=${v.id}'">
            <div class="video-thumbnail">
                <img src="${v.thumbnail}" alt="${v.title}">
                <span class="video-duration">${v.duration}</span>
            </div>
            <div class="video-info">
                <h3>${v.title}</h3>
                <div class="video-meta">
                    <div>${v.views} views • ${v.time}</div>
                </div>
            </div>
        </div>
    `).join('');
}

if (typeof document !== 'undefined') {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.getAttribute('data-tab');
            if (tab === 'videos') renderChannelVideos();
        });
    });
    renderChannelVideos();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { channelVideos, renderChannelVideos };
}
