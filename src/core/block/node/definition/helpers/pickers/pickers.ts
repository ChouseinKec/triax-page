// Types
import type { NodeDefinition, NodeKey, RegisteredNodes } from '@/core/block/node/definition/types';
import type { PickResult } from '@/shared/types/result';

/**
 * Fetch a single block definition by its type key from the registry.
 *
 * @param nodeKey - block type key to resolve (e.g. 'container', 'text')
 * @param registeredNodes - registry containing available block definitions
 */
export function pickNodeDefinition(nodeKey: NodeKey, registeredNodes: RegisteredNodes): PickResult<NodeDefinition> {
	// Lookup the block type in the registry map
	const NodeDefinition = registeredNodes[nodeKey];

	// If missing, return an error
	if (!NodeDefinition) return { success: false, error: `Block type not registered: '${nodeKey}' is not a recognized block type` };

	// Return the found block definition
	return { success: true, data: NodeDefinition };
}
