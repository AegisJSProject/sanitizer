import { createSanitizerPolicy } from '@aegisjsproject/sanitizer/trust.js';

export const policy = createSanitizerPolicy(new URL(
	document.currentScript instanceof HTMLScriptElement
		? new URL(document.currentScript.src || document.baseURI)
		: import.meta.url
).searchParams.get('policy')?? undefined);

export default policy;
