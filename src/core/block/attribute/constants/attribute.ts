import type { AttributeDefinition, AttributeKey, AttributeCategories } from '@/src/core/block/attribute/types';
import JSON from './attributes.json';

/**
 * Retrieves a list of ATTRIBUTE_DEFINITIONS filtered by the specified category.
 *
 * @param category - The category to filter properties by (e.g., 'global', 'schema', 'accesibility', 'specific').
 * @returns An array of ATTRIBUTE_DEFINITIONS that belong to the specified category.
 */
export function getPropertyGroup(category: AttributeCategories): AttributeDefinition[] {
	return Object.values(ATTRIBUTE_DEFINITIONS)
		.filter((p) => p?.category === category)
		.sort((a, b) => a.name.localeCompare(b.name));
}

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
