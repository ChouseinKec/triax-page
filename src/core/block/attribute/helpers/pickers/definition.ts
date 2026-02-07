// Types
import type { AttributeDefinition, AttributeKey } from '@/core/block/attribute/types';
import type { PickResult } from '@/shared/types/result';
import type { AttributeRegistryState } from '../../states/registry';

/**
 * Retrieves all registered attribute definitions from the system registry.
 *
 * This function validates that the registered attributes object exists and contains
 * at least one attribute definition. It returns the complete registry if valid,
 * or an error result if the registry is missing or empty.
 *
 * @param attributeRegistryState - The complete registry of attribute definitions
 * @returns A PickResult containing all registered attribute definitions or an error
 */
export function pickAttributeDefinitions(attributeRegistryState: AttributeRegistryState): PickResult<AttributeDefinition[]> {
	// If the registered attributes object is undefined, return an error
	if (!attributeRegistryState.attributes) return { success: false, error: 'Registered attributes object is undefined' };

	// If no registered attributes, return an error
	if (Object.keys(attributeRegistryState.attributes).length === 0) return { success: false, error: 'No attribute types are registered in the system' };

	// Return all registered attribute definitions
	return { success: true, data: Object.values(attributeRegistryState.attributes) };
}

/**
 * Retrieves a specific attribute definition by its key from the registry.
 *
 * This function looks up an attribute definition in the registered attributes registry
 * using the provided attribute key. It returns the definition if found, or an error
 * result if the key is not registered in the system.
 *
 * @param attributeKey - The unique key identifying the attribute type to retrieve
 * @param attributeDefinitions - The array of attribute definitions to search in
 * @returns A PickResult containing the attribute definition or an error if not found
 */
export function pickAttributeDefinition(attributeKey: AttributeKey, attributeDefinitions: AttributeDefinition[]): PickResult<AttributeDefinition> {
	// Lookup the attribute type in the definitions array
	const attributeDefinition = attributeDefinitions.find((def) => def.key === attributeKey);

	// If missing, return an error
	if (!attributeDefinition) return { success: false, error: `Attribute type not registered: '${attributeKey}' is not a recognized attribute type` };

	// Return the found attribute definition
	return { success: true, data: attributeDefinition };
}