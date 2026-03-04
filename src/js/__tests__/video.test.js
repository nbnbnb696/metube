describe('VideoService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should pass basic test', () => {
    expect(true).toBe(true);
  });

  test('should have localStorage', () => {
    expect(localStorage).toBeDefined();
  });
});
