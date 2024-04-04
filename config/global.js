import { normalizeAttr } from '@aegisjsproject/sanitizer/config-utils.js';

export const attributes = Object.freeze([
	'accesskey', 'autocapitalize', 'autofocus', 'class', 'contenteditable',
	'dir', 'draggable', 'enterkeyhint', 'exportparts', 'hidden', 'id',
	'inert', 'inputmode', 'itemid', 'itemprop', 'itemref',
	'itemscope', 'itemtype', 'lang', 'part', 'popover',
	'slot', 'spellcheck', 'tabindex', 'title', 'translate',
	'virtualkeyboardpolicy',
	/**
	 * Aria-Attributes
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/
	 */
	'aria-keyshortcuts', 'aria-activedescendant', 'aria-atomic', 'aria-autocomplete',
	'aria-braillelabel', 'aria-brailleroledescription', 'aria-busy', 'aria-checked',
	'aria-colcount', 'aria-colindex', 'aria-colindextext', 'aria-colspan',
	'aria-controls', 'aria-current', 'aria-describedby', 'aria-description',
	'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
	'aria-expanded', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden',
	'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-level',
	'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation',
	'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed',
	'aria-readonly', 'aria-relevant', 'aria-required', 'aria-roledescription',
	'aria-rowcount', 'aria-rowindex', 'aria-rowindextext', 'aria-rowspan',
	'aria-selected', 'aria-setsize', 'aria-sort', 'aria-valuemax', 'aria-valuemin',
	'aria-valuenow', 'aria-valuetext',
].map(attr => normalizeAttr(attr)));
