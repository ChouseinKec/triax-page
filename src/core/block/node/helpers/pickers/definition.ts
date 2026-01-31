// Types
import type { NodeDefinition, NodeKey, RegisteredNodes } from '@/core/block/node/types/definition';
import type { ActionDefinition, RegisteredActions, ActionKey } from '@/core/block/node/types/action';
import type { NodeRegistryState } from '@/core/block/node/states/registry';
import type { PickResult } from '@/shared/types/result';

/**
 * Fetch all registered node definitions from the registry.
 *
 * This function retrieves the complete set of node definitions that are
 * registered in the system. These definitions provide the blueprints for
 * creating and managing different types of nodes within the block structure.
 *
 * @param nodeRegistryState - The registry containing all available node definitions
 * @returns A PickResult containing all node definitions or an error if none are registered
 */
export function pickNodeDefinitions(nodeRegistryState: NodeRegistryState): PickResult<RegisteredNodes> {
	// If the registered nodes object is undefined, return an error
	if (!nodeRegistryState.nodes) return { success: false, error: 'Registered nodes object is undefined' };

	// If no registered nodes, return an error
	if (Object.keys(nodeRegistryState.nodes).length === 0) return { success: false, error: 'No block types are registered in the system' };

	// Return all registered node definitions
	return { success: true, data: nodeRegistryState.nodes };
}

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
	const nodeDefinition = registeredNodes[nodeKey];

	// If missing, return an error
	if (!nodeDefinition) return { success: false, error: `Block type not registered: '${nodeKey}' is not a recognized block type` };

	// Return the found block definition
	return { success: true, data: nodeDefinition };
}

/**
 * Fetch all registered action definitions from the registry.
 *
 * This function retrieves the complete set of action definitions that are
 * registered in the system. These definitions provide the configurations for
 * different actions that can be performed on nodes within the block structure.
 *
 * @param nodeRegistryState - The registry containing all available action definitions
 * @returns A PickResult containing all action definitions or an error if none are registered
 */
export function pickActionDefinitions(nodeRegistryState: NodeRegistryState): PickResult<RegisteredActions> {
	// If the registered actions object is undefined, return an error
	if (!nodeRegistryState.actions) return { success: false, error: 'Registered actions object is undefined' };

	// Return all registered action definitions
	return { success: true, data: nodeRegistryState.actions };
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
	const actionDefinition = registeredActions[actionKey];
	if (!actionDefinition) return { success: false, error: `Action definition not found: '${actionKey}' does not exist in the action registry` };

	return { success: true, data: actionDefinition };
}
