/**
 * @jest-environment jsdom
 */

describe('Playlist Page', () => {
  let playlists, renderPlaylists, createPlaylist;

  beforeEach(() => {
    document.body.innerHTML = '<div id="playlistsGrid"></div>';
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
});
