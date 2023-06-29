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

export const output = (stream: string[], indent: number, elem: Elem): void => {
	stream.push(' '.repeat(indent * 2));
	stream.push('<', elem.tag);
	for (const [key, value] of Object.entries(elem.attrs)) {
		stream.push(' ', key, '="', value, '"');
	}
	stream.push('>');
	if (typeof elem.content === 'string') {
		stream.push(elem.content);
	} else {
		for (const child of elem.content) {
			stream.push('\n');
			output(stream, indent + 1, child);
		}
		stream.push('\n', ' '.repeat(indent * 2));
	}
	stream.push('</', elem.tag, '>');
};

export const stringify = (elem: Elem): string => {
	const stream: string[] = [];
	output(stream, 0, elem);
	return stream.join('');
};
