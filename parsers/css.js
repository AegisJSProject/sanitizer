export const createCSSParser = ({ media, disabled, baseURL } = {}) => (...args) => {
	const sheet = new CSSStyleSheet({ media, disabled, baseURL });
	sheet.replaceSync(String.raw.apply(null, args).trim());
	return sheet;
};

export const css = createCSSParser();
