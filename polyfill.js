import { setHTML as html, parseHTML as parse } from '@aegisjsproject/sanitizer/sanitize.js';

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
		elements,
		attributes,
		comments,
		dataAttributes,
		sanitizer,
		...rest
	} = {}) {
		/**
		 * @todo Remove legacy support for v1.0.0
		 */
		if (typeof sanitizer === 'object' && sanitizer !== null) {
			console.warn('Use of `sanitizer` in config is deprecated. Please set config directly.');
			html(this, content, sanitizer.getConfiguration instanceof Function
				? sanitizer.getConfiguration()
				: sanitizer);
		} else {
			html(this, content, { elements, attributes, comments, dataAttributes, ...rest });
		}
	};

	DocumentFragment.prototype.setHTML = function setHTML(...args) {
		Element.prototype.setHTML.apply(this, args);
	};

	HTMLTemplateElement.prototype.setHTML = function setHTML(html, config) {
		this.content.setHTML(html, config);
	};
}

if (! (Document.parseHTML instanceof Function)) {
	Document.parseHTML = function parseHTML(content, {
		elements,
		attributes,
		comments,
		dataAttributes,
		sanitizer,
		...rest
	} = {}) {
		/**
		 * @todo Remove legacy support for v1.0.0
		 */
		if (typeof sanitizer === 'object' && sanitizer !== null) {
			return Document.parseHTML(content, sanitizer.getConfiguration instanceof Function
				? sanitizer.getConfiguration()
				: sanitizer);
		} else {
			return parse(content, { elements, attributes, comments, dataAttributes, ...rest });
		}
	};
}
