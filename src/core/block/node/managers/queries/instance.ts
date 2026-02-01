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
import { getNodeDefinitionActions, getNodeDefinitionIcon, getNodeDefinitionComponent, getNodeDefinitionElementKeys, getNodeDefinitionName, getNodeDefinitionDescription, getNodeDefinitionCategory, getNodeDefinitionDefaultStyles, getNodeDefinitionDefaultAttributes, getNodeDefinitionDefaultData } from '@/core/block/node/managers/';
import { isElementStyleEditable, isElementAttributeEditable, isElementDeletable, isElementCopyable, isElementCloneable, isElementOrderable } from '@/core/block/element/managers/queries/definition';

/**
 * Retrieves all node instances currently stored in the node store.
 *
 * This function accesses the node store state and returns an array of all node instances.
 * It is useful for operations that require knowledge of all existing nodes within the system.
 *
 * @returns Readonly<NodeInstance[]> - An array of all node instances
 */
export function getNodeInstances(): Readonly<NodeInstance[]> {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstances]')
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
export function getNodeInstance(sourceNodeID: NodeID): Readonly<NodeInstance> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstance]')
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
 * @see {@link getNodeDefinitionIcon} - The underlying definition query
 */
export function getNodeInstanceIcon(sourceNodeID: NodeID): NodeIcon | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceIcon]')
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

	return getNodeDefinitionIcon(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the React component associated with a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the React component from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeComponent | undefined - The React component, or undefined if the instance is not found
 * @see {@link getNodeDefinitionComponent} - The underlying definition query
 */
export function getNodeInstanceComponent(sourceNodeID: NodeID): NodeComponent | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceComponent]')
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

	return getNodeDefinitionComponent(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the list of element keys supported by a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the supported element keys from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<ElementKey[]> | undefined - An array of supported element keys, or undefined if the instance is not found
 * @see {@link getNodeDefinitionElementKeys} - The underlying definition query
 */
export function getNodeInstanceElementKeys(sourceNodeID: NodeID): Readonly<ElementKey[]> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceElementKeys]')
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

	return getNodeDefinitionElementKeys(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the name of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the human-readable name associated with the node type from its definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeName | undefined - The name of the node, or undefined if the instance is not found
 * @see {@link getNodeDefinitionName} - The underlying definition query
 */
export function getNodeInstanceName(sourceNodeID: NodeID): NodeName | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceName]')
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

	return getNodeDefinitionName(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the description of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the description from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeDescription | undefined - The description of the node, or undefined if the instance is not found
 * @see {@link getNodeDefinitionDescription} - The underlying definition query
 */
export function getNodeInstanceDescription(sourceNodeID: NodeID): NodeDescription | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceDescription]')
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

	return getNodeDefinitionDescription(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the category of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the category from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeCategory | undefined - The category of the node, or undefined if the instance is not found
 * @see {@link getNodeDefinitionCategory} - The underlying definition query
 */
export function getNodeInstanceCategory(sourceNodeID: NodeID): NodeCategory | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceCategory]')
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

	return getNodeDefinitionCategory(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the default styles of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the default styles from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<NodeStyles> | undefined - The default styles of the node, or undefined if the instance is not found
 * @see {@link getNodeDefinitionDefaultStyles} - The underlying definition query
 */
export function getNodeInstanceDefaultStyles(sourceNodeID: NodeID): Readonly<NodeStyles> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceDefaultStyles]')
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

	return getNodeDefinitionDefaultStyles(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the default attributes of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the default attributes from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<NodeAttributes> | undefined - The default attributes of the node, or undefined if the instance is not found
 * @see {@link getNodeDefinitionDefaultAttributes} - The underlying definition query
 */
export function getNodeInstanceDefaultAttributes(sourceNodeID: NodeID): Readonly<NodeAttributes> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceDefaultAttributes]')
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

	return getNodeDefinitionDefaultAttributes(validData.blockInstance.definitionKey);
}

/**
 * Retrieves the default data of a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the default data from the node definition.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<NodeData> | undefined - The default data of the node, or undefined if the instance is not found
 * @see {@link getNodeDefinitionDefaultData} - The underlying definition query
 */
export function getNodeInstanceDefaultData(sourceNodeID: NodeID): Readonly<NodeData> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceDefaultData]')
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

	return getNodeDefinitionDefaultData(validData.blockInstance.definitionKey);
}

/**
 * Retrieves all registered action definitions applicable to a specific node instance.
 *
 * This function accesses the node instance to obtain the definition key, then retrieves
 * the action definitions applicable to that node type.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns Readonly<ActionDefinition[]> - A readonly array of action definitions, sorted by order
 * @see {@link getNodeDefinitionActions} - The underlying definition query
 */
export function getNodeInstanceActions(sourceNodeID: NodeID): Readonly<ActionDefinition[]> {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceActions]')
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

	return getNodeDefinitionActions(validData.blockInstance.definitionKey);
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
export function getNodeInstanceParentID(sourceNodeID: NodeID): NodeID | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceParentID]')
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
export function getNodeInstanceDefinitionKey(sourceNodeID: NodeID): NodeKey | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceDefinitionKey]')
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
export function getNodeInstanceChildNodeIDs(sourceNodeID: NodeID): Readonly<NodeID[]> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceChildNodeIDs]')
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
export function getNodeInstanceElementKey(sourceNodeID: NodeID): ElementKey | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceElementKey]')
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
export function getNodeInstanceData(sourceNodeID: NodeID): Readonly<NodeData> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeInstanceData]')
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

/**
 * Determines if a node's styles can be edited based on its element definition.
 *
 * This function checks the element definition of the given node to see if its styles
 * are editable by users. It delegates to the element's style editability check.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node's styles are editable, false otherwise
 * @see {@link isElementStyleEditable} - The underlying element check
 */
export function isNodeStyleEditable(nodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → isNodeStyleEditable]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			nodeInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return false;

	return isElementStyleEditable(validData.nodeInstance.elementKey);
}

/**
 * Determines if a node's attributes can be edited based on its element definition.
 *
 * This function checks the element definition of the given node to see if its attributes
 * are editable by users. It delegates to the element's attribute editability check.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node's attributes are editable, false otherwise
 * @see {@link isElementAttributeEditable} - The underlying element check
 */
export function isNodeAttributeEditable(nodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → isNodeAttributeEditable]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			nodeInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return false;

	return isElementAttributeEditable(validData.nodeInstance.elementKey);
}

/**
 * Determines if a node can be deleted based on its element definition.
 *
 * This function checks the element definition of the given node to see if it can be deleted
 * by users. It delegates to the element's deletability check.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is deletable, false otherwise
 * @see {@link isElementDeletable} - The underlying element check
 */
export function isNodeDeletable(nodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → isNodeDeletable]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			nodeInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return false;

	return isElementDeletable(validData.nodeInstance.elementKey);
}

/**
 * Determines if a node can be copied based on its element definition.
 *
 * This function checks the element definition of the given node to see if it can be copied
 * by users. It delegates to the element's copyability check.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is copyable, false otherwise
 * @see {@link isElementCopyable} - The underlying element check
 */
export function isNodeCopyable(nodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → isNodeCopyable]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			nodeInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return false;

	return isElementCopyable(validData.nodeInstance.elementKey);
}

/**
 * Determines if a node can be cloned based on its element definition.
 *
 * This function checks the element definition of the given node to see if it can be cloned
 * by users. It delegates to the element's cloneability check.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is cloneable, false otherwise
 * @see {@link isElementCloneable} - The underlying element check
 */
export function isNodeCloneable(nodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → isNodeCloneable]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			nodeInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return false;

	return isElementCloneable(validData.nodeInstance.elementKey);
}

/**
 * Determines if a node can be reordered based on its element definition.
 *
 * This function checks the element definition of the given node to see if it can be reordered
 * by users. It delegates to the element's orderability check.
 *
 * @param nodeID - The unique identifier of the node to check
 * @returns boolean - True if the node is orderable, false otherwise
 * @see {@link isElementOrderable} - The underlying element check
 */
export function isNodeOrderable(nodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → isNodeOrderable]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			nodeInstance: pickNodeInstance(data.nodeID, data.nodeStoreState.storedNodes),
		}))
		.execute();
	if (!validData) return false;

	return isElementOrderable(validData.nodeInstance.elementKey);
}
