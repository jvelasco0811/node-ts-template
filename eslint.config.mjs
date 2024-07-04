// @ts-check
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import jest from 'eslint-plugin-jest'

export default [
	{
		ignores: ['node_modules/**', 'dist/**'],
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': tsEslint,
		},
		rules: {
			...tsEslint.configs.recommended.rules,
			...tsEslint.configs['recommended-requiring-type-checking'].rules,
		},
	},
	{
		files: ['**/*.js', '**/*.jsx'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
			},
		},
		plugins: {
			jest,
		},
		rules: {
			...jest.configs.recommended.rules,
		},
	},
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		rules: {
			...prettier.rules,
		},
	},
]
