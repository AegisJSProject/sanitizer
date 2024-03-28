import { elements, attributes } from '../config/mathml.js';

export function math(...args) {
	return Document.parseHTML(
		String.raw.apply(null, args).trim(),
		{ sanitizer: { elements: ['html', 'head', 'body', ...elements], attributes }}
	).body.firstElementChild;
}
