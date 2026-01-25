// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { pickNodeInstance, pickNodeDefinition } from '@/core/block/node/helpers/pickers';
import { validateNodeID } from '@/core/block/node/helpers/validators';
import { validateBlockTag } from '@/core/block/node/helpers/validators';
import { isChildElementAllowed, hasForbiddenAncestor, hasExceededUniqueChildLimit, hasViolatedOrderedChildren } from '@/core/block/node/helpers/checkers';
import { pickElementDefinition } from '@/core/block/element/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredNodes } from '@/core/block/node/states/registry';
import { getRegisteredElements } from '@/core/block/element/states/registry';

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
			parentNodeInstance: pickNodeInstance(data.parentBlock, useBlockStore.getState().storedNodes),
		}))
		.pick((data) => ({
			parentNodeDefinition: pickNodeDefinition(data.parentNodeInstance.type, getRegisteredNodes()),
			childNodeDefinition: pickElementDefinition(data.childBlockTag, getRegisteredElements()),
			parentElementDefinition: pickElementDefinition(data.parentNodeInstance.tag, getRegisteredElements()),
		}))
		.check((data) => ({
			isChildAllowed: isChildElementAllowed(
				data.parentElementDefinition, //
				childBlockTag,
			),
			hasForbiddenAncestor: hasForbiddenAncestor(
				data.childNodeDefinition, //
				data.parentNodeInstance,
			),
			exceedsUniqueElements: hasExceededUniqueChildLimit(
				data.parentElementDefinition, //
				data.parentNodeInstance,
				childBlockTag,
				blockStore.storedNodes,
			),
			violatesOrderedElements: hasViolatedOrderedChildren(
				data.parentElementDefinition, //
				data.parentNodeInstance,
				childBlockTag,
				blockStore.storedNodes,
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
			blockInstance: pickNodeInstance(data.nodeID, blockStore.storedNodes),
		}))
		.pick((data) => ({
			elementDefinition: pickElementDefinition(data.blockInstance.tag, getRegisteredElements()),
		}))
		.execute();
	if (!results) return false;

	// If allowedChildren is undefined or null, the block can have any children
	if (results.elementDefinition.allowedChildren == null) return true;

	// Check if there are any allowed children
	return results.elementDefinition.allowedChildren.length > 0;
}
