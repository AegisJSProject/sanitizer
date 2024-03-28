import { elements as HTMLElements, attributes as HTMLAttributes } from '@aegisjsproject/sanitizer/config/html.js';
import { elements as SVGElements, attributes as SVGAttributes } from '@aegisjsproject/sanitizer/config/svg.js';
import { elements as MathMLElements, attributes as MathMLAttributes } from '@aegisjsproject/sanitizer/config/mathml.js';

export const elements = Object.freeze([...HTMLElements, ...SVGElements, ...MathMLElements]);

export const attributes = Object.freeze(Array.from(new Set([...HTMLAttributes, ...SVGAttributes, ...MathMLAttributes])));

export const comments = false;

export const sanitizer = Object.freeze({ elements, attributes, comments });
