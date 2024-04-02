import { sanitizer as sanitizerConfig } from '@aegisjsproject/sanitizer/config/html.js';
import { convertConfig, EVENT_ATTRS } from '@aegisjsproject/sanitizer/config-utils.js';

const LINK_ATTRS = new Set(['href', 'src' , 'action']);
const ILLEGAL_PROTOCOLS = new Set(['javascript:', 'data:', 'file:', 'ftp:']);

function createPolicy(name, { createHTML, createScript, createScriptURL }) {
	if ('trustedTypes' in globalThis) {
		return globalThis.trustedTypes.createPolicy(name, { createHTML, createScript, createScriptURL });
	} else {
		return Object.freeze({
			[Symbol.for('policy-name')]: name,
			createHTML: createHTML instanceof Function
				? (input, ...args) => createHTML(input.toString(), ...args).toString()
				: null,
			createScript: createScript instanceof Function
				? (input, ...args) => createScript(input.toString(), ...args).toString()
				: null,
			createScriptURL: createScriptURL instanceof Function
				? (input, ...args) => createScriptURL(input.toString(), ...args).toString()
				: null,
		});
	}
}

const policy = createPolicy('aegis-sanitizer#html', { createHTML: input => input });

export function setHTML(el, content, { sanitizer = sanitizerConfig } = {}) {
	const tmp = document.createElement('template');
	tmp.innerHTML = policy.createHTML(content);
	sanitize(tmp.content, sanitizer);
	el.replaceChildren(tmp.content);
}

export function parseHTML(content, { sanitizer = sanitizerConfig } = {}) {
	const doc = new DOMParser().parseFromString(policy.createHTML(content), 'text/html');
	sanitize(doc, sanitizer);
	return doc;
}

export function sanitize(node, config = sanitizerConfig) {
	if (! (node instanceof Node)) {
		throw new TypeError('Not a node.');
	} else {
		const converted = convertConfig(config);
		return sanitizeNode(node, converted);
	}
}

function isAllowedElement(el, config) {
	return el.namespaceURI in config.elements
		&& config.elements[el.namespaceURI].some(opt => opt.name === el.localName);
}

function isIllegalURLAttr(attr) {
	if (! LINK_ATTRS.has(attr.localName)) {
		return false;
	} else if (! URL.canParse(attr.value)) {
		return false;
	} else {
		const { protocol } = new URL(attr.value);
		return ILLEGAL_PROTOCOLS.has(protocol);
	}
}

function isAllowedAttr(attr, config) {
	const ns = attr.namespaceURI || '';

	return attr.name.startsWith('data-') || (
		ns in config.attributes
		&& config.attributes[ns].some(opt => opt.name === attr.localName)
		&& ! EVENT_ATTRS.has(attr.localName)
		&& ! isIllegalURLAttr(attr)
	);
}

function sanitizeNode(node, config) {
	switch(node.nodeType) {
		case Node.ELEMENT_NODE:
			sanitizeElement(node, config);
			break;

		case Node.DOCUMENT_NODE:
		case Node.DOCUMENT_FRAGMENT_NODE:
			sanitizeFragOrDoc(node, config);
			break;

		case Node.COMMENT_NODE:
			sanitizeComment(node, config);
			break;

		case Node.ATTRIBUTE_NODE:
			sanitizeAttr(node, config);
			break;

		case Node.TEXT_NODE:
		case Node.DOCUMENT_TYPE_NODE:
			break;

		default:
			if (node.ownerElement instanceof Element) {
				node.ownerElement.removeChild(node);
			}
	}
}

function sanitizeElement(el, config) {
	if (! isAllowedElement(el, config)) {
		el.remove();
	} else {
		if (el.hasAttributes()) {
			const attrs = el.attributes;

			for (let i = attrs.length - 1; i !== -1; i--) {
				sanitizeAttr(attrs[i], config);
			}
		}

		if (el.tagName === 'TEMPLATE') {
			sanitizeFragOrDoc(el.content, config);
		} else if (el.hasChildNodes()) {
			const childNodes = el.childNodes;

			for (let i = childNodes.length - 1; i !== -1; i--) {
				sanitizeNode(childNodes[i], config);
			}
		}
	}
}

function sanitizeAttr(attr, config) {
	if (! isAllowedAttr(attr, config) && attr.ownerElement instanceof Element) {
		attr.ownerElement.removeAttributeNode(attr);
	}
}

function sanitizeFragOrDoc(node, config) {
	if (node.hasChildNodes()) {
		const childNodes = node.childNodes;

		for (let i = childNodes.length - 1; i !== -1; i--) {
			sanitizeNode(childNodes[i], config);
		}
	}
}

function sanitizeComment(node, config) {
	if (! config.comments) {
		node.remove();
	}
}
