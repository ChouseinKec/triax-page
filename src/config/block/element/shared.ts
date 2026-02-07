import type { AttributeKey } from '@/core/block/attribute/types';
import type { ElementKey } from '@/core/block/element/types';

// Core global attributes retained for basic elements
export const BASE_GLOBAL_ATTRIBUTES: AttributeKey[] = [
	'id', //
	'class',
	'title',
	'lang',
	'dir',
	'tabIndex',
	'hidden',
	'draggable',
	'contentEditable',
	'spellCheck',
	'accessKey',
	'inert',
	'translate',
];

// General (non-widget) ARIA attributes preserved
export const GENERAL_ARIA_ATTRIBUTES: AttributeKey[] = [
	'role', //
	'aria-label',
	'aria-labelledby',
	'aria-describedby',
	'aria-description',
	'aria-details',
	'aria-current',
	'aria-controls',
	'aria-hidden',
	'aria-live',
	'aria-atomic',
	'aria-busy',
	'aria-keyshortcuts',
	'aria-roledescription',
];

// Attributes specific to text-bearing inline elements
export const TEXT_ONLY_ATTRIBUTES: AttributeKey[] = ['text'];

// ============================================
// CONTENT MODEL PRESETS (shared)
// ============================================

// Flow content: broad set of block-level and inline elements for general containers
export const PHRASING_CONTENT: ElementKey[] = ['span', 'b', 'strong', 'i', 'em', 'u', 'small', 'mark', 'sub', 'sup', 'code', 'abbr', 's', 'del', 'ins', 'q', 'cite', 'dfn', 'var', 'samp', 'kbd', 'time', 'data', 'wbr', 'bdi', 'bdo', 'ruby', 'rt', 'rp', 'a'];

// Flow content: broad set of block-level and inline elements for general containers
export const FLOW_CONTENT: ElementKey[] = [
	// Sectioning and structural
	'div',
	'section',
	'article',
	'aside',
	'nav',
	'header',
	'footer',
	'main',
	'address',
	'hgroup',
	// Text containers and blocks
	'p',
	'pre',
	'blockquote',
	'figure',
	'figcaption',
	// Headings
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	// Lists
	'ul',
	'ol',
	'menu',
	'dl',
	'dt',
	'dd',
	// Forms and controls
	'form',
	'fieldset',
	'legend',
	'label',
	'input',
	'select',
	'textarea',
	'button',
	'datalist',
	'optgroup',
	'option',
	'output',
	'progress',
	'meter',
	// Interactive containers
	'details',
	'summary',
	'dialog',
	// Media and embedded
	'img',
	'video',
	'audio',
	'iframe',
	'canvas',
	'source',
	'track',
	'picture',
	'object',
	'embed',
	'map',
	'area',
	'svg',
	// Phrasing / inline semantics
	'a',
	'span',
	'b',
	'strong',
	'i',
	'em',
	'u',
	'small',
	'mark',
	'sub',
	'sup',
	'code',
	'abbr',
	's',
	'del',
	'ins',
	'q',
	'cite',
	'dfn',
	'var',
	'samp',
	'kbd',
	'time',
	'data',
	'wbr',
	'bdi',
	'bdo',
	'ruby',
	'rt',
	'rp',
	// Other voids
	'hr',
	'br',

	// Table
	'table',
];

// Metadata content: elements allowed in head for document metadata
export const METADATA_CONTENT: ElementKey[] = ['title', 'meta', 'link', 'style', 'script'];
