import type { AttributeKeys, ElementDefinition, ElementTags } from '@/editors/block/types/core/attribute';

export function createElement(attributes: AttributeKeys[], allowedContent: ElementTags[] | null, description: string): ElementDefinition {
	return {
		attributes,
		allowedContent,
		description,
	};
}

// Common global attributes for all elements
export const GlobalAttributes: AttributeKeys[] = [
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
export const TextTags: ElementTags[] = ['p', 'span', 'b', 'strong', 'i', 'em', 'u', 'small', 'mark', 'sub', 'sup', 'code', 'abbr', 's', 'del', 'ins', 'q', 'cite', 'dfn'];

// Definitions for container-related tags (from container.tsx)
export const ContainerTags: ElementTags[] = ['div', 'section', 'article', 'aside', 'nav'];

export const ElementDefinitions: Record<ElementTags, ElementDefinition> = {
	// Text tags
	p: createElement(GlobalAttributes, TextTags, 'Paragraph element for text content.'),
	span: createElement(GlobalAttributes, TextTags, 'Generic inline container for phrasing content.'),
	b: createElement(GlobalAttributes, TextTags, 'Bold text.'),
	strong: createElement(GlobalAttributes, TextTags, 'Strong importance text.'),
	i: createElement(GlobalAttributes, TextTags, 'Italic text.'),
	em: createElement(GlobalAttributes, TextTags, 'Emphasized text.'),
	u: createElement(GlobalAttributes, TextTags, 'Underlined text.'),
	small: createElement(GlobalAttributes, TextTags, 'Smaller text.'),
	mark: createElement(GlobalAttributes, TextTags, 'Marked or highlighted text.'),
	sub: createElement(GlobalAttributes, TextTags, 'Subscript text.'),
	sup: createElement(GlobalAttributes, TextTags, 'Superscript text.'),
	code: createElement(GlobalAttributes, TextTags, 'Inline code fragment.'),
	abbr: createElement([...GlobalAttributes, 'title'], TextTags, 'Abbreviation or acronym.'),
	s: createElement(GlobalAttributes, TextTags, 'Strikethrough text.'),
	del: createElement([...GlobalAttributes, 'cite', 'datetime'], TextTags, 'Deleted text.'),
	ins: createElement([...GlobalAttributes, 'cite', 'datetime'], TextTags, 'Inserted text.'),
	q: createElement([...GlobalAttributes, 'cite'], TextTags, 'Short inline quotation.'),
	cite: createElement(GlobalAttributes, TextTags, 'Citation or reference.'),
	dfn: createElement([...GlobalAttributes, 'title'], TextTags, 'Definition term.'),

	// Container tags
	div: createElement(GlobalAttributes, ContainerTags, 'Generic container for flow content.'),
	section: createElement(GlobalAttributes, ContainerTags, 'Section of content.'),
	article: createElement(GlobalAttributes, ContainerTags, 'Self-contained composition.'),
	aside: createElement(GlobalAttributes, ContainerTags, 'Content aside from the main content.'),
	nav: createElement(GlobalAttributes, ContainerTags, 'Navigation links container.'),
} as const;
