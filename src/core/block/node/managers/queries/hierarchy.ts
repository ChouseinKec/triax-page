// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID, NodeKey, NodeDefinition } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { validateNodeElementKey, validateNodeKey, validateNodeID, passesAllRules, pickNodeInstance, pickNodeDefinition, pickNodeStoreState, pickNodeDefinitions } from '@/core/block/node/helpers';
import { pickElementDefinition, pickElementDefinitions } from '@/core/block/element/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { nodeRegistryState } from '@/core/block/node/states/registry';
import { elementRegistryState } from '@/core/block/element/states/registry';

/**
 * Determines whether a node can contain child elements based on its element definition.
 *
 * This function checks the element definition of a given node to see if it is permitted
 * to have child elements. It examines the allowedChildren property: if undefined or null,
 * any children are allowed; if an array, it checks if the array is non-empty. This is used
 * for validation during block insertion, movement, and UI rendering to prevent invalid hierarchies.
 *
 * @param sourceNodeID - The unique identifier of the node to check for child-bearing capability
 * @returns True if the node can have children according to its element definition, false otherwise
 * @see {@link pickElementDefinition} - Helper function used to retrieve element definitions
 * @see {@link canNodeAcceptElementKey} - Related function for checking specific element acceptance
 */
export function canNodeHaveChildren(sourceNodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → canNodeHaveChildren]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.blockInstance.elementKey, data.elementDefinitions),
		}))
		.execute();
	if (!validData) return false;

	// If allowedChildren is undefined or null, the block can have any children
	if (validData.elementDefinition.allowedChildren == null) return true;

	// Check if there are any allowed children
	return validData.elementDefinition.allowedChildren.length > 0;
}

/**
 * Determines whether a target node can accept a specific element key based on compatibility rules.
 *
 * This function validates whether a given element key can be used for a node instance
 * by checking element compatibility rules, parent-child relationships, and content structure constraints.
 * It performs comprehensive validation including element definitions, node instances, and rule checking.
 *
 * @param sourceNodeID - The unique identifier of the node that would contain or associate with the element
 * @param elementKey - The element key to validate for compatibility
 * @returns boolean - True if the element key is compatible and can be accepted, false otherwise
 * @see {@link canNodeAcceptNodeKey} - For checking if a node supports any element from another node
 * @see {@link getNodeFirstCompatibleElementKey} - For finding the first compatible element key
 * @see {@link passesAllRules} - The core validation function used internally
 */
export function canNodeAcceptElementKey(sourceNodeID: NodeID, elementKey: ElementKey): boolean {
	const validData = new ResultPipeline('[BlockQueries → canNodeAcceptElementKey]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			elementKey: validateNodeElementKey(elementKey),
		})
		.pick(() => ({
			nodeStore: pickNodeStoreState(useNodeStore.getState()),
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.pick((data) => ({
			targetNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStore.storedNodes),
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			targetNodeDefinition: pickNodeDefinition(data.targetNodeInstance.definitionKey, data.nodeDefinitions),
			sourceElementDefinition: pickElementDefinition(data.elementKey, data.elementDefinitions),
			targetElementDefinition: pickElementDefinition(data.targetNodeInstance.elementKey, data.elementDefinitions),
		}))
		.check((data) => {
			return {
				passesAllRules: passesAllRules(
					{
						id: 'test',
						parentID: data.sourceNodeID,
						definitionKey: 'test',
						elementKey: data.elementKey,
						childNodeIDs: [],
						styles: {},
						attributes: {},
						data: {},
					}, //
					data.targetNodeInstance,
					data.targetElementDefinition,
					data.sourceElementDefinition,
					data.nodeStore.storedNodes,
					data.targetNodeInstance.childNodeIDs.length,
				),
			};
		})
		.execute();
	if (!validData) return false;

	return true;
}

/**
 * Determines whether a node instance can accept a node definition as a child.
 *
 * This function checks if a target node instance can accept at least one element from the supported elements
 * of a given node definition. It iterates through the node definition's element keys and tests each one
 * against the target node instance's compatibility rules. This is used to determine if a node definition
 * can be instantiated as a child of the node instance.
 *
 * @param sourceNodeID - The unique identifier of the node instance to check compatibility against
 * @param nodeKey - The node definition key whose supported elements will be tested
 * @returns boolean - True if at least one supported element is compatible, false otherwise
 * @see {@link canNodeAcceptElementKey} - For checking compatibility of a specific element
 * @see {@link getNodeFirstCompatibleElementKey} - For finding the first compatible element for a node definition
 * @see {@link getNodeDefinitionElementKeys} - For retrieving the supported elements of a node type
 */
export function canNodeAcceptNodeKey(sourceNodeID: NodeID, nodeKey: NodeKey): boolean {
	const validData = new ResultPipeline('[BlockQueries → canNodeAcceptNodeKey]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			nodeKey: validateNodeKey(nodeKey),
		})
		.pick(() => ({
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.pick((data) => ({
			nodeDefinition: pickNodeDefinition(data.nodeKey, data.nodeDefinitions),
		}))
		.execute();
	if (!validData) return false;

	// Check if any of the child's available tags can be accepted
	return validData.nodeDefinition.elementKeys.some((tag) => canNodeAcceptElementKey(sourceNodeID, tag));
}

/**
 * Finds the first element that a target node can accept from a source node's supported elements.
 *
 * This function searches through the source node's supported element keys in order and returns
 * the first one that passes compatibility validation with the target node. This is useful for
 * automatically selecting a compatible element when multiple options exist.
 *
 * @param sourceNodeID - The unique identifier of the node to find compatibility for
 * @param sourceNodeKey - The node type key whose supported elements will be searched
 * @returns ElementKey | undefined - The first compatible element key, or undefined if none are compatible
 * @see {@link canNodeAcceptElementKey} - For checking compatibility of a specific element
 * @see {@link canNodeAcceptNodeKey} - For checking if any compatible element exists
 * @see {@link getNodeDefinitionElementKeys} - For retrieving all supported elements of a node type
 */
export function getNodeFirstCompatibleElementKey(sourceNodeID: NodeID, sourceNodeKey: NodeKey): ElementKey | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeFirstCompatibleElementKey]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			sourceNodeKey: validateNodeKey(sourceNodeKey),
		})
		.pick(() => ({
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.pick((data) => ({
			sourceNodeDefinition: pickNodeDefinition(data.sourceNodeKey, data.nodeDefinitions),
		}))
		.execute();
	if (!validData) return undefined;

	// Find the first tag that can be accepted
	return validData.sourceNodeDefinition.elementKeys.find((tag) => canNodeAcceptElementKey(sourceNodeID, tag));
}

/**
 * Retrieves the element keys for a source node that are accepted by a target node.
 *
 * This function gets the supported element keys for a source node instance and filters them to only include
 * those that the target node can accept as children. This is useful for UI components that need to
 * present valid tag options for a node within its target context.
 *
 * @param sourceNodeID - The unique identifier of the source node instance
 * @param targetNodeID - The unique identifier of the target node
 * @returns ElementKey[] - An array of element keys that are both supported by the source and accepted by the target
 * @see {@link getNodeDefinitionElementKeys} - For getting all supported element keys of a node type without filtering
 * @see {@link canNodeAcceptElementKey} - For checking if a specific element is accepted by a node
 */
export function getNodeCompatibleElementKeys(sourceNodeID: NodeID, targetNodeID: NodeID): ElementKey[] {
	const validData = new ResultPipeline('[BlockQueries → getNodeCompatibleElementKeys]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			targetNodeID: validateNodeID(targetNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.pick((data) => ({
			nodeDefinition: pickNodeDefinition(data.sourceNodeInstance.definitionKey, data.nodeDefinitions),
		}))
		.execute();
	if (!validData) return [];

	// Filter to only include tags that the target can accept
	return validData.nodeDefinition.elementKeys.filter((elementKey) => canNodeAcceptElementKey(validData.targetNodeID, elementKey));
}

/**
 * Retrieves all node definitions that a source node can accept as children.
 *
 * This function filters all registered node definitions to only include those
 * that are compatible with the target node instance. It returns the full definitions of the
 * compatible nodes for use in UI components or further processing.
 *
 * @param sourceNodeID - The unique identifier of the node instance
 * @returns NodeDefinition[] - An array of node definitions that are compatible with the target node
 * @see {@link canNodeAcceptElementKey} - For checking compatibility of a specific element
 */
export function getNodeCompatibleDefinitions(sourceNodeID: NodeID): NodeDefinition[] {
	const validData = new ResultPipeline('[BlockQueries → getNodeCompatibleDefinitions]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.execute();
	if (!validData) return [];

	return Object.values(validData.nodeDefinitions).filter((nodeDefinition) => {
		return canNodeAcceptNodeKey(sourceNodeID, nodeDefinition.key);
	});
}
