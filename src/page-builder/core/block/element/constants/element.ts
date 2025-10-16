import type { ElementDefinition, ElementTag } from '@/src/page-builder/core/block/element/types';
import JSON from './elements.json';

export const ELEMENT_DEFINITIONS: Record<ElementTag, ElementDefinition> = Object.entries(JSON).reduce((acc, [key, data]) => {
	const elementData = data as ElementDefinition;
	const { attributes, allowedContent, description } = elementData;

	acc[key as ElementTag] = { attributes, allowedContent, description };
	return acc;
}, {} as Record<ElementTag, ElementDefinition>);
