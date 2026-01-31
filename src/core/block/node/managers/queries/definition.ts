// Types
import type { ActionDefinition, NodeKey, NodeIcon, NodeComponent, NodeDefinition, NodeName, NodeDescription, NodeCategory, NodeStyles, NodeAttributes, NodeData } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { pickActionDefinitions, validateNodeKey, pickNodeDefinition, pickNodeDefinitions } from '@/core/block/node/helpers';

// Registry
import { nodeRegistryState } from '@/core/block/node/states/registry';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Retrieves all registered node definitions from the global registry.
 *
 * This function accesses the centralized registry of node definitions used throughout
 * the application. It returns a complete collection of all available node types and their
 * configurations, which can be used for rendering, validation, or other operations.
 *
 * @returns Readonly<NodeDefinition[]> - A collection of all node definitions
 * @see {@link getNodeDefinition} - For retrieving a single node definition by key
 */
export function getNodeDefinitions(): Readonly<NodeDefinition[]> {
	const validData = new ResultPipeline('[BlockQueries → getNodeDefinitions]')
		.pick(() => ({
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.execute();
	if (!validData) return [];

	return Object.values(validData.nodeDefinitions);
}

/**
 * Retrieves the definition for a specific node by its unique key.
 *
 * This function validates the provided node key and fetches the corresponding node definition
 * from the registry. It ensures the key is valid before attempting to retrieve the definition,
 * providing a safe way to access node configurations.
 *
 * @param sourceNodeKey - The unique identifier of the node to retrieve
 * @returns Readonly<NodeDefinition> | undefined - The node definition object, or undefined if not found or invalid
 * @see {@link getNodeDefinitions} - For retrieving all node definitions
 * @see {@link validateNodeKey} - The validation function used internally
 */
export function getNodeDefinition(sourceNodeKey: NodeKey): Readonly<NodeDefinition> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeDefinition]')
		.validate({
			sourceNodeKey: validateNodeKey(sourceNodeKey),
		})
		.pick(() => ({
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.pick((data) => ({
			nodeDefinition: pickNodeDefinition(data.sourceNodeKey, data.nodeDefinitions),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.nodeDefinition;
}

/**
 * Retrieves the icon component associated with a specific node.
 *
 * This function looks up the node definition for the given key and extracts its icon property.
 * The icon is typically a React component used for visual representation in UI elements like
 * menus, lists, or toolbars.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns NodeIcon | undefined - The icon component, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionIcon(sourceNodeKey: NodeKey): NodeIcon | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.icon;
}

/**
 * Retrieves the React component associated with a specific node.
 *
 * This function accesses the node definition to obtain the primary React component that
 * represents the node in the UI. This component is used for rendering the node's content
 * and handling its interactions.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns NodeComponent | undefined - The React component, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionComponent(sourceNodeKey: NodeKey): NodeComponent | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.component;
}

/**
 * Retrieves the list of element keys that are supported by a specific node.
 *
 * This function queries the node definition to get the array of element keys that the node
 * can contain or interact with. This is used for validation and ensuring compatibility
 * between nodes and elements in the content structure.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns Readonly<ElementKey[]> | undefined - An array of supported element keys, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionElementKeys(sourceNodeKey: NodeKey): Readonly<ElementKey[]> | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.elementKeys;
}

/**
 * Retrieves the name of a specific node.
 *
 * This function accesses the node definition to obtain the human-readable name
 * associated with the node type, which is used for display in UI elements.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns NodeName | undefined - The name of the node, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionName(sourceNodeKey: NodeKey): NodeName | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.name;
}

/**
 * Retrieves the description of a specific node.
 *
 * This function accesses the node definition to obtain the detailed description
 * of the node type, which provides information about its purpose and usage.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns NodeDescription | undefined - The description of the node, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionDescription(sourceNodeKey: NodeKey): NodeDescription | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.description;
}

/**
 * Retrieves the category of a specific node.
 *
 * This function accesses the node definition to obtain the category classification
 * of the node type, which is used for organizing blocks in the UI.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns NodeCategory | undefined - The category of the node, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionCategory(sourceNodeKey: NodeKey): NodeCategory | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.category;
}

/**
 * Retrieves the default styles of a specific node.
 *
 * This function accesses the node definition to obtain the default style configurations
 * for the node type, organized by device, orientation, and pseudo-states.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns Readonly<NodeStyles> | undefined - The default styles of the node, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionDefaultStyles(sourceNodeKey: NodeKey): Readonly<NodeStyles> | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.defaultStyles;
}

/**
 * Retrieves the default attributes of a specific node.
 *
 * This function accesses the node definition to obtain the default attribute values
 * for the node type, which are applied when creating new instances.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns Readonly<NodeAttributes> | undefined - The default attributes of the node, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionDefaultAttributes(sourceNodeKey: NodeKey): Readonly<NodeAttributes> | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.defaultAttributes;
}

/**
 * Retrieves the default data of a specific node.
 *
 * This function accesses the node definition to obtain the default data structure
 * for the node type, which provides initial state for custom node implementations.
 *
 * @param sourceNodeKey - The unique identifier of the node
 * @returns Readonly<NodeData> | undefined - The default data of the node, or undefined if the node is not found
 * @see {@link getNodeDefinition} - The underlying function that retrieves the node definition
 */
export function getNodeDefinitionDefaultData(sourceNodeKey: NodeKey): Readonly<NodeData> | undefined {
	const nodeDefinition = getNodeDefinition(sourceNodeKey);
	if (!nodeDefinition) return undefined;

	return nodeDefinition.defaultData;
}

/**
 * Retrieves all registered action definitions applicable to a specific node type.
 *
 * This function returns a sorted list of action definitions from the registry, filtered
 * to only those applicable to the provided node key. Actions are sorted by their
 * defined order for consistent UI presentation.
 *
 * @param sourceNodeKey - The key of the node type to filter actions for
 * @returns Readonly<ActionDefinition[]> - An array of action definitions, sorted by order
 * @see {@link getRegisteredActions} - Registry function that provides the source action data
 * @see {@link getActionDefinition} - For retrieving a single action by key
 */
export function getNodeDefinitionActions(sourceNodeKey: NodeKey): Readonly<ActionDefinition[]> {
	const validData = new ResultPipeline('[NodeEditorQueries → getNodeDefinitionActions]')
		.validate({
			sourceNodeKey: validateNodeKey(sourceNodeKey),
		})
		.pick((data) => ({
			actionDefinitions: pickActionDefinitions(nodeRegistryState),
		}))
		.execute();
	if (!validData) return [];

	// Filter actions by the provided node key and sort by order
	return Object.values(validData.actionDefinitions)
		.filter((action) => action.nodeKey === sourceNodeKey)
		.sort((a, b) => a.order - b.order);
}
