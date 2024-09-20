import { HTML as HTMLNS } from '@aegisjsproject/sanitizer/namespaces.js';

export const EVENT_ATTRS = new Set(('HTMLElement' in globalThis
	? Object.keys(HTMLElement.prototype) : [])
	.filter(name => name.startsWith('on')));

export function normalizeElement(opt, defaultNS = HTMLNS) {
	if (typeof opt === 'string') {
		return Object.freeze({ name: opt, namespace: defaultNS });
	} else if (typeof opt === 'object' && typeof opt.name === 'string') {
		const { name, namespace = defaultNS, attributes } = opt;
		return Object.freeze({
			name,
			namespace: typeof namespace === 'string' && namespace.length !== 0 ? namespace : defaultNS,
			attributes,
		});
	} else {
		throw new TypeError('Invalid config entry for `elements`.');
	}
}

function normalizeElementsConfig({ elements, allowElements }, defaultNS = HTMLNS) {
	if (Array.isArray(allowElements)) {
		console.warn('Use of `allowElements` is deprecated. Please use `elements` instead.');
		return normalizeElementsConfig({ elements: allowElements }, defaultNS);
	} else if (! Array.isArray(elements)) {
		throw new TypeError('`elements` expected to be an array.');
	} else {
		return elements.map(opt => normalizeElement(opt, defaultNS));
	}
}

export function normalizeAttr(opt, defaultNS) {
	if (typeof opt === 'string') {
		return Object.freeze({ name: opt, namespace: defaultNS });
	} else if (typeof opt === 'object' && typeof opt.name === 'string') {
		const { name, namespace = defaultNS, elements, ...rest } = opt;
		return Object.freeze({
			name,
			namespace: typeof namespace === 'string' ? namespace : defaultNS,
			elements,
			...rest
		});
	} else {
		throw new TypeError('Invalid entry in `attributes` config.');
	}
}

function normalizeAttrsConfig({ attributes, allowAttributes }, defaultNS) {
	if (typeof allowAttributes !== 'undefined') {
		console.warn('Use of `allowAttributes` is deprecated. Please use `attributes` instead.');
		return normalizeAttrsConfig({ attributes: allowAttributes }, defaultNS);
	} else if (Array.isArray(attributes)) {
		return attributes.map(opt => normalizeAttr(opt, defaultNS));
	} else if (typeof attributes === 'object' && attributes !== null) {
		console.warn('`attributes` should be an array, not an oobject.');
		return normalizeAttrsConfig({
			attributes: Object.entries(attributes).map(([name, elements]) => ({ name, elements })),
		}, defaultNS);
	} else {
		throw new TypeError('`attributes` expected to be an array.');
	}
}

function normalizeCommentsConfig({ comments, allowComments }) {
	if (typeof allowComments === 'boolean') {
		console.warn('Use of `allowComments` is deprecated. Please use `comments` instead.');
		return allowComments;
	} else if (typeof comments === 'boolean') {
		return comments;
	} else {
		return true;
	}
}

export function normalizeConfig(config, {
	elementNS = HTMLNS,
	attributeNS,
} = {}) {
	const {
		elements,
		attributes,
		allowElements,
		allowAttributes,
		comments = false,
		allowComments,
		dataAttributes = true,
		...rest
	} = config;
	const cfg = {
		elements: normalizeElementsConfig({ elements, allowElements }, elementNS),
		attributes: normalizeAttrsConfig({ attributes, allowAttributes }, attributeNS),
		comments: comments || allowComments,
		dataAttributes,
		...rest,
	};

	return cfg;
}

function convertAttrConfig({ attributes, allowAttributes }, defaultNS) {
	return Object.freeze(
		Object.groupBy(
			normalizeAttrsConfig({ attributes, allowAttributes }, defaultNS),
			({ namespace }) => namespace ?? ''
		)
	);
}

function convertElementConfig({ elements, allowElements }, defaultNS = HTMLNS) {
	return Object.freeze(
		Object.groupBy(
			normalizeElementsConfig({ elements, allowElements }, defaultNS),
			({ namespace }) => namespace
		)
	);
}

export function convertConfig(config, {
	elementNS = HTMLNS,
	attributeNS,
} = {}) {
	if (typeof config !== 'object' || config === null) {
		throw new TypeError('Sanitizer config must be an object.');
	} else if (config.get instanceof Function) {
		return convertConfig(config.get());
	} else {
		return Object.freeze({
			elements: convertElementConfig(config, elementNS),
			attributes: convertAttrConfig(config, attributeNS),
			comments: normalizeCommentsConfig(config),
			dataAttributes: typeof config.dataAttributes === 'undefined' ? true : config.dataAttributes,
		});
	}
}
