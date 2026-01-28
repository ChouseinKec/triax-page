// Types
import type { NodeDefinition, NodeKey, RegisteredNodes } from '@/core/block/node/types/definition';
import type { ActionDefinition, RegisteredActions, ActionKey } from '@/core/block/node/types/action';
import type { PickResult } from '@/shared/types/result';

/**
 * Fetch a node definition by its key from the registry.
 *
 * This function retrieves the blueprint definition for a specific node type,
 * which contains default properties, supported element keys, styles, and other
 * configuration needed to create instances of that node type.
 *
 * @param nodeKey - The unique key identifying the node type (e.g., 'container', 'text')
 * @param registeredNodes - The registry containing all available node definitions
 * @returns A PickResult containing the node definition or an error if the type is not registered
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
 * Fetch an action definition by its key from the registry.
 *
 * This function retrieves the definition for a specific action that can be
 * performed on nodes, including its configuration, behavior, and metadata.
 *
 * @param actionKey - The unique key identifying the action type
 * @param registeredActions - The registry containing all available action definitions
 * @returns A PickResult containing the action definition or an error if the action is not registered
 */
export function pickActionDefinition(actionKey: ActionKey, registeredActions: RegisteredActions): PickResult<ActionDefinition> {
	const definition = registeredActions[actionKey];
	if (!definition) return { success: false, error: `Action definition not found: '${actionKey}' does not exist in the action registry` };

	return { success: true, data: definition };
}
