import type { ElementRecord } from '@/src/core/block/element/types';
import { BASE_GLOBAL_ATTRIBUTES, GENERAL_ARIA_ATTRIBUTES, TEXT_ONLY_ATTRIBUTES, VOID_CONTENT, FLOW_CONTENT } from './shared';

const PALPABLE_ATTRIBUTES = [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES, ...TEXT_ONLY_ATTRIBUTES];

export const PALPABLE_ELEMENTS: Partial<ElementRecord> = {
	hr: {
		attributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedContent: VOID_CONTENT,
		description: 'Thematic break between paragraphs of a section (void element).',
	},
	br: {
		attributes: [...BASE_GLOBAL_ATTRIBUTES, ...GENERAL_ARIA_ATTRIBUTES],
		allowedContent: VOID_CONTENT,
		description: 'Line break within text (void element).',
	},
	body: {
		attributes: PALPABLE_ATTRIBUTES,
		allowedContent: FLOW_CONTENT,
		description: 'Document body containing all renderable content.',
	},
};
