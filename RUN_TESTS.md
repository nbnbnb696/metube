# Run Tests with Jest

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run all tests
npm test

# 3. Run with coverage
npm run test:coverage
```

## Test Commands

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run in watch mode (auto re-run on changes)
npm run test:watch

# Run with verbose output
npm run test:verbose

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

## View Coverage Report

After running `npm run test:coverage`, open:
```
coverage/lcov-report/index.html
```

## Expected Output

```
PASS  src/js/__tests__/formatter.test.js
PASS  src/js/__tests__/validator.test.js
PASS  src/js/__tests__/video.service.test.js
PASS  src/js/__tests__/playlist.service.test.js

Test Suites: 4 passed, 4 total
Tests:       52 passed, 52 total
Snapshots:   0 total
Time:        2.5s

Coverage: 100%
```

## Files Created

- `jest.config.js` - Jest configuration
- `jest.setup.js` - Test setup and mocks
- `package.json` - Dependencies and scripts
- `src/js/__tests__/*.test.js` - Test files

## Test Structure

```
src/js/
├── __tests__/
│   ├── formatter.test.js
│   ├── validator.test.js
│   ├── video.service.test.js
│   └── playlist.service.test.js
├── services/
└── utils/
```

Ready to test!
