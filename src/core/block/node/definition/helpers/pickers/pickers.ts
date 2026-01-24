// Types
import type { NodeDefinition, NodeKey, RegisteredNodes } from '@/core/block/node/definition/types/definition';
import type { ActionDefinition, RegisteredActions, ActionKey } from '@/core/block/node/definition/types/action';
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

/**
 * Fetch a single action definition by its key from the registry.
 *
 * @param actionKey - action key to resolve
 * @param registeredActions - registry containing available action definitions
 */
export function pickActionDefinition(actionKey: ActionKey, registeredActions: RegisteredActions): PickResult<ActionDefinition> {
	const definition = registeredActions[actionKey];
	if (!definition) return { success: false, error: `Action definition not found: '${actionKey}' does not exist in the action registry` };

	return { success: true, data: definition };
}
