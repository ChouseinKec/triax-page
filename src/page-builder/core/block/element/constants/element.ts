import type { ElementDefinition, ElementTags } from '@/src/page-builder/core/block/element/types';
import JSON from './elements.json';

export const ElementDefinitions: Record<ElementTags, ElementDefinition> = Object.entries(JSON).reduce((acc, [key, data]) => {
	const elementData = data as ElementDefinition;
	const attributes = elementData.attributes;
	const allowedContent = elementData.allowedContent;

	acc[key as ElementTags] = { attributes, allowedContent, description: elementData.description };
	return acc;
}, {} as Record<ElementTags, ElementDefinition>);
