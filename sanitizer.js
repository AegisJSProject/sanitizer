import './polyfill.js';
export { htmlConfig, svgConfig, mathMLConfig, baseConfig, allConfig } from './config.js';
export { normalizeConfig } from './config-utils.js';
export { setHTML, parseHTML, sanitize } from './sanitize.js';
export { HTML as HTMLNS, SVG as SVGNS, MATHML as MATHMLNS } from './namespaces.js';
