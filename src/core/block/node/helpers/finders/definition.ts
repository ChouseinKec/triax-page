// Types
import type { NodeDefinition } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';
import type { FindResult } from '@/shared/types/result';

/**
 * Finds the node definition that supports the given element key.
 *
 * This operation searches through the provided array of node definitions to find one that
 * includes the specified element key in its supported element keys. If multiple definitions
 * support the element key, it prioritizes core definitions (those with keys starting with 'core-').
 * If no core definition is found, it returns the first matching definition.
 *
 * @param elementKey - The element key to find a supporting node definition for (e.g., 'div', 'table')
 * @param nodeDefinitions - The array of node definitions to search through
 * @returns FindResult containing the matching node definition or a not-found message
 * @see {@link findRequiredElements} - For finding required elements in element definitions
 * @see {@link pickNodeDefinition} - For picking a specific node definition by key
 */
export function findNodeDefinition(elementKey: ElementKey, nodeDefinitions: NodeDefinition[]): FindResult<NodeDefinition> {
	// Find all definitions that support the element key
	const matchingDefinitions = nodeDefinitions.filter((def) => def.elementKeys.includes(elementKey));
	if (matchingDefinitions.length === 0) return { status: 'not-found', message: `No node definition found for element key '${elementKey}'` };

	// Prefer core definitions
	const coreDefinition = matchingDefinitions.find((def) => def.key.startsWith('core-'));
	if (coreDefinition) return { status: 'found', data: coreDefinition };

	// Otherwise, return the first matching definition
	return { status: 'found', data: matchingDefinitions[0] };
}
