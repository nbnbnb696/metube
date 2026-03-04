require('jest-localstorage-mock');

// Mock localStorage
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

// Mock alert
global.alert = jest.fn();

// Mock console methods
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn()
};

// Setup DOM
document.body.innerHTML = '<div id="root"></div>';
