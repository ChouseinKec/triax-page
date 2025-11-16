import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, VOID_CONTENT, PHRASING_CONTENT, PHRASING_WITH_MEDIA, PICTURE_CONTENT, FLOW_CONTENT, PHRASING_WITH_AREA } from './shared';

const EMBEDDED_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES];

export const EMBEDED_ELEMENTS: Partial<ElementRecord> = {
	img: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Image element (void). Displays raster graphics. No children.',
	},
	iframe: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Inline frame embedding an external HTML page. No children.',
	},
	canvas: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: PHRASING_CONTENT,
		description: 'Scriptable bitmap canvas with fallback content when scripting is disabled.',
	},
	audio: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: PHRASING_WITH_MEDIA,
		description: 'Audio player with optional source/track elements and fallback content.',
	},
	video: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: PHRASING_WITH_MEDIA,
		description: 'Video player with optional source/track elements and fallback content.',
	},
	source: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Media resource for picture/video/audio (void element). No children.',
	},
	track: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Timed text track (captions, subtitles) for video/audio (void element).',
	},
	picture: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: PICTURE_CONTENT,
		description: 'Container for responsive images. Contains one img and zero or more source elements.',
	},
	object: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Generic external resource with fallback content.',
	},
	embed: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Container for external resources (void element).',
	},
	map: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: PHRASING_WITH_AREA,
		description: 'Image map defining clickable regions via area elements.',
	},
	area: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: VOID_CONTENT,
		description: 'Clickable area within an image map (void element). No children.',
	},
	svg: {
		attributes: EMBEDDED_ATTRIBUTES,
		allowedContent: null,
		description: 'Scalable Vector Graphics root element. Content model defined by SVG; any child elements allowed.',
	},
};
