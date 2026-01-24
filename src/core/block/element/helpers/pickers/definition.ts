// Types
import type { ElementDefinition, ElementKey, RegisteredElements } from '@/core/block/element/types';
import type { PickResult } from '@/shared/types/result';

export function pickElementDefinition(elementKey: ElementKey, registeredElements: RegisteredElements): PickResult<ElementDefinition> {
	// Lookup the block type in the registry map
	const elementDefinition = registeredElements[elementKey];

	// If missing, return an error
	if (!elementDefinition) return { success: false, error: `Element type not registered: '${elementKey}' is not a recognized element type` };

	// Return the found block definition
	return { success: true, data: elementDefinition };
}
