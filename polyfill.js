import { setHTML as html, parseHTML as parse } from './sanitize.js';
import { sanitizerConfig, elements as els, attributes as attrs, comments as cmnts } from './config/html.js';

/**
 * This is needed for working with sanitizer configs & arrts
 */

if (! (URL.canParse instanceof Function)) {
	URL.canParse = function canParse(url, base) {
		try {
			new URL(url, base);
			return true;
		} catch {
			return false;
		}
	};
}

if (! (Object.groupBy instanceof Function)) {
	Object.groupBy = function groupBy(arr, callback) {
		return Object.fromEntries(arr.map(item => [callback(item), item]));
	};
}

if (! (Element.prototype.setHTML instanceof Function)) {
	Element.prototype.setHTML = function setHTML(content, {
		sanitizer: {
			elements = els,
			attributes = attrs,
			comments = cmnts,
		} = sanitizerConfig,
	} = {}) {
		html(this, content, { sanitizer: { elements, attributes, comments }});
	};
}

if (! (Document.parseHTML instanceof Function)) {
	Document.parseHTML = function parseHTML(content, {
		sanitizer: {
			elements = els,
			attributes = attrs,
			comments = cmnts,
		} = sanitizerConfig,
	} = {}) {
		return parse(content, { sanitizer: { elements, attributes, comments }});
	};
}
