import { elements as HTMLElements, attributes as HTMLAttributes } from './html.js';
import { elements as SVGElements,attributes as SVGAttributes } from './svg.js';

export const elements = Object.freeze([...HTMLElements, ...SVGElements]);

export const attributes = Object.freeze(Array.from(new Set([...HTMLAttributes, ...SVGAttributes])));

export const comments = false;

export const sanitizerConfig = Object.freeze({ elements, attributes, comments });
