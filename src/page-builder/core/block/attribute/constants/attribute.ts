import type { AttributeDefinition, AttributeKeys, AttributeCategories } from '@/src/page-builder/core/block/attribute/types';
import JSON from './attributes.json';

/**
 * Retrieves a list of AttributeDefinitions filtered by the specified category.
 *
 * @param category - The category to filter properties by (e.g., 'global', 'schema', 'accesibility', 'specific').
 * @returns An array of AttributeDefinitions that belong to the specified category.
 */
export function getPropertyGroup(category: AttributeCategories): AttributeDefinition[] {
	return Object.values(AttributeDefinitions)
		.filter((p) => p?.category === category)
		.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * A lookup table of all supported HTML global attributes and their metadata.
 * Each entry is an HTMLPropertyDefinition describing the attribute's name, syntax, and description.
 */
export const AttributeDefinitions: Record<AttributeKeys, AttributeDefinition> = Object.entries(JSON).reduce((acc, [key, data]) => {
	const attrData = data as AttributeDefinition;
	acc[key as AttributeKeys] = {
		name: attrData.name,
		syntax: attrData.syntax,
		description: attrData.description,
		category: attrData.category,
	};
	return acc;
}, {} as Record<AttributeKeys, AttributeDefinition>);
