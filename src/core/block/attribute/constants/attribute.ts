import type { AttributeDefinition, AttributeKey, AttributeCategories } from '@/src/core/block/attribute/types';
import JSON from './attributes.json';


/**
 * A lookup table of all supported HTML global attributes and their metadata.
 * Each entry is an HTMLPropertyDefinition describing the attribute's name, syntax, and description.
 */
export const ATTRIBUTE_DEFINITIONS: Record<AttributeKey, AttributeDefinition> = Object.entries(JSON).reduce((acc, [key, data]) => {
	const attrData = data as AttributeDefinition;
	acc[key as AttributeKey] = {
		name: attrData.name,
		syntax: attrData.syntax,
		description: attrData.description,
		category: attrData.category,
	};
	return acc;
}, {} as Record<AttributeKey, AttributeDefinition>);
