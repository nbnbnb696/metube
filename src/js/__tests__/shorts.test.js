/**
 * @jest-environment jsdom
 */

describe('Shorts Page', () => {
  let shorts, loadShort, nextShort, prevShort, getCurrentShort;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="shortTitle"></div>
      <div id="shortChannel"></div>
    `;
    jest.resetModules();
    const module = require('../shorts.js');
    shorts = module.shorts;
    loadShort = module.loadShort;
    nextShort = module.nextShort;
    prevShort = module.prevShort;
    getCurrentShort = module.getCurrentShort;
  });

  test('should have shorts array', () => {
    expect(shorts).toBeDefined();
    expect(shorts.length).toBe(3);
  });

  test('should have correct short properties', () => {
    expect(shorts[0]).toHaveProperty('id');
    expect(shorts[0]).toHaveProperty('title');
    expect(shorts[0]).toHaveProperty('channel');
    expect(shorts[0]).toHaveProperty('likes');
    expect(shorts[0]).toHaveProperty('comments');
  });

  test('should load short', () => {
    loadShort(0);
    expect(document.getElementById('shortTitle').textContent).toBe('Quick CSS Tip');
    expect(document.getElementById('shortChannel').textContent).toBe('Design Pro');
  });

  test('should load different shorts', () => {
    loadShort(1);
    expect(document.getElementById('shortTitle').textContent).toBe('JavaScript Trick');
    expect(document.getElementById('shortChannel').textContent).toBe('Code Master');
  });

  test('should navigate to next short', () => {
    const index = nextShort();
    expect(index).toBe(1);
    expect(document.getElementById('shortTitle').textContent).toBe('JavaScript Trick');
  });

  test('should navigate to previous short', () => {
    const index = prevShort();
    expect(index).toBe(2);
    expect(document.getElementById('shortTitle').textContent).toBe('React Hook Explained');
  });

  test('should wrap around at end', () => {
    nextShort();
    nextShort();
    const index = nextShort();
    expect(index).toBe(0);
    expect(document.getElementById('shortTitle').textContent).toBe('Quick CSS Tip');
  });

  test('should wrap around at beginning', () => {
    prevShort();
    prevShort();
    prevShort();
    const index = prevShort();
    expect(index).toBe(2);
  });

  test('should handle missing elements', () => {
    document.body.innerHTML = '';
    expect(() => loadShort(0)).not.toThrow();
  });

  test('should handle arrow up key', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.dispatchEvent(event);
    expect(getCurrentShort()).toBe(2);
  });

  test('should handle arrow down key', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    document.dispatchEvent(event);
    expect(getCurrentShort()).toBe(1);
  });

  test('should ignore other keys', () => {
    const currentIndex = getCurrentShort();
    const event = new KeyboardEvent('keydown', { key: 'a' });
    document.dispatchEvent(event);
    expect(getCurrentShort()).toBe(currentIndex);
  });

  test('should handle undefined document', () => {
    const originalDoc = global.document;
    global.document = undefined;
    expect(() => loadShort(0)).not.toThrow();
    global.document = originalDoc;
  });
});
