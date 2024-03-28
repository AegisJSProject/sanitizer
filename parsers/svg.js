import { elements, attributes } from '../config/svg.js';

export function svg(...args) {
	return Document.parseHTML(
		String.raw.apply(null, args).trim(),
		{ sanitizer: { elements: ['html', 'head', 'body', ...elements], attributes }}
	).body.firstElementChild;
}
