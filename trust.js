export function createPolicy(name, { createHTML: html, createScript: script, createScriptURL: scriptURL }) {
	if ('trustedTypes' in globalThis) {
		return trustedTypes.createPolicy(name, { createHTML: html, createScript: script, createScriptURL: scriptURL });
	} else {
		return Object.freeze({
			[Symbol.for('policy-name')]: name.toString(),
			createHTML(input, ...args) {
				if (html instanceof Function) {
					const result = html(input.toString(), ...args).toString();
					return Object.freeze({
						toString() {
							return result;
						}
					});
				} else {
					throw new TypeError(`Policy "${name}" does not provide a createHTML method.`);
				}
			},
			createScript(input, ...args) {
				if (script instanceof Function) {
					const result = script(input.toString(), ...args).toString();
					return Object.freeze({
						toString() {
							return result;
						}
					});
				} else {
					throw new TypeError(`Policy "${name}" does not provide a createScript method.`);
				}
			},
			createScriptURL(input, ...args) {
				if (scriptURL instanceof Function) {
					const result = scriptURL(input.toString(), ...args).toString();
					return Object.freeze({
						toString() {
							return result;
						}
					});
				} else {
					throw new TypeError(`Policy "${name}" does not provide a createScriptURL method.`);
				}
			},
		});
	}
}

export function createSanitizerPolicy(name = 'aegis#html', { defaultConfig = {} }= {}) {
	return createPolicy(name, {
		createHTML(input, {
			elements = defaultConfig.elements,
			attributes = defaultConfig.attributes,
			comments = defaultConfig.comments,
			dataAttributes = defaultConfig.dataAttributes,
			...rest
		}  = defaultConfig) {
			const el = document.createElement('div');
			el.setHTML(input, { sanitizer: { elements, attributes, comments, dataAttributes, ...rest }});
			return el.innerHTML;
		}
	});
}
