import terser from '@rollup/plugin-terser';

const modules = [
	'sanitizer', 'config', 'config/base', 'config/complete', 'config/html',
	'config/html', 'config/html', 'config/mathml', 'config/svg', 'config/global',
	'namespaces', 'config-utils',
];

export default [
	{
		input: 'polyfill.js',
		output: [{
			file: 'polyfill.cjs',
			format: 'cjs',
		}, {
			file: 'polyfill.min.js',
			format: 'iife',
			sourcemap: true,
			plugins: [terser()],
		}],
	},
	...modules.map(path => ({
		input: `${path}.js`,
		external: () => true,
		output: {
			file: `${path}.cjs`,
			format: 'cjs',
		},
	}))
];
