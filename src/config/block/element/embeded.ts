// Types
import type { ElementDefinition, ElementKey } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, PHRASING_CONTENT, FLOW_CONTENT } from './shared';

const PHRASING_WITH_MEDIA: ElementKey[] = [...PHRASING_CONTENT, 'source', 'track'];
const EMBEDDED_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

export const EMBEDDED_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'img',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'alt', 'src', 'srcSet', 'sizes', 'width', 'height', 'loading', 'decoding', 'crossorigin', 'referrerpolicy', 'fetchpriority'],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Image element (void). Displays raster graphics. No children.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'iframe',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'name', 'referrerpolicy', 'loading', 'width', 'height'],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Inline frame embedding an external HTML page (void element). No children.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'canvas',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'width', 'height'],
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Scriptable bitmap canvas with fallback content when scripting is disabled.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'audio',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'preload', 'autoplay', 'loop', 'muted', 'controls', 'crossorigin'],
		allowedChildren: PHRASING_WITH_MEDIA,
		forbiddenAncestors: null,
		structure: null,
		description: 'Audio player with optional source/track elements and fallback content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'video',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'preload', 'autoplay', 'loop', 'muted', 'controls', 'poster', 'width', 'height', 'crossorigin'],
		allowedChildren: PHRASING_WITH_MEDIA,
		forbiddenAncestors: null,
		structure: null,
		description: 'Video player with optional source/track elements and fallback content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'source',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'type', 'srcSet', 'sizes', 'media'],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Media resource for picture/video/audio (void element). No children.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'track',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'kind', 'src', 'srclang', 'label', 'default'],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Timed text track (captions, subtitles) for video/audio (void element).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'picture',
		allowedAttributes: EMBEDDED_ATTRIBUTES,
		allowedChildren: ['source', 'img'],
		forbiddenAncestors: null,
		structure: [{ key: 'img', order: null, min: 1, max: 1 }],
		description: 'Container for responsive images. Contains one img and zero or more source elements.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'object',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'type', 'name', 'form', 'width', 'height'],
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Generic external resource with fallback content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'embed',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'type', 'width', 'height'],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Container for external resources (void element).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'map',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'name'],
		allowedChildren: [...PHRASING_CONTENT, 'area'],
		forbiddenAncestors: null,
		structure: null,
		description: 'Image map defining clickable regions via area elements.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'area',
		allowedAttributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'alt', 'href', 'target', 'download', 'rel', 'referrerpolicy'],
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Clickable area within an image map (void element). No children.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'svg',
		allowedAttributes: EMBEDDED_ATTRIBUTES,
		allowedChildren: null,
		forbiddenAncestors: null,
		structure: null,
		description: 'Scalable Vector Graphics root element. Content model defined by SVG; any child elements allowed.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
];
