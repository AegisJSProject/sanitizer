import { SVG as SVGNS, XLINK, XML as XMLNS } from '@aegisjsproject/sanitizer/namespaces.js';
import { attributes as globalAttrs } from '@aegisjsproject/sanitizer/config/global.js';
import { normalizeAttr, normalizeElement } from '@aegisjsproject/sanitizer/config-utils.js';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element
 */

export const comments = true;

export const dataAttributes = true;

export const elements = Object.freeze([
	'a', 'animate', 'animateMotion', 'animateTransform', 'circle', 'clipPath',
	'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer',
	'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
	'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG',
	'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology',
	'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
	'feTurbulence', 'filter', 'foreignObject', 'g', 'line', 'linearGradient',
	'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline',
	'radialGradient', 'rect', 'script', 'set', 'stop', 'style', 'svg', 'switch',
	'symbol', 'text', 'textPath', 'title', 'tspan', 'view', 'missing-glyph', 'font',
	'font-face', 'font-face-format', 'font-face-name', 'font-face-src',
	'font-face-uri', 'hkern', 'vkern', 'glyph', 'glyphRef', 'tref', 'cursor', 'use',
].map(el => normalizeElement(el, SVGNS)));

export const attributes = Object.freeze([
	'accent-height', 'accumulate', 'additive', 'alignment-baseline',
	'alphabetic', 'amplitude', 'arabic-form', 'ascent', 'attributeName',
	'attributeType', 'azimuth', 'baseFrequency', 'baseline-shift', 'baseProfile',
	'bbox', 'begin', 'bias', 'by', 'calcMode', 'cap-height', 'class', 'clip',
	'clipPathUnits', 'clip-path', 'clip-rule', 'color', 'color-interpolation',
	'color-interpolation-filters', 'color-profile', 'color-rendering', 'crossorigin',
	'cursor', 'cx', 'cy', 'd', 'decelerate', 'descent', 'diffuseConstant', 'direction',
	'display', 'divisor', 'dominant-baseline', 'dur', 'dx', 'dy', 'edgeMode',
	'elevation', 'enable-background', 'end', 'exponent', 'fill', 'fill-opacity',
	'fill-rule', 'filter','filterUnits', 'flood-color', 'flood-opacity',
	'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style',
	'font-variant', 'font-weight', 'format', 'from', 'fr', 'fx', 'fy', 'g1', 'g2',
	'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical',
	'glyphRef', 'gradientTransform', 'gradientUnits', 'hanging', 'height', 'href',
	'hreflang', 'horiz-adv-x', 'horiz-origin-x', 'id', 'ideographic', 'image-rendering',
	'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kernelMatrix',
	'kernelUnitLength', 'kerning', 'keyPoints', 'keySplines', 'keyTimes', 'lang',
	'lengthAdjust', 'letter-spacing', 'lighting-color', 'limitingConeAngle', 'local',
	'marker-end', 'marker-mid', 'marker-start', 'markerHeight', 'markerUnits',
	'markerWidth', 'mask', 'maskContentUnits', 'maskUnits', 'mathematical', 'max',
	'media', 'method', 'min', 'mode', 'name', 'numOctaves', 'offset', 'opacity',
	'operator', 'order', 'orient', 'orientation', 'origin', 'overflow',
	'overline-position', 'overline-thickness', 'panose-1', 'paint-order',
	'path', 'pathLength', 'patternContentUnits', 'patternTransform', 'patternUnits',
	'ping', 'pointer-events', 'points', 'pointsAtX', 'pointsAtY', 'pointsAtZ',
	'preserveAlpha', 'preserveAspectRatio', 'primitiveUnits', 'r', 'radius',
	'referrerPolicy', 'refX', 'refY', 'rel', 'rendering-intent', 'repeatCount',
	'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'result',
	'rotate', 'rx', 'ry', 'scale', 'seed', 'shape-rendering', 'slope', 'spacing',
	'specularConstant', 'specularExponent', 'speed', 'spreadMethod', 'startOffset',
	'stdDeviation', 'stemh', 'stemv', 'stitchTiles', 'stop-color', 'stop-opacity',
	'strikethrough-position', 'strikethrough-thickness', 'string', 'stroke',
	'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin',
	'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'style', 'surfaceScale',
	'systemLanguage', 'tabindex', 'tableValues', 'target', 'targetX', 'targetY',
	'text-anchor', 'text-decoration', 'text-rendering', 'textLength', 'to', 'transform',
	'transform-origin', 'type', 'u1', 'u2', 'underline-position', 'underline-thickness',
	'unicode', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic',
	'v-hanging', 'v-ideographic', 'v-mathematical', 'values', 'vector-effect',
	'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'viewBox',
	'visibility', 'width', 'widths', 'word-spacing', 'writing-mode', 'x', 'x-height',
	'x1', 'x2', 'xChannelSelector', 'y', 'y1', 'y2', 'yChannelSelector', 'z',
	'zoomAndPan', 'autoReverse', 'accelerate', 'xmlns',
	{ name: 'actuate', namespace: XLINK },
	{ name: 'arcrole', namespaec: XLINK },
	{ name: 'href', namespace: XLINK },
	{ name: 'role', namespace: XLINK },
	{ name: 'show', namespace: XLINK },
	{ name: 'title', namespace: XLINK },
	{ name: 'type', namespace: XLINK },
	{ name: 'space', namespace: XMLNS },
].map(attr => normalizeAttr(attr)).concat(globalAttrs));

export const sanitizer = Object.freeze({ elements, attributes, comments, dataAttributes });

