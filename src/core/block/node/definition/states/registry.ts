import type { NodeDefinition, NodeKey, RegisteredNodes } from '@/core/block/node/definition/types/definition';
import type { ValidateResult } from '@/shared/types/result';

// Helpers
import { validateNodeDefinition } from '@/core/block/node/definition/helpers/validators';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Class-based block registry for managing block definitions
 */
class NodeRegistry {
	private nodes: Readonly<RegisteredNodes> = {};

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
}

// Create singleton instance
const nodeRegistry = new NodeRegistry();

// Export the registry instance methods
export const registerNode = (nodeDefinition: NodeDefinition): void => {
	const result = nodeRegistry.registerNode(nodeDefinition);
	if (!result.valid) devLog.error(`[Registry → Block]    ❌ Failed: ${nodeDefinition.key} - ${result.message}`);
};
export const registerNodes = (nodeDefinitions: NodeDefinition[]) => nodeDefinitions.forEach(registerNode);
export const getRegisteredNodes = () => nodeRegistry.getRegisteredNodes();
export const getRegisteredNode = (nodeKey: NodeKey) => nodeRegistry.getRegisteredNode(nodeKey);
