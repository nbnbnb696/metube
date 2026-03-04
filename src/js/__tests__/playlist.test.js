/**
 * @jest-environment jsdom
 */

describe('Playlist Page', () => {
  let playlists, renderPlaylists, createPlaylist;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="playlistsGrid"></div>
      <button id="createPlaylistBtn"></button>
      <button id="cancelPlaylistBtn"></button>
      <button id="savePlaylistBtn"></button>
      <div id="playlistModal" style="display:none"></div>
      <input id="playlistName" />
      <input id="playlistDesc" />
      <select id="playlistPrivacy"><option value="public">Public</option></select>
    `;
    localStorage.clear();
    jest.resetModules();
    const module = require('../playlist.js');
    playlists = module.playlists;
    renderPlaylists = module.renderPlaylists;
    createPlaylist = module.createPlaylist;
  });

  test('should have playlists array', () => {
    expect(playlists).toBeDefined();
    expect(playlists.length).toBeGreaterThan(0);
  });

  test('should render playlists', () => {
    renderPlaylists();
    const grid = document.getElementById('playlistsGrid');
    expect(grid.children.length).toBe(3);
  });

  test('should create new playlist', () => {
    const result = createPlaylist('New Playlist', 'Description', 'public');
    expect(result).toBe(true);
    expect(playlists.length).toBe(4);
  });

  test('should not create playlist without name', () => {
    const result = createPlaylist('', 'Description', 'public');
    expect(result).toBe(false);
  });

  test('should handle missing grid element', () => {
    document.body.innerHTML = '';
    expect(() => renderPlaylists()).not.toThrow();
  });

  test('should add playlist with correct properties', () => {
    createPlaylist('Test', 'Desc', 'private');
    const newPlaylist = playlists[playlists.length - 1];
    expect(newPlaylist.name).toBe('Test');
    expect(newPlaylist.privacy).toBe('private');
    expect(newPlaylist.count).toBe(0);
  });

  test('should render playlist cards with correct structure', () => {
    renderPlaylists();
    const grid = document.getElementById('playlistsGrid');
    expect(grid.innerHTML).toContain('playlist-card');
    expect(grid.innerHTML).toContain('playlist-thumbnail');
  });

  test('should show modal on create button click', () => {
    const createBtn = document.getElementById('createPlaylistBtn');
    const modal = document.getElementById('playlistModal');
    createBtn.click();
    expect(modal.style.display).toBe('flex');
  });

  test('should hide modal on cancel button click', () => {
    const modal = document.getElementById('playlistModal');
    modal.style.display = 'flex';
    const cancelBtn = document.getElementById('cancelPlaylistBtn');
    cancelBtn.click();
    expect(modal.style.display).toBe('none');
  });

  test('should save playlist and close modal', () => {
    const nameInput = document.getElementById('playlistName');
    const descInput = document.getElementById('playlistDesc');
    const privacySelect = document.getElementById('playlistPrivacy');
    const saveBtn = document.getElementById('savePlaylistBtn');
    const modal = document.getElementById('playlistModal');
    
    modal.style.display = 'flex';
    nameInput.value = 'Test Playlist';
    descInput.value = 'Test Description';
    privacySelect.value = 'public';
    
    saveBtn.click();
    
    expect(modal.style.display).toBe('none');
    expect(nameInput.value).toBe('');
    expect(descInput.value).toBe('');
  });

  test('should render private playlist with lock icon', () => {
    renderPlaylists();
    const grid = document.getElementById('playlistsGrid');
    expect(grid.innerHTML).toContain('fa-lock');
  });

  test('should render public playlist with globe icon', () => {
    renderPlaylists();
    const grid = document.getElementById('playlistsGrid');
    expect(grid.innerHTML).toContain('fa-globe');
  });

  test('should display video count in playlist overlay', () => {
    renderPlaylists();
    const grid = document.getElementById('playlistsGrid');
    expect(grid.innerHTML).toContain('videos');
  });

  test('should handle undefined document', () => {
    const originalDoc = global.document;
    global.document = undefined;
    expect(() => renderPlaylists()).not.toThrow();
    global.document = originalDoc;
  });

  test('should handle undefined localStorage', () => {
    const originalLS = global.localStorage;
    global.localStorage = undefined;
    jest.resetModules();
    const module = require('../playlist.js');
    expect(module.playlists).toBeDefined();
    global.localStorage = originalLS;
  });
});
