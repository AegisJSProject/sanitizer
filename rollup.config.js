import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';

const t = terser();
const nr = nodeResolve();

const configs = ['base', 'html', 'svg', 'mathml', 'complete'];

const modules = [
	'sanitizer', 'config', 'config/base', 'config/complete', 'config/html',
	'config/html', 'config/html', 'config/mathml', 'config/svg', 'config/global',
	'namespaces', 'config-utils', 'sanitize',
];

export default [
	{
		input: 'polyfill.js',
		plugins: [nr],
		output: [{
			file: 'polyfill.cjs',
			format: 'cjs',
		}, {
			file: 'polyfill.min.js',
			format: 'iife',
			sourcemap: true,
			plugins: [t],
		}],
	},
	...modules.map(path => ({
		input: `${path}.js`,
		external: () => true,
		output: {
			file: `${path}.cjs`,
			format: 'cjs',
		},
	})),
	...configs.map(path => ({
		input: `config/${path}.js`,
		plugins: [nr],
		output: {
			file: `config/${path}.min.js`,
			format: 'module',
			sourcemap: true,
			plugins: [t],
		}
	})),
];
