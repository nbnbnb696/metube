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

  test('should load short', () => {
    loadShort(0);
    expect(document.getElementById('shortTitle').textContent).toBe('Quick CSS Tip');
    expect(document.getElementById('shortChannel').textContent).toBe('Design Pro');
  });

  test('should navigate to next short', () => {
    const index = nextShort();
    expect(index).toBe(1);
  });

  test('should navigate to previous short', () => {
    const index = prevShort();
    expect(index).toBe(2);
  });

  test('should wrap around at end', () => {
    nextShort();
    nextShort();
    const index = nextShort();
    expect(index).toBe(0);
  });

  test('should handle missing elements', () => {
    document.body.innerHTML = '';
    expect(() => loadShort(0)).not.toThrow();
  });
});
