import { elements as HTMLElements, attributes as HTMLAttributes } from '@aegisjsproject/sanitizer/config/html.js';
import { elements as SVGElements,attributes as SVGAttributes } from '@aegisjsproject/sanitizer/config/svg.js';

export const elements = Object.freeze([...HTMLElements, ...SVGElements]);

export const attributes = Object.freeze(Array.from(new Set([...HTMLAttributes, ...SVGAttributes])));

export const comments = false;

export const dataAttributes = true;

export const sanitizer = Object.freeze({ elements, attributes, comments, dataAttributes });
