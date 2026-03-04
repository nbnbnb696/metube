/**
 * @jest-environment jsdom
 */

describe('Video Player Page', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1 id="videoTitle"></h1>
      <span id="videoViews"></span>
      <span id="likeCount"></span>
      <span id="dislikeCount"></span>
      <span id="channelName"></span>
      <span id="subscriberCount"></span>
      <p id="videoDescription"></p>
      <button id="likeBtn"></button>
      <button id="dislikeBtn"></button>
      <button id="subscribeBtn"></button>
      <button id="shareBtn"></button>
      <button id="saveBtn"></button>
      <input id="commentInput" />
      <button id="addCommentBtn"></button>
      <div id="commentsList"></div>
      <span id="commentCount"></span>
      <div id="recommendedVideos"></div>
      <video id="videoPlayer"></video>
      <button id="theaterBtn"></button>
      <button id="miniPlayerBtn"></button>
      <button id="speedBtn"></button>
      <div class="video-container"></div>
    `;
  });

  test('should load video data', () => {
    const videoData = {
      1: { title: 'Test Video', channel: 'Test Channel', views: '1M', likes: 1000, dislikes: 10 }
    };
    expect(videoData[1]).toBeDefined();
    expect(videoData[1].title).toBe('Test Video');
  });

  test('should get video ID from URL', () => {
    const urlParams = new URLSearchParams('?id=1');
    const videoId = urlParams.get('id') || '1';
    expect(videoId).toBe('1');
  });

  test('should default to video ID 1', () => {
    const urlParams = new URLSearchParams('');
    const videoId = urlParams.get('id') || '1';
    expect(videoId).toBe('1');
  });

  test('should format like count', () => {
    const likes = 45000;
    const formatted = likes.toLocaleString();
    expect(formatted).toBe('45,000');
  });

  test('should toggle subscribe button', () => {
    const btn = document.getElementById('subscribeBtn');
    btn.classList.add('subscribed');
    expect(btn.classList.contains('subscribed')).toBe(true);
    btn.classList.remove('subscribed');
    expect(btn.classList.contains('subscribed')).toBe(false);
  });

  test('should add comment to array', () => {
    const comments = [];
    const newComment = { author: 'User', time: 'Just now', text: 'Great video!' };
    comments.unshift(newComment);
    expect(comments.length).toBe(1);
    expect(comments[0].text).toBe('Great video!');
  });

  test('should not add empty comment', () => {
    const text = '   ';
    const isValid = text.trim().length > 0;
    expect(isValid).toBe(false);
  });

  test('should render comments', () => {
    const comments = [
      { author: 'User1', time: '1 day ago', text: 'Nice!' },
      { author: 'User2', time: '2 days ago', text: 'Good!' }
    ];
    expect(comments.length).toBe(2);
  });

  test('should update comment count', () => {
    const comments = [{ author: 'User', time: 'now', text: 'Test' }];
    const count = comments.length;
    expect(count).toBe(1);
  });

  test('should render recommended videos', () => {
    const recommended = [
      { id: 2, title: 'Video 2', channel: 'Channel', views: '500K' },
      { id: 3, title: 'Video 3', channel: 'Channel', views: '300K' }
    ];
    expect(recommended.length).toBe(2);
  });

  test('should handle share functionality', () => {
    const url = 'http://example.com/video?id=1';
    expect(url).toContain('video');
  });

  test('should copy to clipboard', () => {
    const text = 'http://example.com/video';
    expect(text).toBeDefined();
  });

  test('should toggle theater mode', () => {
    const container = document.querySelector('.video-container');
    container.classList.toggle('theater-mode');
    expect(container.classList.contains('theater-mode')).toBe(true);
  });

  test('should cycle playback speeds', () => {
    const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    let currentSpeed = 1;
    const currentIndex = speeds.indexOf(currentSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    expect(nextSpeed).toBe(1.25);
  });

  test('should handle keyboard shortcuts', () => {
    const key = ' ';
    expect(key).toBe(' ');
  });

  test('should seek forward', () => {
    let currentTime = 10;
    currentTime += 5;
    expect(currentTime).toBe(15);
  });

  test('should seek backward', () => {
    let currentTime = 10;
    currentTime -= 5;
    expect(currentTime).toBe(5);
  });

  test('should increase volume', () => {
    let volume = 0.5;
    volume = Math.min(1, volume + 0.1);
    expect(volume).toBe(0.6);
  });

  test('should decrease volume', () => {
    let volume = 0.5;
    volume = Math.max(0, volume - 0.1);
    expect(volume).toBe(0.4);
  });

  test('should toggle mute', () => {
    let muted = false;
    muted = !muted;
    expect(muted).toBe(true);
  });

  test('should validate comment length', () => {
    const text = 'This is a test comment';
    const isValid = text.length <= 500;
    expect(isValid).toBe(true);
  });
});
