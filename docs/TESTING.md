# Testing MeTube Application

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests

#### Run all tests:
```bash
npm test
```

#### Run tests with coverage:
```bash
npm run test:coverage
```

#### Run tests in watch mode:
```bash
npm run test:watch
```

#### Run tests with verbose output:
```bash
npm run test:verbose
```

#### Run only unit tests:
```bash
npm run test:unit
```

#### Run only integration tests:
```bash
npm run test:integration
```

## Test Commands Explained

| Command | Description |
|---------|-------------|
| `npm test` | Runs all test suites once |
| `npm run test:coverage` | Runs tests and generates coverage report |
| `npm run test:watch` | Runs tests in watch mode (re-runs on file changes) |
| `npm run test:verbose` | Shows detailed test output |
| `npm run test:unit` | Runs only unit tests |
| `npm run test:integration` | Runs only integration tests |

## Coverage Report

After running `npm run test:coverage`, view the report at:
```
coverage/lcov-report/index.html
```

## Expected Coverage

- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

## Test Structure

```
src/js/
├── services/
│   ├── video.service.js
│   ├── video.service.test.js
│   ├── playlist.service.js
│   ├── playlist.service.test.js
│   └── ...
└── utils/
    ├── formatter.js
    ├── formatter.test.js
    └── ...
```

## Writing Tests

Example test:
```javascript
describe('ServiceName', () => {
    test('should do something', () => {
        expect(result).toBe(expected);
    });
});
```
