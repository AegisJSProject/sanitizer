import { attributes as globalAttrs } from '@aegisjsproject/sanitizer/config/global.js';
import { elements as HTMLElements, htmlAttributes } from '@aegisjsproject/sanitizer/config/html.js';
import { elements as SVGElements, svgAttributes } from '@aegisjsproject/sanitizer/config/svg.js';

export const elements = Object.freeze([...HTMLElements, ...SVGElements]);

export const attributes = Object.freeze([...globalAttrs, ...htmlAttributes, ...svgAttributes]);

export const comments = false;

export const dataAttributes = true;

export const sanitizer = Object.freeze({ elements, attributes, comments, dataAttributes });
