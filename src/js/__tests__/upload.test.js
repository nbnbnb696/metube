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
      <input id="videoFile" type="file" />
      <form id="uploadForm">
        <input id="videoDescInput" />
        <select id="categorySelect"><option value="tech">Tech</option></select>
      </form>
    `;
    global.alert = jest.fn();
    delete window.location;
    window.location = { href: '' };
    jest.resetModules();
    require('../upload.js');
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

  test('should handle dragover event', () => {
    const uploadArea = document.getElementById('uploadArea');
    const event = new Event('dragover');
    event.preventDefault = jest.fn();
    uploadArea.dispatchEvent(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('should handle dragleave event', () => {
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.style.borderColor = '#065fd4';
    uploadArea.dispatchEvent(new Event('dragleave'));
    expect(uploadArea.style.borderColor).toBe('#3f3f3f');
  });

  test('should handle drop event with video file', () => {
    const uploadArea = document.getElementById('uploadArea');
    const file = new File(['content'], 'test.mp4', { type: 'video/mp4' });
    const event = new Event('drop');
    event.preventDefault = jest.fn();
    event.dataTransfer = { files: [file] };
    uploadArea.dispatchEvent(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('should handle file input change', () => {
    const videoFile = document.getElementById('videoFile');
    const file = new File(['content'], 'test.mp4', { type: 'video/mp4' });
    Object.defineProperty(videoFile, 'files', { value: [file] });
    videoFile.dispatchEvent(new Event('change'));
    expect(document.getElementById('videoTitleInput').value).toBe('test');
  });

  test('should handle form submission', () => {
    const form = document.getElementById('uploadForm');
    document.getElementById('videoTitleInput').value = 'My Video';
    document.getElementById('videoDescInput').value = 'Description';
    document.getElementById('categorySelect').value = 'tech';
    
    const event = new Event('submit');
    event.preventDefault = jest.fn();
    form.dispatchEvent(event);
    
    expect(event.preventDefault).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith(expect.stringContaining('My Video'));
    expect(window.location.href).toBe('index.html');
  });

  test('should handle undefined document', () => {
    const originalDoc = global.document;
    global.document = undefined;
    const { handleFileSelect } = require('../upload.js');
    expect(() => handleFileSelect({ name: 'test.mp4' })).not.toThrow();
    global.document = originalDoc;
  });
});
