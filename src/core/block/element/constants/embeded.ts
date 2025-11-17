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
		allowedAttributes: IMAGE_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Image element (void). Displays raster graphics. No children.',
	},
	iframe: {
		allowedAttributes: IFRAME_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Inline frame embedding an external HTML page. No children.',
	},
	canvas: {
		allowedAttributes: CANVAS_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Scriptable bitmap canvas with fallback content when scripting is disabled.',
	},
	audio: {
		allowedAttributes: AUDIO_ATTRIBUTES,
		allowedContent: PHRASING_WITH_MEDIA,
		description: 'Audio player with optional source/track elements and fallback content.',
	},
	video: {
		allowedAttributes: VIDEO_ATTRIBUTES,
		allowedContent: PHRASING_WITH_MEDIA,
		description: 'Video player with optional source/track elements and fallback content.',
	},
	source: {
		allowedAttributes: SOURCE_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Media resource for picture/video/audio (void element). No children.',
	},
	track: {
		allowedAttributes: TRACK_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Timed text track (captions, subtitles) for video/audio (void element).',
	},
	picture: {
		allowedAttributes: EMBEDDED_ATTRIBUTES,
		allowedContent: PICTURE_CONTENT,
		description: 'Container for responsive images. Contains one img and zero or more source elements.',
	},
	object: {
		allowedAttributes: OBJECT_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Generic external resource with fallback content.',
	},
	embed: {
		allowedAttributes: EMBED_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Container for external resources (void element).',
	},
	map: {
		allowedAttributes: MAP_ATTRIBUTES,
		allowedContent: PHRASING_WITH_AREA,
		description: 'Image map defining clickable regions via area elements.',
	},
	area: {
		allowedAttributes: AREA_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Clickable area within an image map (void element). No children.',
	},
	svg: {
		allowedAttributes: EMBEDDED_ATTRIBUTES,
		allowedContent: null,
		description: 'Scalable Vector Graphics root element. Content model defined by SVG; any child elements allowed.',
	},
};
