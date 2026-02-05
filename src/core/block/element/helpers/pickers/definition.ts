// Types
import type { ElementDefinition, ElementKey } from '@/core/block/element/types';
import type { PickResult } from '@/shared/types/result';
import type { ElementRegistryState } from '../../states/registry';
/**
 * Retrieves all registered element definitions from the system registry.
 *
 * This function validates that the registered elements object exists and contains
 * at least one element definition. It returns the complete registry if valid,
 * or an error result if the registry is missing or empty.
 *
 * @param registeredElements - The complete registry of element definitions
 * @returns A PickResult containing all registered element definitions or an error
 */
export function pickElementDefinitions(elementRegistryState: ElementRegistryState): PickResult<ElementDefinition[]> {
	// If the registered elements object is undefined, return an error
	if (!elementRegistryState.elements) return { success: false, error: 'Registered elements object is undefined' };

	// If no registered elements, return an error
	if (Object.keys(elementRegistryState.elements).length === 0) return { success: false, error: 'No element types are registered in the system' };

	// Return all registered element definitions
	return { success: true, data: Object.values(elementRegistryState.elements) };
}

/**
 * Retrieves a specific element definition by its key from the registry.
 *
 * This function looks up an element definition in the registered elements registry
 * using the provided element key. It returns the definition if found, or an error
 * result if the key is not registered in the system.
 *
 * @param elementKey - The unique key identifying the element type to retrieve
 * @param elementDefinitions - The array of element definitions to search in
 * @returns A PickResult containing the element definition or an error if not found
 */
export function pickElementDefinition(elementKey: ElementKey, elementDefinitions: ElementDefinition[]): PickResult<ElementDefinition> {
	// Lookup the element type in the definitions array
	const elementDefinition = elementDefinitions.find((def) => def.key === elementKey);

	// If missing, return an error
	if (!elementDefinition) return { success: false, error: `Element type not registered: '${elementKey}' is not a recognized element type` };

	// Return the found element definition
	return { success: true, data: elementDefinition };
}
