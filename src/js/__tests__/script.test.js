/**
 * @jest-environment jsdom
 */

describe('Home Page Script', () => {
  let videos, addToHistory, toggleWatchLater, toggleLike, renderVideos;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="videoGrid"></div>
      <input id="searchInput" />
      <button id="menuBtn"></button>
      <div id="sidebar"></div>
    `;
    localStorage.clear();
    jest.resetModules();
    const module = require('../script.js');
    videos = module.videos;
    addToHistory = module.addToHistory;
    toggleWatchLater = module.toggleWatchLater;
    toggleLike = module.toggleLike;
    renderVideos = module.renderVideos;
  });

  test('should have videos array', () => {
    expect(videos).toBeDefined();
    expect(videos.length).toBeGreaterThan(0);
  });

  test('should add video to history', () => {
    addToHistory(1);
    const history = JSON.parse(localStorage.getItem('history'));
    expect(history).toContain(1);
  });

  test('should not add duplicate to history', () => {
    addToHistory(1);
    addToHistory(1);
    const history = JSON.parse(localStorage.getItem('history'));
    expect(history.length).toBe(1);
  });

  test('should limit history to 50 items', () => {
    for (let i = 1; i <= 60; i++) {
      addToHistory(i);
    }
    const history = JSON.parse(localStorage.getItem('history'));
    expect(history.length).toBe(50);
  });

  test('should toggle watch later - add', () => {
    toggleWatchLater(1);
    const watchLater = JSON.parse(localStorage.getItem('watchLater'));
    expect(watchLater).toContain(1);
  });

  test('should toggle watch later - remove', () => {
    toggleWatchLater(1);
    toggleWatchLater(1);
    const watchLater = JSON.parse(localStorage.getItem('watchLater'));
    expect(watchLater).not.toContain(1);
  });

  test('should toggle like - add', () => {
    toggleLike(1);
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos'));
    expect(likedVideos).toContain(1);
  });

  test('should toggle like - remove', () => {
    toggleLike(1);
    toggleLike(1);
    const likedVideos = JSON.parse(localStorage.getItem('likedVideos'));
    expect(likedVideos).not.toContain(1);
  });

  test('should render videos to DOM', () => {
    renderVideos(videos.slice(0, 3));
    const videoGrid = document.getElementById('videoGrid');
    expect(videoGrid.children.length).toBe(3);
  });

  test('should render empty grid for empty array', () => {
    renderVideos([]);
    const videoGrid = document.getElementById('videoGrid');
    expect(videoGrid.children.length).toBe(0);
  });

  test('should handle null videoGrid gracefully', () => {
    document.body.innerHTML = '';
    expect(() => renderVideos(videos)).not.toThrow();
  });
});
