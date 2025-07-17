// Types
import type { BlockTagData, BlockTagKeys, BlockTagType } from '@/types/block/tag';

// Constants
import { FlowContent, PalpableContent, SectioningContent, HeadingContent, PhrasingContent, EmbeddedContent, InteractiveContent, FormContent } from './content';

/**
 * Helper function to create a BlockTagData object.
 * @param tag - The HTML tag name (e.g., 'div', 'p').
 * @param permittedContent - An array of tags that can be nested inside this block, or null if any content is allowed.
 * @param permittedParent - An array of tags that can contain this block, or null if any parent is allowed.
 * @param type - The type of content this block represents (flow, phrasing, sectioning, etc.).
 * @param permittedRawText - Whether this block can contain raw text content.
 * @param permittedRichText - Whether this block can contain rich text content.
 * @returns A BlockTagData object representing the block-level tag.
 */
const createBlock = (tag: BlockTagKeys, permittedContent: BlockTagKeys[] | null, permittedParent: BlockTagKeys[] | null, type: BlockTagType, permittedRawText?: boolean, permittedRichText?: boolean): BlockTagData => ({
	tag,
	permittedContent,
	permittedParent,
	permittedRawText,
	permittedRichText,
	type,
});

/**
 * A lookup table of all supported HTML block-level tags and their metadata.
 * Each entry is a BlockTagData object describing the tag's name, permitted content, parents, raw text, rich text, and type.
 */
export const BlockTagDefinitions = {
	a: createBlock('a', PhrasingContent, FlowContent, 'interactive', true, true),
	abbr: createBlock('abbr', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	address: createBlock('address', FlowContent, FlowContent, 'flow', false, false),
	article: createBlock('article', FlowContent, FlowContent, 'sectioning', false, false),
	aside: createBlock('aside', FlowContent, FlowContent, 'sectioning', false, false),
	audio: createBlock('audio', FlowContent, FlowContent, 'embedded', false, false),
	b: createBlock('b', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	blockquote: createBlock('blockquote', FlowContent, FlowContent, 'flow', false, false),
	br: createBlock('br', null, PhrasingContent, 'phrasing', false, false),
	button: createBlock('button', PhrasingContent, FlowContent, 'interactive', true, true),
	code: createBlock('code', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	data: createBlock('data', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	del: createBlock('del', PhrasingContent, FlowContent, 'phrasing', true, true),
	div: createBlock('div', FlowContent, FlowContent, 'flow', false, false),
	dl: createBlock('dl', ['dt', 'dd'], FlowContent, 'flow', false, false),
	em: createBlock('em', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	footer: createBlock('footer', FlowContent, FlowContent, 'flow', false, false),
	h1: createBlock('h1', PhrasingContent, SectioningContent, 'heading', true, true),
	h2: createBlock('h2', PhrasingContent, SectioningContent, 'heading', true, true),
	h3: createBlock('h3', PhrasingContent, SectioningContent, 'heading', true, true),
	h4: createBlock('h4', PhrasingContent, SectioningContent, 'heading', true, true),
	h5: createBlock('h5', PhrasingContent, SectioningContent, 'heading', true, true),
	h6: createBlock('h6', PhrasingContent, SectioningContent, 'heading', true, true),
	header: createBlock('header', FlowContent, FlowContent, 'flow', false, false),
	hgroup: createBlock('hgroup', HeadingContent, FlowContent, 'heading', false, false),
	hr: createBlock('hr', null, FlowContent, 'flow', false, false),
	i: createBlock('i', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	image: createBlock('image', null, FlowContent, 'embedded', false, false),
	input: createBlock('input', null, FlowContent, 'interactive', false, false),
	ins: createBlock('ins', PhrasingContent, FlowContent, 'phrasing', true, true),
	kbd: createBlock('kbd', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	label: createBlock('label', PhrasingContent, FlowContent, 'interactive', true, true),
	main: createBlock('main', FlowContent, FlowContent, 'flow', false, false),
	mark: createBlock('mark', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	menu: createBlock('menu', ['li'], FlowContent, 'flow', false, false),
	meter: createBlock('meter', PhrasingContent, FlowContent, 'phrasing', false, false),
	nav: createBlock('nav', FlowContent, FlowContent, 'sectioning', false, false),
	section: createBlock('section', FlowContent, FlowContent, 'sectioning', false, false),
	ol: createBlock('ol', ['li'], FlowContent, 'flow', false, false),
	output: createBlock('output', PhrasingContent, FlowContent, 'phrasing', true, true),
	p: createBlock('p', PhrasingContent, FlowContent, 'flow', true, true),
	picture: createBlock('picture', ['img'], FlowContent, 'embedded', false, false),
	pre: createBlock('pre', PhrasingContent, FlowContent, 'flow', true, false),
	q: createBlock('q', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	samp: createBlock('samp', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	small: createBlock('small', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	span: createBlock('span', PhrasingContent, FlowContent, 'phrasing', true, true),
	strong: createBlock('strong', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	sub: createBlock('sub', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	sup: createBlock('sup', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	table: createBlock('table', ['caption', 'colgroup', 'thead', 'tbody', 'tfoot', 'tr'], FlowContent, 'flow', false, false),
	textarea: createBlock('textarea', null, FlowContent, 'form', true, false),
	time: createBlock('time', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	u: createBlock('u', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	var: createBlock('var', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	wbr: createBlock('wbr', null, PhrasingContent, 'phrasing', false, false),
	video: createBlock('video', FlowContent, FlowContent, 'embedded', false, false),
	ul: createBlock('ul', ['li'], FlowContent, 'flow', false, false),
	li: createBlock('li', FlowContent, ['ul', 'ol', 'menu'], 'flow', true, true),
	dt: createBlock('dt', PhrasingContent, ['dl'], 'flow', true, true),
	dd: createBlock('dd', FlowContent, ['dl'], 'flow', true, true),
	caption: createBlock('caption', FlowContent, ['table'], 'flow', true, true),
	colgroup: createBlock('colgroup', ['col'], ['table'], 'flow', false, false),
	col: createBlock('col', null, ['colgroup'], 'flow', false, false),
	thead: createBlock('thead', ['tr'], ['table'], 'flow', false, false),
	tbody: createBlock('tbody', ['tr'], ['table'], 'flow', false, false),
	tfoot: createBlock('tfoot', ['tr'], ['table'], 'flow', false, false),
	tr: createBlock('tr', ['td', 'th'], ['thead', 'tbody', 'tfoot', 'table'], 'flow', false, false),
	td: createBlock('td', FlowContent, ['tr'], 'flow', true, true),
	th: createBlock('th', FlowContent, ['tr'], 'flow', true, true),
	form: createBlock('form', FlowContent, FlowContent, 'form', false, false),
	select: createBlock('select', ['option', 'optgroup'], FlowContent, 'form', false, false),
	fieldset: createBlock('fieldset', FlowContent, ['form'], 'form', false, false),
	legend: createBlock('legend', PhrasingContent, ['fieldset'], 'form', true, true),
	optgroup: createBlock('optgroup', ['option'], ['select'], 'form', false, false),
	option: createBlock('option', null, ['select', 'optgroup'], 'form', true, false),
	progress: createBlock('progress', PhrasingContent, FlowContent, 'phrasing', false, false),
	img: createBlock('img', null, FlowContent, 'embedded', false, false),
	s: createBlock('s', PhrasingContent, PhrasingContent, 'phrasing', true, true),
	cite: createBlock('cite', PhrasingContent, PhrasingContent, 'phrasing', true, true),
} as const;
