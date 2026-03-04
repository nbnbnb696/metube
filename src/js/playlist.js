let playlists = [];
if (typeof localStorage !== 'undefined') {
    playlists = JSON.parse(localStorage.getItem('playlists')) || [
        { id: 1, name: 'Watch Later', count: 5, privacy: 'private', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=320&h=180&fit=crop' },
        { id: 2, name: 'Favorites', count: 12, privacy: 'public', thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=320&h=180&fit=crop' },
        { id: 3, name: 'Learn JavaScript', count: 8, privacy: 'public', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop' }
    ];
}

function renderPlaylists() {
    if (typeof document === 'undefined') return;
    const grid = document.getElementById('playlistsGrid');
    if (!grid) return;
    grid.innerHTML = playlists.map(p => `
        <div class="playlist-card">
            <div class="playlist-thumbnail">
                <img src="${p.thumbnail}" alt="${p.name}">
                <div class="playlist-overlay">${p.count} videos</div>
            </div>
            <div class="playlist-details">
                <h3>${p.name}</h3>
                <p><i class="fas fa-${p.privacy === 'private' ? 'lock' : 'globe'}"></i> ${p.privacy}</p>
            </div>
        </div>
    `).join('');
}

function createPlaylist(name, desc, privacy) {
    if (!name) return false;
    playlists.push({
        id: Date.now(),
        name: name,
        count: 0,
        privacy: privacy,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=320&h=180&fit=crop'
    });
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }
    return true;
}

if (typeof document !== 'undefined') {
    const createBtn = document.getElementById('createPlaylistBtn');
    const cancelBtn = document.getElementById('cancelPlaylistBtn');
    const saveBtn = document.getElementById('savePlaylistBtn');
    const modal = document.getElementById('playlistModal');

    if (createBtn) {
        createBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'flex';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const name = document.getElementById('playlistName')?.value;
            const desc = document.getElementById('playlistDesc')?.value;
            const privacy = document.getElementById('playlistPrivacy')?.value;
            
            if (createPlaylist(name, desc, privacy)) {
                renderPlaylists();
                if (modal) modal.style.display = 'none';
                const nameInput = document.getElementById('playlistName');
                const descInput = document.getElementById('playlistDesc');
                if (nameInput) nameInput.value = '';
                if (descInput) descInput.value = '';
            }
        });
    }

    renderPlaylists();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { playlists, renderPlaylists, createPlaylist };
}
