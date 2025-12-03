// Stores
import { useBlockStore } from '@/src/state/block/block';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { ElementTag } from '@/src/core/block/element/types';
import type { AttributeKey } from '@/src/core/block/attribute/types';

// Helpers
import { pickBlockInstance, pickBlockDefinition } from '@/src/core/block/instance/helper/pickers';
import { validateBlockTag, validateBlockID } from '@/src/core/block/instance/helper/validators';
import { validateAttributeKey } from '@/src/core/block/attribute/helper';
import { isBlockChildAllowed, hasBlockForbiddenAncestor, doesBlockElementExceeds, doesBlockElementViolatesOrder } from '@/src/core/block/instance/helper/checkers';
import { fetchElementDefinition } from '@/src/core/block/element/helper/fetchers';

// Constants
import { getElementDefinitions } from '@/src/core/block/element/constants';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Managers
import { getBlockDefinitions } from '@/src/core/block/instance/manager';

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentTag - The parent block tag
 * @param childTag - The child block tag to check
 */
export function canBlockAcceptChild(parentBlockID: BlockID, childBlockTag: ElementTag): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canBlockAcceptChild]')
		.validate({
			parentBlock: validateBlockID(parentBlockID),
			childBlockTag: validateBlockTag(childBlockTag),
		})
		.pick((data) => ({
			parentBlockInstance: pickBlockInstance(data.parentBlock, useBlockStore.getState().allBlocks),
		}))
		.pick((data) => ({
			parentBlockDefinition: pickBlockDefinition(data.parentBlockInstance.type, getBlockDefinitions()),
			childBlockDefinition: fetchElementDefinition(data.childBlockTag, getElementDefinitions()),
		}))
		.check((data) => ({
			isChildAllowed: isBlockChildAllowed(
				data.parentBlockDefinition, //
				childBlockTag
			),
			hasForbiddenAncestor: hasBlockForbiddenAncestor(
				data.childBlockDefinition, //
				data.parentBlockInstance,
				blockStore.allBlocks
			),
			exceedsUniqueElements: doesBlockElementExceeds(
				data.parentBlockDefinition, //
				data.parentBlockInstance,
				childBlockTag,
				blockStore.allBlocks
			),
			violatesOrderedElements: doesBlockElementViolatesOrder(
				data.parentBlockDefinition, //
				data.parentBlockInstance,
				childBlockTag,
				blockStore.allBlocks,
				data.parentBlockInstance.contentIDs.length
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
 * @param blockID - The block ID to check
 */
export function canBlockHaveChildren(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canBlockHaveChildren]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getBlockDefinitions()),
		}))
		.execute();
	if (!results) return false;

	// If allowedChildren is undefined or null, the block can have any children
	if (results.blockDefinition.allowedChildren == null) return true;

	// Check if there are any allowed children
	return results.blockDefinition.allowedChildren.length > 0;
}

/**
 * Checks if a block type can have attributes based on its allowedAttributes property.
 * @param blockID - The block ID to check
 */
export function canBlockHaveAttributes(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canBlockHaveAttributes]')
		.validate({ blockID: validateBlockID(blockID) })
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getBlockDefinitions()),
		}))
		.execute();
	if (!results) return false;

	// If allowedAttributes is undefined or null, the block can have any attributes
	if (results.blockDefinition.allowedAttributes == null) return true;

	return results.blockDefinition.allowedAttributes.length > 0;
}

/**
 * Checks if a block type can have a specific attribute based on its allowedAttributes property.
 * @param blockID - The block ID to check
 * @param attributeKey - The attribute key to check
 */
export function canBlockHaveAttribute(blockID: BlockID, attributeKey: AttributeKey): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canBlockHaveAttribute]')
		.validate({
			blockID: validateBlockID(blockID),
			attributeKey: validateAttributeKey(attributeKey),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getBlockDefinitions()),
		}))
		.execute();
	if (!results) return false;

	// If allowedAttributes is undefined or null, the block can have any attributes
	if (results.blockDefinition.allowedAttributes == null) return true;

	// Check if the specific attribute is allowed
	return results.blockDefinition.allowedAttributes.includes(results.attributeKey);
}
