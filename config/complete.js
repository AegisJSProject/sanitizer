import { attributes as globalAttrs } from '@aegisjsproject/sanitizer/config/global.js';
import { elements as HTMLElements, htmlAttributes } from '@aegisjsproject/sanitizer/config/html.js';
import { elements as SVGElements, svgAttributes } from '@aegisjsproject/sanitizer/config/svg.js';
import { elements as MathMLElements, mathAttributes } from '@aegisjsproject/sanitizer/config/mathml.js';

export const elements = Object.freeze([...HTMLElements, ...SVGElements, ...MathMLElements]);

export const attributes = Object.freeze([...globalAttrs, ...htmlAttributes, ...svgAttributes, ...mathAttributes]);

export const comments = true;

export const dataAttributes = true;

export const sanitizer = Object.freeze({ elements, attributes, comments, dataAttributes });
