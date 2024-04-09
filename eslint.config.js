export default {
	'ignores': [
		'/node_modules/*',
		'/_site/*',
		'/img/*',
		'/css/*',
		'/fonts/*',
		'/js/std-js/*',
		'**/*.cjs',
		'**/*.mjs',
		'**/*.min.js',
		'*.out.js',
	],
	'rules': {
		'indent': [2, 'tab', { 'SwitchCase': 1 }],
		'quotes': [2, 'single'],
		'semi': [2, 'always'],
		'no-console': 0,
		'no-async-promise-executor': 0,
		'no-prototype-builtins': 0,
		'no-unused-vars': 'error',
	},
	'languageOptions': {
		'globals': {
			'globalThis': 'readonly',
			'trustedTypes': 'readonly'
		}
	}
};
