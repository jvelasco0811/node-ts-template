module.exports = {
	testMatch: ['**/tests/**/*.test.ts'],
	transform: {
		'\\.ts$': '@swc/jest',
	},
	collectCoverage: false,
	coverageDirectory: 'coverage',
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: -10,
		},
	},
}
