import type { ElementDefinition, ElementTag } from '@/src/page-builder/core/block/element/types';
import JSON from './elements.json';

export const ELEMENT_DEFINITIONS: Record<ElementTag, ElementDefinition> = Object.entries(JSON).reduce((acc, [key, data]) => {
	const elementData = data as ElementDefinition;
	const attributes = elementData.attributes;
	const allowedContent = elementData.allowedContent;

	acc[key as ElementTag] = { attributes, allowedContent, description: elementData.description };
	return acc;
}, {} as Record<ElementTag, ElementDefinition>);
