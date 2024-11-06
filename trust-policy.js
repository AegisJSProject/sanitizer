import { createSanitizerPolicy } from '@aegisjsproject/sanitizer/trust.js';

function createPolicy() {
	try {
		const { searchParams } = new URL(import.meta.url);

		if (searchParams.has('policy')) {
			return createSanitizerPolicy(searchParams.get('policy'));
		} else {
			return trustedTypes.defaultPolicy ?? createSanitizerPolicy('default');
		}
	} catch {
		return trustedTypes.defaultPolicy;
	}
}

export const policy = createPolicy();

export default policy;
