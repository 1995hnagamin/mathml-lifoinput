export type Elem = {
	tag: string;
	content: string | Elem[];
	attrs: Record<string, string>;
};

export const createElem = (tag: string, content: string | Elem[]): Elem => {
	return {
		tag: tag,
		content: content,
		attrs: {}
	};
};

export const addAttr = (elem: Elem, key: string, value: string): Elem => {
	return {
		tag: elem.tag,
		content: elem.content,
		attrs: {
			...elem.attrs,
			[key]: value
		}
	};
};
