// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { ElementKey } from '@/core/block/element/types';
import type { NodeKey } from '@/core/block/node/types/definition';

// Helpers
import { passesAllRules, validateNodeElementKey, validateNodeKey, validateNodeID, pickNodeInstance, pickNodeDefinition, pickNodeStoreState, pickNodeDefinitions } from '@/core/block/node/helpers/';
import { pickElementDefinition, pickElementDefinitions } from '@/core/block/element/helpers/pickers';

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
 * @see {@link canNodeAcceptElement} - Related function for checking specific element acceptance
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
 * Determines whether a target node can accept a specific element based on compatibility rules.
 *
 * This function validates whether a given element can be added to or associated with a target node
 * by checking element compatibility rules, parent-child relationships, and content structure constraints.
 * It performs comprehensive validation including element definitions, node instances, and rule checking.
 *
 * @param sourceNodeID - The unique identifier of the node that would contain or associate with the element
 * @param sourceElementKey - The element key to validate for compatibility
 * @returns boolean - True if the element is compatible and can be accepted, false otherwise
 * @see {@link doesNodeSupportElement} - For checking if a node supports any element from another node
 * @see {@link getNodeSupportedElement} - For finding the first compatible element
 * @see {@link passesAllRules} - The core validation function used internally
 */
export function canNodeAcceptElement(sourceNodeID: NodeID, sourceElementKey: ElementKey): boolean {
	const validData = new ResultPipeline('[BlockQueries → canNodeAcceptElement]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			sourceElementKey: validateNodeElementKey(sourceElementKey),
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
			sourceElementDefinition: pickElementDefinition(data.sourceElementKey, data.elementDefinitions),
			targetElementDefinition: pickElementDefinition(data.targetNodeInstance.elementKey, data.elementDefinitions),
		}))
		.check((data) => {
			return {
				passesAllRules: passesAllRules(
					{
						id: 'test',
						parentID: sourceNodeID,
						definitionKey: 'test',
						elementKey: data.sourceElementKey,
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
 * Determines whether a target node supports any element from a source node's supported elements.
 *
 * This function checks if a target node can accept at least one of the elements that a source node
 * type is configured to support. It iterates through the source node's supported element keys
 * and tests each one against the target node's compatibility rules.
 *
 * @param sourceNodeID - The unique identifier of the node to check compatibility against
 * @param sourceNodeKey - The node type key whose supported elements will be tested
 * @returns boolean - True if at least one supported element is compatible, false otherwise
 * @see {@link canNodeAcceptElement} - For checking compatibility of a specific element
 * @see {@link getNodeSupportedElement} - For finding the first compatible element instead of just checking existence
 * @see {@link getNodeDefinitionElementKeys} - For retrieving the supported elements of a node type
 */
export function doesNodeSupportElement(sourceNodeID: NodeID, sourceNodeKey: NodeKey): boolean {
	const validData = new ResultPipeline('[BlockQueries → doesNodeSupportElement]')
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
	if (!validData) return false;

	// Check if any of the child's available tags can be accepted
	return validData.sourceNodeDefinition.elementKeys.some((tag) => canNodeAcceptElement(sourceNodeID, tag));
}

/**
 * Retrieves the element keys that a child node can use, filtered by what the parent node accepts.
 *
 * This function gets the supported element keys for a child node instance and filters them to only include
 * those that the parent node can accept as children. This is useful for UI components that need to
 * present valid tag options for a node within its parent context.
 *
 * @param sourceNodeID - The unique identifier of the child node instance
 * @param targetNodeID - The unique identifier of the parent node
 * @returns An array of element keys that are both supported by the child and accepted by the parent
 * @see {@link getNodeDefinitionElementKeys} - For getting all supported element keys of a node type
 * @see {@link canNodeAcceptElement} - For checking if a specific element is accepted
 */
export function getCompatibleElementKeys(sourceNodeID: NodeID, targetNodeID: NodeID): ElementKey[] {
	const validData = new ResultPipeline('[BlockQueries → getCompatibleElementKeys]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
			targetNodeID: validateNodeID(targetNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.pick(() => ({
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.pick((data) => ({
			nodeDefinition: pickNodeDefinition(data.sourceInstance.definitionKey, data.nodeDefinitions),
		}))
		.execute();
	if (!validData) return [];

	// Filter to only include tags that the parent can accept
	return validData.nodeDefinition.elementKeys.filter((tag) => canNodeAcceptElement(targetNodeID, tag));
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
 * @see {@link canNodeAcceptElement} - For checking compatibility of a specific element
 * @see {@link doesNodeSupportElement} - For checking if any compatible element exists
 * @see {@link getNodeDefinitionElementKeys} - For retrieving all supported elements of a node type
 */
export function getNodeSupportedElement(sourceNodeID: NodeID, sourceNodeKey: NodeKey): ElementKey | undefined {
	const validData = new ResultPipeline('[BlockQueries → getNodeSupportedElement]')
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
	return validData.sourceNodeDefinition.elementKeys.find((tag) => canNodeAcceptElement(sourceNodeID, tag));
}
