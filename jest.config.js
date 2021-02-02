module.exports = {
	timers: 'real',

	// An array of file extensions your modules use.
	moduleFileExtensions: ['js', 'json'],

	// The test environment that will be used for testing.
	testEnvironment: 'node',

	// The glob patterns Jest uses to detect test files.
	testMatch: ['**/*.test.js'],

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped.
	testPathIgnorePatterns: ['\\\\node_modules\\\\'],

	// Automatically reset mock calls and instances between every test.
	resetMocks: true,
};
