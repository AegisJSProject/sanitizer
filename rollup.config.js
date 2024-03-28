import terser from '@rollup/plugin-terser';

export default [{
	input: 'sanitizer.js',
	output: [{
		file: 'sanitizer.cjs',
		format: 'cjs',
	}, {
		file: 'sanitizer.mjs',
		format: 'module',
	}],
}, {
	input: 'polyfill.js',
	output: [{
		file: 'polyfill.cjs',
		format: 'cjs',
	}, {
		file: 'polyfill.mjs',
		format: 'module',
	}, {
		file: 'polyfill.min.js',
		format: 'iife',
		sourcemap: true,
		plugins: [terser()],
	}],
}, {
	input: 'parsers.js',
	output: [{
		file: 'parsers.cjs',
		format: 'cjs',
	}, {
		file: 'parsers.mjs',
		format: 'module',
	}],
}];
