import { sanitizer } from '../config/base.js';

export const createHTMLParser = (config = sanitizer) => (...args) => {
	const el = document.createElement('div');
	const frag = document.createDocumentFragment();
	el.setHTML(String.raw.apply(null, args).trim(), { sanitizer: config });
	frag.append(...el.childNodes);
	return frag;
};

export const html = createHTMLParser(sanitizer);
