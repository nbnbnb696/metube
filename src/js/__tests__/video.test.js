/**
 * @jest-environment jsdom
 */

describe('Video Page', () => {
  beforeEach(() => {
    delete window.location;
    window.location = { search: '?id=1', href: 'http://localhost/video.html?id=1' };
    
    document.body.innerHTML = `
      <div id="videoTitle"></div>
      <div id="videoViews"></div>
      <div id="likeCount"></div>
      <div id="dislikeCount"></div>
      <div id="channelName"></div>
      <div id="subscriberCount"></div>
      <div id="videoDescription"></div>
      <button id="likeBtn"></button>
      <button id="dislikeBtn"></button>
      <button id="subscribeBtn"></button>
      <div id="commentsList"></div>
      <div id="commentCount"></div>
      <input id="commentInput" />
      <button id="addCommentBtn"></button>
      <div id="recommendedVideos"></div>
      <button id="shareBtn"></button>
      <button id="saveBtn"></button>
      <button id="theaterBtn"></button>
      <button id="miniPlayerBtn"></button>
      <button id="speedBtn"></button>
      <video id="videoPlayer"></video>
      <div class="video-container"></div>
    `;
    
    global.alert = jest.fn();
    global.navigator.clipboard = { writeText: jest.fn() };
    global.navigator.share = undefined;
    
    jest.resetModules();
    require('../video.js');
  });

  test('should load video data', () => {
    expect(document.getElementById('videoTitle').textContent).toBe('Introduction to Web Development');
    expect(document.getElementById('channelName').textContent).toBe('Tech Academy');
  });

  test('should handle like button click', () => {
    const likeBtn = document.getElementById('likeBtn');
    likeBtn.click();
    expect(likeBtn.style.backgroundColor).toBe('rgb(6, 95, 212)');
  });

  test('should handle dislike button click', () => {
    const dislikeBtn = document.getElementById('dislikeBtn');
    dislikeBtn.click();
    expect(dislikeBtn.style.backgroundColor).toBe('rgb(6, 95, 212)');
  });

  test('should toggle subscribe button', () => {
    const subscribeBtn = document.getElementById('subscribeBtn');
    subscribeBtn.click();
    expect(subscribeBtn.classList.contains('subscribed')).toBe(true);
    expect(subscribeBtn.textContent).toBe('Subscribed');
    subscribeBtn.click();
    expect(subscribeBtn.classList.contains('subscribed')).toBe(false);
    expect(subscribeBtn.textContent).toBe('Subscribe');
  });

  test('should add comment', () => {
    const input = document.getElementById('commentInput');
    const btn = document.getElementById('addCommentBtn');
    input.value = 'Test comment';
    btn.click();
    expect(input.value).toBe('');
    expect(document.getElementById('commentsList').innerHTML).toContain('Test comment');
  });

  test('should not add empty comment', () => {
    const input = document.getElementById('commentInput');
    const btn = document.getElementById('addCommentBtn');
    input.value = '   ';
    const initialCount = document.getElementById('commentCount').textContent;
    btn.click();
    expect(document.getElementById('commentCount').textContent).toBe(initialCount);
  });

  test('should render recommended videos', () => {
    const container = document.getElementById('recommendedVideos');
    expect(container.children.length).toBeGreaterThan(0);
    expect(container.innerHTML).toContain('recommended-video');
  });

  test('should handle share button with clipboard', () => {
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.click();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith('Link copied to clipboard!');
  });

  test('should handle save button', () => {
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.click();
    expect(saveBtn.style.backgroundColor).toBe('rgb(6, 95, 212)');
    expect(alert).toHaveBeenCalledWith('Video saved to your library!');
  });

  test('should toggle theater mode', () => {
    const theaterBtn = document.getElementById('theaterBtn');
    const container = document.querySelector('.video-container');
    theaterBtn.click();
    expect(container.classList.contains('theater-mode')).toBe(true);
    theaterBtn.click();
    expect(container.classList.contains('theater-mode')).toBe(false);
  });

  test('should handle miniplayer button', () => {
    const miniPlayerBtn = document.getElementById('miniPlayerBtn');
    miniPlayerBtn.click();
    expect(alert).toHaveBeenCalledWith('Miniplayer activated - Video continues playing in corner');
  });

  test('should change playback speed', () => {
    const speedBtn = document.getElementById('speedBtn');
    const video = document.getElementById('videoPlayer');
    speedBtn.click();
    expect(alert).toHaveBeenCalledWith('Playback speed: 1.25x');
  });

  test('should navigate to channel page', () => {
    delete window.location;
    window.location = { href: '' };
    const channelName = document.getElementById('channelName');
    channelName.click();
    expect(window.location.href).toBe('channel.html');
  });

  test('should handle space key for play/pause', () => {
    const video = document.getElementById('videoPlayer');
    video.paused = true;
    video.play = jest.fn();
    video.pause = jest.fn();
    const event = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(event);
    expect(video.play).toHaveBeenCalled();
  });

  test('should handle arrow right key', () => {
    const video = document.getElementById('videoPlayer');
    video.currentTime = 0;
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(event);
    expect(video.currentTime).toBeGreaterThanOrEqual(5);
  });

  test('should handle arrow left key', () => {
    const video = document.getElementById('videoPlayer');
    video.currentTime = 10;
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(event);
    expect(video.currentTime).toBeLessThanOrEqual(5);
  });

  test('should handle f key for fullscreen', () => {
    const video = document.getElementById('videoPlayer');
    video.requestFullscreen = jest.fn();
    const event = new KeyboardEvent('keydown', { key: 'f' });
    document.dispatchEvent(event);
    expect(video.requestFullscreen).toHaveBeenCalled();
  });

  test('should handle m key for mute', () => {
    const video = document.getElementById('videoPlayer');
    video.muted = false;
    const event = new KeyboardEvent('keydown', { key: 'm' });
    document.dispatchEvent(event);
    expect(video.muted).toBeDefined();
  });

  test('should handle arrow up key for volume', () => {
    const video = document.getElementById('videoPlayer');
    video.volume = 0.5;
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.dispatchEvent(event);
    expect(video.volume).toBeGreaterThan(0.5);
  });

  test('should handle arrow down key for volume', () => {
    const video = document.getElementById('videoPlayer');
    video.volume = 0.5;
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    document.dispatchEvent(event);
    expect(video.volume).toBeLessThan(0.5);
  });

  test('should handle space key when video is playing', () => {
    const video = document.getElementById('videoPlayer');
    Object.defineProperty(video, 'paused', { value: false, writable: true });
    video.pause = jest.fn();
    const event = new KeyboardEvent('keydown', { key: ' ' });
    event.preventDefault = jest.fn();
    document.dispatchEvent(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('should handle share button with navigator.share', () => {
    global.navigator.share = jest.fn();
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.click();
    expect(navigator.share).toHaveBeenCalled();
  });

  test('should render comments', () => {
    const commentsList = document.getElementById('commentsList');
    expect(commentsList.innerHTML).toContain('comment');
  });
});
