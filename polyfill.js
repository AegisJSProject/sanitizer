import { setHTML as html, parseHTML as parse } from '@aegisjsproject/sanitizer/sanitize.js';
import {
	sanitizer as sanitizerConfig,
	elements as els,
	attributes as attrs,
	comments as cmnts
} from '@aegisjsproject/sanitizer/config/html.js';

if (! (Promise.withResolvers instanceof Function)) {
	Promise.withResolvers = function withResolvers() {
		const def = {};
		def.promise = new Promise((resolve, reject) => {
			def.resolve = resolve;
			def.reject = reject;
		});
		return def;
	};
}

/**
 * This is needed for working with sanitizer configs & attrs
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

if (! (URL.parse instanceof Function)) {
	URL.parse = function parse(url, base) {
		return URL.canParse(url, base) ? new URL(url, base) : null;
	};
}

if (! (Object.groupBy instanceof Function)) {
	Object.groupBy = function groupBy(arr, callback) {
		const obj = {};
		for (const item of arr) {
			const key = callback(item);

			if (! (key in obj)) {
				obj[key] = [item];
			} else {
				obj[key].push(item);
			}
		}

		return obj;
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
