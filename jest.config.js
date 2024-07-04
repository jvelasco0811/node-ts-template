module.exports = {
	testMatch: ['**/tests/**/*.test.ts'],
	transform: {
		'\\.ts$': '@swc/jest',
	},
	collectCoverage: true,
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
