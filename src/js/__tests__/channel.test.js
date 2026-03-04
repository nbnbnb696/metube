/**
 * @jest-environment jsdom
 */

const { channelVideos, renderChannelVideos } = require('../channel.js');

describe('Channel Page', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="channelVideos"></div>';
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
});
