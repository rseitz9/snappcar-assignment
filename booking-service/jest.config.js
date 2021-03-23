module.exports = {
	testMatch: ['tests/*', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testEnvironment: 'node',
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		'src/(.*)': '<rootDir>/src/$1',
		'tests/(.*)': '<rootDir>/__tests__/$1',
	},
};
