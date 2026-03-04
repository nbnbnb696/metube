/**
 * @jest-environment jsdom
 */

const { handleFileSelect } = require('../upload.js');

describe('Upload Page', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="uploadArea"></div>
      <div id="uploadDetails" style="display:none"></div>
      <input id="videoTitleInput" />
    `;
  });

  test('should handle file selection', () => {
    const file = { name: 'test-video.mp4' };
    handleFileSelect(file);
    expect(document.getElementById('videoTitleInput').value).toBe('test-video');
    expect(document.getElementById('uploadArea').style.display).toBe('none');
    expect(document.getElementById('uploadDetails').style.display).toBe('block');
  });

  test('should remove file extension from title', () => {
    handleFileSelect({ name: 'my.video.file.mp4' });
    expect(document.getElementById('videoTitleInput').value).toBe('my.video.file');
  });

  test('should handle missing elements', () => {
    document.body.innerHTML = '';
    expect(() => handleFileSelect({ name: 'test.mp4' })).not.toThrow();
  });

  test('should handle file without extension', () => {
    handleFileSelect({ name: 'video' });
    expect(document.getElementById('videoTitleInput').value).toBe('video');
  });

  test('should handle empty filename', () => {
    handleFileSelect({ name: '' });
    expect(document.getElementById('videoTitleInput').value).toBe('');
  });
});
