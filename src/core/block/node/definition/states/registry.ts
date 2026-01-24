import type { NodeDefinition, NodeKey, RegisteredNodes } from '@/core/block/node/definition/types/definition';
import type { ActionDefinition, RegisteredActions, ActionKey } from '@/core/block/node/definition/types/action';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateNodeDefinition } from '@/core/block/node/definition/helpers/validators';
import { validateActionDefinition } from '@/core/block/node/definition/helpers/validators/action';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Class-based block registry for managing block definitions
 */
class NodeEditorRegistry {
	private nodes: Readonly<RegisteredNodes> = {};
	private actions: RegisteredActions = {};

	/**
	 * Registers a block definition in the block registry.
	 * @param block - The block definition to register
	 * @returns Success status with optional error message
	 */
	registerNode(nodeDefinition: NodeDefinition): ValidateResult<NodeDefinition> {
		const validation = validateNodeDefinition(nodeDefinition);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.nodes[nodeDefinition.key]) return { valid: false, message: `Block with key "${nodeDefinition.key}" already registered` };

		this.nodes = { ...this.nodes, [nodeDefinition.key]: nodeDefinition };
		return { valid: true, value: nodeDefinition };
	}

	/**
	 * Registers an action definition in the node registry.
	 * @param action - The action definition to register
	 */
	registerAction(actionDefinition: ActionDefinition): ValidateResult<ActionDefinition> {
		const validation = validateActionDefinition(actionDefinition);
		if (!validation.valid) return validation;

		// Check for duplicates
		if (this.actions[actionDefinition.key]) return { valid: false, message: `Action with key "${actionDefinition.key}" already registered` };

		this.actions = { ...this.actions, [actionDefinition.key]: actionDefinition };

		return { valid: true, value: actionDefinition };
	}

	/**
	 * Retrieves all registered block definitions.
	 * @returns Readonly record of all registered nodes keyed by their key
	 */
	getRegisteredNodes(): Readonly<RegisteredNodes> {
		return { ...this.nodes };
	}

	/**
	 * Retrieves a specific block definition by its type.
	 * @param type - The block type to retrieve
	 * @returns The block definition if found, undefined otherwise
	 */
	getRegisteredNode(nodeKey: NodeKey): NodeDefinition | undefined {
		return this.nodes[nodeKey];
	}

	/**
	 * Retrieves all registered action definitions, optionally filtered by node key.
	 * @param nodeKey - Optional node key to filter actions by their associated node.
	 */
	getRegisteredActions(nodeKey?: NodeKey): Readonly<RegisteredActions> {
		if (!nodeKey) return { ...this.actions };

		return Object.fromEntries(Object.entries(this.actions).filter(([key, action]) => action.nodeKey === nodeKey));
	}

	/**
	 * Retrieves a specific action definition by its key.
	 * @param actionKey - The action key to retrieve.
	 */
	getRegisteredAction(actionKey: ActionKey): ActionDefinition | undefined {
		return this.actions[actionKey];
	}
}

// Create singleton instance
const nodeRegistry = new NodeEditorRegistry();

// Export the registry instance methods
export const registerNode = (nodeDefinition: NodeDefinition): void => {
	const result = nodeRegistry.registerNode(nodeDefinition);
	if (!result.valid) devLog.error(`[Registry → Block]    ❌ Failed: ${nodeDefinition.key} - ${result.message}`);
};
export const registerNodes = (nodeDefinitions: NodeDefinition[]) => nodeDefinitions.forEach(registerNode);
export const getRegisteredNodes = () => nodeRegistry.getRegisteredNodes();
export const getRegisteredNode = (nodeKey: NodeKey) => nodeRegistry.getRegisteredNode(nodeKey);

export const registerAction = (actionDefinition: ActionDefinition): void => {
	const result = nodeRegistry.registerAction(actionDefinition);
	if (!result.valid) devLog.error(`[Registry → Action]    ❌ Failed: ${actionDefinition.key} - ${result.message}`);
};
export const registerActions = (actionDefinitions: ActionDefinition[]) => actionDefinitions.forEach(registerAction);
export const getRegisteredActions = (nodeKey?: NodeKey) => nodeRegistry.getRegisteredActions(nodeKey);
export const getRegisteredAction = (actionKey: ActionKey) => nodeRegistry.getRegisteredAction(actionKey);
