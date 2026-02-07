// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeID, NodeAttributes } from '@/core/block/node/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Helpers
import { validateNodeID, pickNodeStoreState, pickNodeInstance } from '@/core/block/node/helpers';
import { pickNodeAttributes, renderNodeAttributes } from '@/core/block/attribute/helpers/';
import { pickElementDefinitions, pickElementDefinition } from '@/core/block/element/helpers/pickers/definition';
import { elementRegistryState } from '@/core/block/element/states/registry';
import { pickNodeDefinitions, pickNodeDefinition } from '@/core/block/node/helpers/pickers/definition';
import { nodeRegistryState } from '@/core/block/node/states/registry';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

/**
 * Determines if a block's attributes can be edited based on its element definition.
 *
 * This function checks the element definition of the given block to see if its attributes
 * are editable by users. It delegates to the element's attribute editability check.
 *
 * @param sourceNodeID - The unique identifier of the block to check
 * @returns boolean - True if the block's attributes are editable, false otherwise
 * @see {@link getBlockElementIsAttributeEditable} - The underlying element check
 */
export function canBlockAttributesBeEdited(sourceNodeID: NodeID): boolean {
	const validData = new ResultPipeline('[BlockQueries → canBlockAttributesBeEdited]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			sourceNodeInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.pick(() => ({
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.sourceNodeInstance.elementKey, data.elementDefinitions),
		}))
		.execute();
	if (!validData) return false;

	return validData.elementDefinition.isAttributeEditable ?? true;
}

/**
 * Retrieves rendered HTML attributes for a block in rendering operations.
 *
 * This function processes and transforms a block's attributes into a format suitable
 * for HTML rendering. It handles attribute validation, type conversion, and any
 * necessary transformations (such as converting boolean attributes or handling special cases).
 * The returned object can be directly spread into JSX or used for HTML generation.
 *
 * @param sourceNodeID - The unique identifier of the block to retrieve rendered attributes for
 * @returns An object containing the rendered attributes as key-value pairs, or undefined if the block is invalid
 * @see {@link pickNodeAttributes} - Helper function used to extract raw attributes from nodes
 * @see {@link renderNodeAttributes} - Function that performs the attribute rendering transformation
 */
export function getBlockAttributesRendered(sourceNodeID: NodeID): Record<string, string | boolean> | undefined {
	// Validate, pick, and operate on necessary data
	const results = new ResultPipeline('[BlockQueries → getBlockAttributesRendered]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			attributes: pickNodeAttributes(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.operate((data) => ({
			renderedAttributes: renderNodeAttributes(data.attributes),
		}))
		.execute();
	if (!results) return undefined;

	return results.renderedAttributes;
}

/**
 * Retrieves the allowed attributes for a block.
 *
 * This function returns the list of attributes that are permitted for the block's element
 * according to its definition. This includes global, accessibility, and element-specific attributes.
 *
 * @param sourceNodeID - The unique identifier of the block to get allowed attributes for
 * @returns Array of allowed attribute keys, or empty array if the block is invalid
 */
export function getBlockAttributesAllowed(sourceNodeID: NodeID): AttributeKey[] {
	const validData = new ResultPipeline('[BlockQueries → getBlockAttributesAllowed]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.pick(() => ({
			elementDefinitions: pickElementDefinitions(elementRegistryState),
		}))
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.blockInstance.elementKey, data.elementDefinitions),
		}))
		.execute();
	if (!validData) return [];

	return validData.elementDefinition.allowedAttributes;
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
export function getBlockAttributesDefaults(sourceNodeID: NodeID): Readonly<NodeAttributes> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getBlockAttributesDefaults]')
		.validate({
			sourceNodeID: validateNodeID(sourceNodeID),
		})
		.pick(() => ({
			nodeStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.sourceNodeID, data.nodeStoreState.storedNodes),
		}))
		.pick(() => ({
			nodeDefinitions: pickNodeDefinitions(nodeRegistryState),
		}))
		.pick((data) => ({
			nodeDefinition: pickNodeDefinition(data.blockInstance.definitionKey, data.nodeDefinitions),
		}))
		.execute();
	if (!validData) return undefined;

	return validData.nodeDefinition.defaultAttributes;
}
