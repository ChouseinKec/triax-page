// Types
import type { ElementDefinition } from '@/core/block/element/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, PHRASING_CONTENT, PHRASING_WITH_RUBY } from './shared';

const PHRASING_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const PHRASING_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'span',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Generic inline container with no semantic meaning. Useful for styling parts of text.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'b',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Stylistically offset text (typically bold) without conveying importance.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'strong',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Indicates strong importance, seriousness, or urgency.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'i',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Text in an alternate voice or mood (typically italic), such as technical terms or idioms.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'em',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Emphasized text indicating stress emphasis.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'u',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Text that is stylistically different from normal text (often underlined).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'small',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Side-comments and small print; typically rendered in a smaller font.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'mark',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Text highlighted for reference or relevance within a context.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'sub',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Subscript inline text for chemical formulas, math, etc.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'sup',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Superscript inline text for footnotes, exponents, etc.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'code',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Inline fragment of computer code.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'abbr',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Abbreviation or acronym; title attribute can provide expansion.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 's',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Text that is no longer accurate or relevant (rendered with a strikethrough).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'del',
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'cite', 'datetime'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'A range of text that has been removed from a document. May carry cite/datetime meta.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'ins',
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'cite', 'datetime'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'A range of text that has been added to a document. May carry cite/datetime meta.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'q',
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'cite'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Short inline quotation; cite attribute may reference the source.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'cite',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Title of a work or reference to a source.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'dfn',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Term being defined; title attribute can provide a definition hint.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'var',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Variable in programming or mathematics.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'samp',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Sample output from programs or systems.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'kbd',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'User input, typically keyboard input.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'time',
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'datetime'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Date and/or time, optionally machine-readable via datetime attribute.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'data',
		allowedAttributes: [...PHRASING_ATTRIBUTES, 'value'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Associates content with a machine-readable value.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'wbr',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Word break opportunity (void element) suggesting where line breaks may occur.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'bdi',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Isolates a span of text with a different directionality from its surroundings.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'bdo',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Overrides the text direction of its children using the dir attribute.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'ruby',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_WITH_RUBY,
		forbiddenAncestors: null,
		structure: null,
		description: 'Ruby annotation for East Asian typography. Contains base text with rt/rp annotations.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'rt',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Ruby text providing pronunciation or annotation.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'rp',
		allowedAttributes: PHRASING_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Fallback parentheses for browsers that do not support ruby annotations.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
