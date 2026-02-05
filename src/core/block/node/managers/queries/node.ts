// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { ElementKey } from '@/core/block/element/types';
import type { NodeInstance, NodeIcon, NodeKey, NodeID, NodeData, NodeComponent, NodeCategory, NodeStyles, NodeAttributes, NodeDescription, NodeName, ActionDefinition } from '@/core/block/node/types';

// Helpers
import { validateNodeID, pickNodeInstance, pickNodeStoreState, pickNodeData } from '@/core/block/node/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Managers
import { getBlockNodeDefinitionActions, getBlockNodeDefinitionIcon, getBlockNodeDefinitionComponent, getBlockNodeDefinitionElementKeys, getBlockNodeDefinitionName, getBlockNodeDefinitionDescription, getBlockNodeDefinitionCategory, getBlockNodeDefinitionDefaultStyles, getBlockNodeDefinitionDefaultAttributes, getBlockNodeDefinitionDefaultData } from '@/core/block/node/managers/';

/**
 * Retrieves all node instances currently stored in the node store.
 *
 * This function accesses the node store state and returns an array of all node instances.
 * It is useful for operations that require knowledge of all existing nodes within the system.
 *
 * @returns Readonly<NodeInstance[]> - An array of all node instances
 */
export function getBlockNodes(): Readonly<NodeInstance[]> {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodes]')
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.execute();
	if (!validData) return [];

	return Object.values(validData.nodeStoreState.storedNodes);
}

/**
 * Retrieves a specific node instance by its unique source node ID.
 *
 * This function looks up a node instance in the node store using the provided source node ID.
 * It performs validation on the ID and returns the complete node instance if found.
 *
 * @param sourceNodeID - The unique identifier of the node instance to retrieve
 * @returns Readonly<NodeInstance> | undefined - The node instance if found, or undefined if the ID is invalid or not registered
 * @see {@link pickNodeInstance} - Helper function used to extract the instance from store
 * @see {@link validateNodeID} - Validation function for node IDs
 */
export function getBlockNode(sourceNodeID: NodeID): Readonly<NodeInstance> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNode]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.blockInstance;
}

/**
 * Retrieves the icon component associated with a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the icon component from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeIcon | undefined - The icon component, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionIcon} - The underlying definition query
 */
export function getBlockNodeIcon(sourceNodeID: NodeID): NodeIcon | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeIcon]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionIcon(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the React component associated with a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the React component from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeComponent | undefined - The React component, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionComponent} - The underlying definition query
 */
export function getBlockNodeComponent(sourceNodeID: NodeID): NodeComponent | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeComponent]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionComponent(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the list of element keys supported by a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the supported element keys from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<ElementKey[]> | undefined - An array of supported element keys, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionElementKeys} - The underlying definition query
 */
export function getBlockNodeElementKeys(sourceNodeID: NodeID): Readonly<ElementKey[]> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeElementKeys]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionElementKeys(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the name of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the human-readable name associated with the node type from its definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeName | undefined - The name of the node, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionName} - The underlying definition query
 */
export function getBlockNodeName(sourceNodeID: NodeID): NodeName | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeName]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionName(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the description of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the description from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeDescription | undefined - The description of the node, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionDescription} - The underlying definition query
 */
export function getBlockNodeDescription(sourceNodeID: NodeID): NodeDescription | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeDescription]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionDescription(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the category of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the category from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeCategory | undefined - The category of the node, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionCategory} - The underlying definition query
 */
export function getBlockNodeCategory(sourceNodeID: NodeID): NodeCategory | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeCategory]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionCategory(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the default styles of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the default styles from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<NodeStyles> | undefined - The default styles of the node, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionDefaultStyles} - The underlying definition query
 */
export function getBlockNodeDefaultStyles(sourceNodeID: NodeID): Readonly<NodeStyles> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeDefaultStyles]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionDefaultStyles(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the default attributes of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the default attributes from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<NodeAttributes> | undefined - The default attributes of the node, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionDefaultAttributes} - The underlying definition query
 */
export function getBlockNodeDefaultAttributes(sourceNodeID: NodeID): Readonly<NodeAttributes> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeDefaultAttributes]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionDefaultAttributes(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the default data of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the default data from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<NodeData> | undefined - The default data of the node, or undefined if the instance is not found
 * @see {@link getBlockNodeDefinitionDefaultData} - The underlying definition query
 */
export function getBlockNodeDefaultData(sourceNodeID: NodeID): Readonly<NodeData> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeDefaultData]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return getBlockNodeDefinitionDefaultData(validData.blockInstance.definitionKey);
}

/**
 * Retrieves all registered action definitions applicable to a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the action definitions applicable to that node type.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<ActionDefinition[]> - A readonly array of action definitions, sorted by order
 * @see {@link getBlockNodeDefinitionActions} - The underlying definition query
 */
export function getBlockNodeActions(sourceNodeID: NodeID): Readonly<ActionDefinition[]> {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeActions]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return [];

	return getBlockNodeDefinitionActions(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the parent ID of a specific node instance.
 *
 * This function accesses the node instance to obtain its parent ID, which indicates
 * the hierarchical relationship within the node tree.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeID | undefined - The parent ID, or undefined if the instance is not found
 */
export function getBlockNodeParentID(sourceNodeID: NodeID): NodeID | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeParentID]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.blockInstance.parentID;
}

/**
 * Retrieves the definition key of a specific node instance.
 *
 * This function accesses the node instance to obtain its definition key, which identifies
 * the type of node it represents.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeKey | undefined - The definition key, or undefined if the instance is not found
 */
export function getBlockNodeDefinitionKey(sourceNodeID: NodeID): NodeKey | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeDefinitionKey]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.blockInstance.definitionKey;
}

/**
 * Retrieves the child node IDs of a specific node instance.
 *
 * This function accesses the node instance to obtain the list of its child node IDs,
 * representing the hierarchical structure.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<NodeID[]> | undefined - An array of child node IDs, or undefined if the instance is not found
 */
export function getBlockNodeChildNodeIDs(sourceNodeID: NodeID): Readonly<NodeID[]> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeChildNodeIDs]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.blockInstance.childNodeIDs;
}

/**
 * Retrieves the element key of a specific node instance.
 *
 * This function accesses the node instance to obtain its element key, which specifies
 * the primary HTML tag or element type.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns ElementKey | undefined - The element key, or undefined if the instance is not found
 */
export function getBlockNodeElementKey(sourceNodeID: NodeID): ElementKey | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeElementKey]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.blockInstance.elementKey;
}

/**
 * Retrieves the content data for a specific node instance.
 *
 * This function fetches the data object associated with a node instance, which contains
 * the node's content, configuration, and any custom properties. The data is
 * used for rendering, editing, and processing the node's state within the application.
 *
 * @param sourceNodeID - The unique identifier of the node instance to retrieve data for
 * @returns Readonly<NodeData> | undefined - The node's data object if found, or undefined if the instance does not exist or is invalid
 * @see {@link pickNodeData} - Helper function used to extract data from stored nodes
 * @see {@link validateNodeID} - Validation function for node identifiers
 */
export function getBlockNodeData(sourceNodeID: NodeID): Readonly<NodeData> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockNodeData]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			data: pickNodeData(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.data;
}
