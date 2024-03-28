import { MATHML as MATHNS } from '@aegisjsproject/sanitizer/namespaces.js';
import { attributes as globalAttrs } from '@aegisjsproject/sanitizer/config/global.js';
import { normalizeAttr, normalizeElement } from '@aegisjsproject/sanitizer/config-utils.js';

export const comments = false;

/**
 *@see https://developer.mozilla.org/en-US/docs/Web/MathML/Element
 */
export const elements = Object.freeze([
	'math', 'maction', 'annotation', 'annotation-xml', 'menclose', 'merror',
	'mfenced', 'mfrac', 'mi', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded',
	'mphantom', 'mprescripts', 'mroot', 'mrow', 'ms', 'semantics', 'mspace',
	'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext',
	'mtr', 'munder', 'munderover',
].map(el => normalizeElement(el, MATHNS)));

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/MathML/Attribute
 */
export const attributes = Object.freeze([
	'accent', 'accentunder', 'actiontype', 'align',
	'background', 'close', 'color', 'columnalign', 'columnlines', 'columnspacing',
	'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'fence',
	'fontfamily', 'fontsize', 'fontstyle', 'fontweight', 'frame', 'framespacing',
	'height', 'href', 'id', 'linethickness', 'lspace', 'lquote', 'mathbackground',
	'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits',
	'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan',
	'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier',
	'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'superscriptshift',
	'symmetric', 'voffset', 'width', 'xmlns',
].map(attr => normalizeAttr(attr, '')).concat(globalAttrs));

export const sanitizer = Object.freeze({ elements, attributes, comments });
