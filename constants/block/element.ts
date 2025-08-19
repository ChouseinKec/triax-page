import type { HTMLPropertyKey } from '@/types/block/attribute/property';
import type { HTMLElementDefinition, HTMLElementTag } from '@/types/block/element';

export const createElement = (attributes: HTMLPropertyKey[], allowedContent: HTMLElementTag[] | null, description: string): HTMLElementDefinition => ({
	attributes,
	allowedContent,
	description,
});

// Common global attributes for all elements
const globalAttributes: HTMLPropertyKey[] = [
	'accessKey',
	'autoFocus',
	'class',
	'contentEditable',
	'dir',
	'draggable',
	'enterKeyHint',
	'hidden',
	'id',
	'inert',
	'inputMode',
	'itemid',
	'itemprop',
	'itemref',
	'itemscope',
	'itemtype',
	'lang',
	'popover',
	'spellCheck',
	'tabIndex',
	'title',
	'translate',

	// ARIA attributes
	'role',
	'aria-atomic',
	'aria-busy',
	'aria-controls',
	'aria-current',
	'aria-describedby',
	'aria-description',
	'aria-details',
	'aria-disabled',
	'aria-dropeffect',
	'aria-errormessage',
	'aria-flowto',
	'aria-grabbed',
	'aria-haspopup',
	'aria-hidden',
	'aria-invalid',
	'aria-keyshortcuts',
	'aria-label',
	'aria-labelledby',
	'aria-live',
	'aria-owns',
	'aria-relevant',
	'aria-roledescription',

	// Custom for editor
	'text',
];

// Definitions for text-related tags (from text.tsx)
const textTags: HTMLElementTag[] = ['p', 'span', 'b', 'strong', 'i', 'em', 'u', 'small', 'mark', 'sub', 'sup', 'code', 'abbr', 's', 'del', 'ins', 'q', 'cite', 'dfn'];

// Definitions for container-related tags (from container.tsx)
const containerTags: HTMLElementTag[] = ['div', 'section', 'article', 'aside', 'nav'];

export const HTMLElementDefinitions: Record<HTMLElementTag, HTMLElementDefinition> = {
	// Text tags
	p: createElement(globalAttributes, textTags, 'Paragraph element for text content.'),
	span: createElement(globalAttributes, textTags, 'Generic inline container for phrasing content.'),
	b: createElement(globalAttributes, textTags, 'Bold text.'),
	strong: createElement(globalAttributes, textTags, 'Strong importance text.'),
	i: createElement(globalAttributes, textTags, 'Italic text.'),
	em: createElement(globalAttributes, textTags, 'Emphasized text.'),
	u: createElement(globalAttributes, textTags, 'Underlined text.'),
	small: createElement(globalAttributes, textTags, 'Smaller text.'),
	mark: createElement(globalAttributes, textTags, 'Marked or highlighted text.'),
	sub: createElement(globalAttributes, textTags, 'Subscript text.'),
	sup: createElement(globalAttributes, textTags, 'Superscript text.'),
	code: createElement(globalAttributes, textTags, 'Inline code fragment.'),
	abbr: createElement([...globalAttributes, 'title'], textTags, 'Abbreviation or acronym.'),
	s: createElement(globalAttributes, textTags, 'Strikethrough text.'),
	del: createElement([...globalAttributes, 'cite', 'datetime'], textTags, 'Deleted text.'),
	ins: createElement([...globalAttributes, 'cite', 'datetime'], textTags, 'Inserted text.'),
	q: createElement([...globalAttributes, 'cite'], textTags, 'Short inline quotation.'),
	cite: createElement(globalAttributes, textTags, 'Citation or reference.'),
	dfn: createElement([...globalAttributes, 'title'], textTags, 'Definition term.'),

	// Container tags
	div: createElement(globalAttributes, containerTags, 'Generic container for flow content.'),
	section: createElement(globalAttributes, containerTags, 'Section of content.'),
	article: createElement(globalAttributes, containerTags, 'Self-contained composition.'),
	aside: createElement(globalAttributes, containerTags, 'Content aside from the main content.'),
	nav: createElement(globalAttributes, containerTags, 'Navigation links container.'),
} as const;
