/**
 * @jest-environment jsdom
 */

const { channelVideos, renderChannelVideos } = require('../channel.js');

describe('Channel Page', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="channelVideos"></div>
      <button class="tab-btn" data-tab="videos"></button>
      <button class="tab-btn active" data-tab="about"></button>
    `;
  });

  test('should have channelVideos array', () => {
    expect(channelVideos).toBeDefined();
    expect(channelVideos.length).toBe(3);
  });

  test('should render channel videos', () => {
    renderChannelVideos();
    const grid = document.getElementById('channelVideos');
    expect(grid.children.length).toBe(3);
  });

  test('should handle missing grid element', () => {
    document.body.innerHTML = '';
    expect(() => renderChannelVideos()).not.toThrow();
  });

  test('should have video properties', () => {
    expect(channelVideos[0]).toHaveProperty('id');
    expect(channelVideos[0]).toHaveProperty('title');
    expect(channelVideos[0]).toHaveProperty('views');
  });

  test('should render video cards with correct structure', () => {
    renderChannelVideos();
    const grid = document.getElementById('channelVideos');
    expect(grid.innerHTML).toContain('video-card');
    expect(grid.innerHTML).toContain('video-thumbnail');
  });

  test('should handle tab button clicks', () => {
    jest.resetModules();
    require('../channel.js');
    const tabs = document.querySelectorAll('.tab-btn');
    tabs[0].click();
    expect(tabs[0].classList.contains('active')).toBe(true);
    expect(tabs[1].classList.contains('active')).toBe(false);
  });

  test('should render videos when videos tab is clicked', () => {
    jest.resetModules();
    require('../channel.js');
    const grid = document.getElementById('channelVideos');
    grid.innerHTML = '';
    const videosTab = document.querySelector('[data-tab="videos"]');
    videosTab.click();
    expect(grid.children.length).toBe(3);
  });

  test('should include video duration in rendered cards', () => {
    renderChannelVideos();
    const grid = document.getElementById('channelVideos');
    expect(grid.innerHTML).toContain('video-duration');
    expect(grid.innerHTML).toContain('15:30');
  });

  test('should include video metadata', () => {
    renderChannelVideos();
    const grid = document.getElementById('channelVideos');
    expect(grid.innerHTML).toContain('1.2M');
    expect(grid.innerHTML).toContain('2 days ago');
  });

  test('should handle non-videos tab click', () => {
    jest.resetModules();
    require('../channel.js');
    const grid = document.getElementById('channelVideos');
    grid.innerHTML = 'test';
    const aboutTab = document.querySelector('[data-tab="about"]');
    aboutTab.click();
    expect(grid.innerHTML).toBe('test');
  });

  test('should handle undefined document', () => {
    const originalDoc = global.document;
    global.document = undefined;
    expect(() => renderChannelVideos()).not.toThrow();
    global.document = originalDoc;
  });
});
