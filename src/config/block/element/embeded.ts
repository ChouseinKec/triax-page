// Types
import type { ElementDefinition } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Shared
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, PHRASING_CONTENT, PHRASING_WITH_MEDIA, PICTURE_CONTENT, FLOW_CONTENT, PHRASING_WITH_AREA } from './shared';

const EMBEDDED_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

const IMAGE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'alt', 'src', 'srcset', 'sizes', 'width', 'height', 'loading', 'decoding', 'crossorigin', 'referrerpolicy', 'fetchpriority'];

const IFRAME_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'name', 'referrerpolicy', 'loading', 'width', 'height'];

const CANVAS_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'width', 'height'];

const AUDIO_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'preload', 'autoplay', 'loop', 'muted', 'controls', 'crossorigin'];

const VIDEO_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'preload', 'autoplay', 'loop', 'muted', 'controls', 'poster', 'width', 'height', 'crossorigin'];

const SOURCE_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'type', 'srcset', 'sizes', 'media'];

const TRACK_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'kind', 'src', 'srclang', 'label', 'default'];

const OBJECT_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'type', 'name', 'form', 'width', 'height'];

const EMBED_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'src', 'type', 'width', 'height'];

const MAP_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'name'];

const AREA_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, 'alt', 'href', 'target', 'download', 'rel', 'referrerpolicy'];

export const EMBEDDED_DEFINITIONS: ElementDefinition[] = [
	{
		key: 'img',
		allowedAttributes: IMAGE_ATTRIBUTES,
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Image element (void). Displays raster graphics. No children.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'iframe',
		allowedAttributes: IFRAME_ATTRIBUTES,
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Inline frame embedding an external HTML page (void element). No children.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'canvas',
		allowedAttributes: CANVAS_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Scriptable bitmap canvas with fallback content when scripting is disabled.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'audio',
		allowedAttributes: AUDIO_ATTRIBUTES,
		allowedChildren: PHRASING_WITH_MEDIA,
		forbiddenAncestors: null,
		structure: null,
		description: 'Audio player with optional source/track elements and fallback content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'video',
		allowedAttributes: VIDEO_ATTRIBUTES,
		allowedChildren: PHRASING_WITH_MEDIA,
		forbiddenAncestors: null,
		structure: null,
		description: 'Video player with optional source/track elements and fallback content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'source',
		allowedAttributes: SOURCE_ATTRIBUTES,
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Media resource for picture/video/audio (void element). No children.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'track',
		allowedAttributes: TRACK_ATTRIBUTES,
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
		allowedChildren: PICTURE_CONTENT,
		forbiddenAncestors: null,
		structure: [{ key: 'img', order: null, min: 1, max: 1 }],
		description: 'Container for responsive images. Contains one img and zero or more source elements.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'object',
		allowedAttributes: OBJECT_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		structure: null,
		description: 'Generic external resource with fallback content.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'embed',
		allowedAttributes: EMBED_ATTRIBUTES,
		allowedChildren: [],
		forbiddenAncestors: null,
		structure: null,
		description: 'Container for external resources (void element).',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'map',
		allowedAttributes: MAP_ATTRIBUTES,
		allowedChildren: PHRASING_WITH_AREA,
		forbiddenAncestors: null,
		structure: null,
		description: 'Image map defining clickable regions via area elements.',
		isStyleEditable: true,
		isAttributeEditable: true,
		
	},
	{
		key: 'area',
		allowedAttributes: AREA_ATTRIBUTES,
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
