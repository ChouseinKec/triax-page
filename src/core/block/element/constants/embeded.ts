import type { ElementRecord } from '@/src/core/block/element/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, VOID_CONTENT, PHRASING_CONTENT, PHRASING_WITH_MEDIA, PICTURE_CONTENT, FLOW_CONTENT, PHRASING_WITH_AREA } from './shared';

const EMBEDDED_ATTRIBUTES: AttributeKey[] = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

const IMAGE_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'alt','src','srcset','sizes','width','height','loading','decoding','crossorigin','referrerpolicy','fetchpriority'
];

const IFRAME_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','name','referrerpolicy','loading','width','height'
];

const CANVAS_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'width','height'
];

const AUDIO_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','preload','autoplay','loop','muted','controls','crossorigin'
];

const VIDEO_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','preload','autoplay','loop','muted','controls','poster','width','height','crossorigin'
];

const SOURCE_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','type','srcset','sizes','media'
];

const TRACK_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'kind','src','srclang','label','default'
];

const OBJECT_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'type','name','form','width','height'
];

const EMBED_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'src','type','width','height'
];

const MAP_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'name'
];

const AREA_ATTRIBUTES: AttributeKey[] = [
	...BASE_GLOBAL_ATTRIBUTES,
	...GENERAL_ARIA_ATTRIBUTES,
	'alt','href','target','download','rel','referrerpolicy'
];

export const EMBEDED_ELEMENTS: Partial<ElementRecord> = {
	img: {
		tag: 'img',
		allowedAttributes: IMAGE_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Image element (void). Displays raster graphics. No children.',
	},
	iframe: {
		tag: 'iframe',
		allowedAttributes: IFRAME_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Inline frame embedding an external HTML page. No children.',
	},
	canvas: {
		tag: 'canvas',
		allowedAttributes: CANVAS_ATTRIBUTES,
		allowedChildren: PHRASING_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Scriptable bitmap canvas with fallback content when scripting is disabled.',
	},
	audio: {
		tag: 'audio',
		allowedAttributes: AUDIO_ATTRIBUTES,
		allowedChildren: PHRASING_WITH_MEDIA,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Audio player with optional source/track elements and fallback content.',
	},
	video: {
		tag: 'video',
		allowedAttributes: VIDEO_ATTRIBUTES,
		allowedChildren: PHRASING_WITH_MEDIA,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Video player with optional source/track elements and fallback content.',
	},
	source: {
		tag: 'source',
		allowedAttributes: SOURCE_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Media resource for picture/video/audio (void element). No children.',
	},
	track: {
		tag: 'track',
		allowedAttributes: TRACK_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Timed text track (captions, subtitles) for video/audio (void element).',
	},
	picture: {
		tag: 'picture',
		allowedAttributes: EMBEDDED_ATTRIBUTES,
		allowedChildren: PICTURE_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: { img: 1 },
		orderedElements: null,
		description: 'Container for responsive images. Contains one img and zero or more source elements.',
	},
	object: {
		tag: 'object',
		allowedAttributes: OBJECT_ATTRIBUTES,
		allowedChildren: FLOW_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Generic external resource with fallback content.',
	},
	embed: {
		tag: 'embed',
		allowedAttributes: EMBED_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Container for external resources (void element).',
	},
	map: {
		tag: 'map',
		allowedAttributes: MAP_ATTRIBUTES,
		allowedChildren: PHRASING_WITH_AREA,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Image map defining clickable regions via area elements.',
	},
	area: {
		tag: 'area',
		allowedAttributes: AREA_ATTRIBUTES,
		allowedChildren: VOID_CONTENT,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Clickable area within an image map (void element). No children.',
	},
	svg: {
		tag: 'svg',
		allowedAttributes: EMBEDDED_ATTRIBUTES,
		allowedChildren: null,
		forbiddenAncestors: null,
		uniqueElements: null,
		orderedElements: null,
		description: 'Scalable Vector Graphics root element. Content model defined by SVG; any child elements allowed.',
	},
};
