import { elements as HTMLElements, attributes as HTMLAttributes } from './html.js';
import { elements as SVGElements, attributes as SVGAttributes } from './svg.js';
import { elements as MathMLElements, attributes as MathMLAttributes } from './mathml.js';

export const elements = Object.freeze([...HTMLElements, ...SVGElements, ...MathMLElements]);

export const attributes = Object.freeze(Array.from(new Set([...HTMLAttributes, ...SVGAttributes, ...MathMLAttributes])));

export const comments = false;

export const sanitizerConfig = Object.freeze({ elements, attributes, comments });
