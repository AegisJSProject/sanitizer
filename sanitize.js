import { sanitizer as sanitizerConfig } from '@aegisjsproject/sanitizer/config/html.js';
import { convertConfig, EVENT_ATTRS } from '@aegisjsproject/sanitizer/config-utils.js';
import { createPolicy } from '@aegisjsproject/sanitizer/trust.js';

const LINK_ATTRS = new Set(['href', 'src' , 'action', 'xlink:href']);
const ILLEGAL_PROTOCOLS = new Set(['javascript:', 'data:', 'file:', 'ftp:']);

const policy = createPolicy('aegis-sanitizer#html', { createHTML: input => input });

export function setHTML(el, content, { sanitizer = sanitizerConfig, allowInsecure = false } = {}) {
	const tmp = document.createElement('template');
	tmp.innerHTML = policy.createHTML(content);
	sanitize(tmp.content, sanitizer, allowInsecure);
	el.replaceChildren(tmp.content);
}

export function parseHTML(content, { sanitizer = sanitizerConfig, allowInsecure = false } = {}) {
	const doc = new DOMParser().parseFromString(policy.createHTML(content), 'text/html');
	sanitize(doc, sanitizer, allowInsecure);
	return doc;
}

export function sanitize(node, config = sanitizerConfig, allowInsecure = false) {
	if (! (node instanceof Node)) {
		throw new TypeError('Not a node.');
	} else {
		const converted = convertConfig(config);
		return sanitizeNode(node, converted, allowInsecure);
	}
}

function isAllowedElement(el, config) {
	return el.namespaceURI in config.elements
		&& config.elements[el.namespaceURI].some(opt => opt.name === el.localName);
}

function isIllegalURLAttr(attr) {
	if (! LINK_ATTRS.has(attr.name)) {
		return false;
	} else if (! URL.canParse(attr.value)) {
		return false;
	} else {
		const { protocol } = new URL(attr.value);
		return ILLEGAL_PROTOCOLS.has(protocol);
	}
}

const isScriptAttr = 'trustedTypes' in globalThis
	? attr => trustedTypes.getAttributeType(
		attr.ownerElement.tagName, attr.localName,
		attr.ownerElement.namespaceURI, attr.namespaceURI,
	) !== null
	: attr => EVENT_ATTRS.has(attr.localName);

function isAllowedAttr(attr, config, allowInsecure = false) {
	const ns = attr.namespaceURI || '';

	return (
		(! ('dataAttributes' in config) || config.dataAttributes)
		&& attr.name.startsWith('data-')
	) || (
		ns in config.attributes
		&& config.attributes[ns].some(opt => opt.name === attr.localName)
		&& ! (allowInsecure || isScriptAttr(attr))
		&& ! (allowInsecure || isIllegalURLAttr(attr))
	);
}

function sanitizeNode(node, config, allowInsecure = false) {
	switch(node.nodeType) {
		case Node.ELEMENT_NODE:
			sanitizeElement(node, config,  allowInsecure);
			break;

		case Node.DOCUMENT_NODE:
		case Node.DOCUMENT_FRAGMENT_NODE:
			sanitizeFragOrDoc(node, config, allowInsecure);
			break;

		case Node.COMMENT_NODE:
			sanitizeComment(node, config, allowInsecure);
			break;

		case Node.ATTRIBUTE_NODE:
			sanitizeAttr(node, config, allowInsecure);
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

function sanitizeElement(el, config, allowInsecure) {
	if (! isAllowedElement(el, config)) {
		el.remove();
	} else {
		if (el.hasAttributes()) {
			const attrs = el.attributes;

			for (let i = attrs.length - 1; i !== -1; i--) {
				sanitizeAttr(attrs[i], config, allowInsecure);
			}
		}

		if (el.tagName === 'TEMPLATE') {
			sanitizeFragOrDoc(el.content, config, allowInsecure);
		} else if (el.hasChildNodes()) {
			const childNodes = el.childNodes;

			for (let i = childNodes.length - 1; i !== -1; i--) {
				sanitizeNode(childNodes[i], config, allowInsecure);
			}
		}
	}
}

function sanitizeAttr(attr, config, allowInsecure = false) {
	if (! isAllowedAttr(attr, config,  allowInsecure) && attr.ownerElement instanceof Element) {
		attr.ownerElement.removeAttributeNode(attr);
	}
}

function sanitizeFragOrDoc(node, config,  allowInsecure = false) {
	if (node.hasChildNodes()) {
		const childNodes = node.childNodes;

		for (let i = childNodes.length - 1; i !== -1; i--) {
			sanitizeNode(childNodes[i], config, allowInsecure);
		}
	}
}

function sanitizeComment(node, config) {
	if (! config.comments) {
		node.remove();
	}
}
