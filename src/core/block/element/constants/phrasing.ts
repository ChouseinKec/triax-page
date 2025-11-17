import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT, PHRASING_WITH_RUBY, VOID_CONTENT } from './shared';

const PHRASING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const PHRASING_ELEMENTS: Partial<ElementRecord> = {
	span: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Generic inline container with no semantic meaning. Useful for styling parts of text.',
	},
	b: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Stylistically offset text (typically bold) without conveying importance.',
	},
	strong: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Indicates strong importance, seriousness, or urgency.',
	},
	i: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Text in an alternate voice or mood (typically italic), such as technical terms or idioms.',
	},
	em: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Emphasized text indicating stress emphasis.',
	},
	u: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Text that is stylistically different from normal text (often underlined).',
	},
	small: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Side-comments and small print; typically rendered in a smaller font.',
	},
	mark: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Text highlighted for reference or relevance within a context.',
	},
	sub: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Subscript inline text for chemical formulas, math, etc.',
	},
	sup: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Superscript inline text for footnotes, exponents, etc.',
	},
	code: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Inline fragment of computer code.',
	},
	abbr: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Abbreviation or acronym; title attribute can provide expansion.',
	},
	s: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Text that is no longer accurate or relevant (rendered with a strikethrough).',
	},
	del: {
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'cite', 'datetime'],
		allowedContent: PHRASING_CONTENT,
		description: 'A range of text that has been removed from a document. May carry cite/datetime meta.',
	},
	ins: {
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'cite', 'datetime'],
		allowedContent: PHRASING_CONTENT,
		description: 'A range of text that has been added to a document. May carry cite/datetime meta.',
	},
	q: {
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'cite'],
		allowedContent: PHRASING_CONTENT,
		description: 'Short inline quotation; cite attribute may reference the source.',
	},
	cite: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Title of a work or reference to a source.',
	},
	dfn: {
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'title'],
		allowedContent: PHRASING_CONTENT,
		description: 'Term being defined; title attribute can provide a definition hint.',
	},
	var: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Variable in programming or mathematics.',
	},
	samp: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Sample output from programs or systems.',
	},
	kbd: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'User input, typically keyboard input.',
	},
	time: {
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'datetime'],
		allowedContent: PHRASING_CONTENT,
		description: 'Date and/or time, optionally machine-readable via datetime attribute.',
	},
	data: {
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'value'],
		allowedContent: PHRASING_CONTENT,
		description: 'Associates content with a machine-readable value.',
	},
	wbr: {
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedContent: VOID_CONTENT,
		description: 'Word break opportunity (void element) suggesting where line breaks may occur.',
	},
	bdi: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Isolates a span of text with a different directionality from its surroundings.',
	},
	bdo: {
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'dir'],
		allowedContent: PHRASING_CONTENT,
		description: 'Overrides the text direction of its children using the dir attribute.',
	},
	ruby: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_WITH_RUBY,
		description: 'Ruby annotation for East Asian typography. Contains base text with rt/rp annotations.',
	},
	rt: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Ruby text providing pronunciation or annotation.',
	},
	rp: {
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Fallback parentheses for browsers that do not support ruby annotations.',
	},
};
