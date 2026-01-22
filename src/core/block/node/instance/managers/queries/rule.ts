// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID } from '@/core/block/node/instance/types';
import type { ElementKey } from '@/core/block/element/types';
import type { AttributeKey } from '@/core/block/attribute/types';

// Helpers
import { pickNodeInstance, pickNodeDefinition } from '@/core/block/node/instance/helpers/pickers';
import { validateBlockTag, validateNodeID } from '@/core/block/node/instance/helpers/validators';
import { validateAttributeKey } from '@/core/block/attribute/helpers';
import { allowsChildElement, violatesForbiddenAncestors, exceedsUniqueChildLimit, violatesOrderedChildren } from '@/core/block/node/instance/helpers/checkers';
import { fetchElementDefinition } from '@/core/block/element/helpers/fetchers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredNodes } from '@/core/block/node/definition/registries';
import { getRegisteredElements } from '@/core/block/element/registries';

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentNodeID - The parent block tag
 * @param childBlockTag - The child block tag to check
 */
export function canNodeAcceptChild(parentNodeID: NodeID, childBlockTag: ElementKey): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeAcceptChild]')
		.validate({
			parentBlock: validateNodeID(parentNodeID),
			childBlockTag: validateBlockTag(childBlockTag),
		})
		.pick((data) => ({
			parentNodeInstance: pickNodeInstance(data.parentBlock, useBlockStore.getState().allBlocks),
		}))
		.pick((data) => ({
			parentNodeDefinition: pickNodeDefinition(data.parentNodeInstance.type, getRegisteredNodes()),
			childNodeDefinition: fetchElementDefinition(data.childBlockTag, getRegisteredElements()),
		}))
		.check((data) => ({
			isChildAllowed: allowsChildElement(
				data.parentNodeDefinition, //
				childBlockTag,
			),
			hasForbiddenAncestor: violatesForbiddenAncestors(
				data.childNodeDefinition, //
				data.parentNodeInstance,
				blockStore.allBlocks,
			),
			exceedsUniqueElements: exceedsUniqueChildLimit(
				data.parentNodeDefinition, //
				data.parentNodeInstance,
				childBlockTag,
				blockStore.allBlocks,
			),
			violatesOrderedElements: violatesOrderedChildren(
				data.parentNodeDefinition, //
				data.parentNodeInstance,
				childBlockTag,
				blockStore.allBlocks,
				data.parentNodeInstance.contentIDs.length,
			),
		}))

		.execute();
	if (!results) return false;

	// Final decision based on all checks
	if (!results.isChildAllowed || results.hasForbiddenAncestor || results.exceedsUniqueElements || results.violatesOrderedElements) return false;

	// If all checks passed, the child can be accepted
	return true;
}

/**
 * Checks if a block type can have children based on its allowedChildren property.
 * @param nodeID - The block ID to check
 */
export function canNodeHaveChildren(nodeID: NodeID): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeHaveChildren]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.blockInstance.type, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return false;

	// If allowedChildren is undefined or null, the block can have any children
	if (results.NodeDefinition.allowedChildren == null) return true;

	// Check if there are any allowed children
	return results.NodeDefinition.allowedChildren.length > 0;
}

/**
 * Checks if a block type can have attributes based on its allowedAttributes property.
 * @param nodeID - The block ID to check
 */
export function canNodeHaveAttributes(nodeID: NodeID): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeHaveAttributes]')
		.validate({ nodeID: validateNodeID(nodeID) })
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.blockInstance.type, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return false;

	// If allowedAttributes is undefined or null, the block can have any attributes
	if (results.NodeDefinition.allowedAttributes == null) return true;

	return results.NodeDefinition.allowedAttributes.length > 0;
}

/**
 * Checks if a block type can have a specific attribute based on its allowedAttributes property.
 * @param nodeID - The block ID to check
 * @param attributeKey - The attribute key to check
 */
export function canNodeHaveAttribute(nodeID: NodeID, attributeKey: AttributeKey): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeHaveAttribute]')
		.validate({
			nodeID: validateNodeID(nodeID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.blockInstance.type, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return false;

	// If allowedAttributes is undefined or null, the block can have any attributes
	if (results.NodeDefinition.allowedAttributes == null) return true;

	// Check if the specific attribute is allowed
	return results.NodeDefinition.allowedAttributes.includes(results.attributeKey);
}
