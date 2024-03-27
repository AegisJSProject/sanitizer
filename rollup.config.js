export default {
	input: 'sanitizer.js',
	output: [{
		file: 'sanitizer.cjs',
		format: 'cjs',
	}, {
		file: 'sanitizer.mjs',
		format: 'module',
	}],
};

