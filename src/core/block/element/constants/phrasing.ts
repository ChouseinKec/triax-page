import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT, PHRASING_WITH_RUBY, VOID_CONTENT } from './shared';

const PHRASING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const PHRASING_ELEMENTS: Partial<ElementRecord> = {
	span: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Generic inline container with no semantic meaning. Useful for styling parts of text.',
	},
	b: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Stylistically offset text (typically bold) without conveying importance.',
	},
	strong: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Indicates strong importance, seriousness, or urgency.',
	},
	i: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Text in an alternate voice or mood (typically italic), such as technical terms or idioms.',
	},
	em: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Emphasized text indicating stress emphasis.',
	},
	u: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Text that is stylistically different from normal text (often underlined).',
	},
	small: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Side-comments and small print; typically rendered in a smaller font.',
	},
	mark: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Text highlighted for reference or relevance within a context.',
	},
	sub: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Subscript inline text for chemical formulas, math, etc.',
	},
	sup: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Superscript inline text for footnotes, exponents, etc.',
	},
	code: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Inline fragment of computer code.',
	},
	abbr: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Abbreviation or acronym; title attribute can provide expansion.',
	},
	s: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Text that is no longer accurate or relevant (rendered with a strikethrough).',
	},
	del: {
		attributes: [...PHRASING_ATTRIBUTES, 'cite', 'datetime'],
		allowedContent: PHRASING_CONTENT,
		description: 'A range of text that has been removed from a document. May carry cite/datetime meta.',
	},
	ins: {
		attributes: [...PHRASING_ATTRIBUTES, 'cite', 'datetime'],
		allowedContent: PHRASING_CONTENT,
		description: 'A range of text that has been added to a document. May carry cite/datetime meta.',
	},
	q: {
		attributes: [...PHRASING_ATTRIBUTES, 'cite'],
		allowedContent: PHRASING_CONTENT,
		description: 'Short inline quotation; cite attribute may reference the source.',
	},
	cite: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Title of a work or reference to a source.',
	},
	dfn: {
		attributes: [...PHRASING_ATTRIBUTES, 'title'],
		allowedContent: PHRASING_CONTENT,
		description: 'Term being defined; title attribute can provide a definition hint.',
	},
	var: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Variable in programming or mathematics.',
	},
	samp: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Sample output from programs or systems.',
	},
	kbd: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'User input, typically keyboard input.',
	},
	time: {
		attributes: [...PHRASING_ATTRIBUTES, 'datetime'],
		allowedContent: PHRASING_CONTENT,
		description: 'Date and/or time, optionally machine-readable via datetime attribute.',
	},
	data: {
		attributes: [...PHRASING_ATTRIBUTES, 'value'],
		allowedContent: PHRASING_CONTENT,
		description: 'Associates content with a machine-readable value.',
	},
	wbr: {
		attributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedContent: VOID_CONTENT,
		description: 'Word break opportunity (void element) suggesting where line breaks may occur.',
	},
	bdi: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Isolates a span of text with a different directionality from its surroundings.',
	},
	bdo: {
		attributes: [...PHRASING_ATTRIBUTES, 'dir'],
		allowedContent: PHRASING_CONTENT,
		description: 'Overrides the text direction of its children using the dir attribute.',
	},
	ruby: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_WITH_RUBY,
		description: 'Ruby annotation for East Asian typography. Contains base text with rt/rp annotations.',
	},
	rt: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Ruby text providing pronunciation or annotation.',
	},
	rp: {
		attributes: PHRASING_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Fallback parentheses for browsers that do not support ruby annotations.',
	},
};
