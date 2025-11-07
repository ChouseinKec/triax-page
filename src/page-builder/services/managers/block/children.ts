// Helpers
import { canBlockMoveInto } from '@/src/page-builder/services/helpers/block';
import { fetchBlock } from '@/src/page-builder/services/helpers/fetch';
import { validateBlockID, validateBlockTag } from '@/src/page-builder/services/helpers/validate';

// Registry
import * as blockRegistry from '@/src/page-builder/state/registries/block';

// Stores
import { useBlockStore } from '@/src/page-builder/state/stores/block';

// Types
import type { BlockID } from '@/src/page-builder/core/block/block/types';
import type { ElementTag } from '@/src/page-builder/core/block/element/types';

// Utilities
import { ValidationPipeline } from '@/src/shared/utilities/validation';
import { devLog } from '@/src/shared/utilities/dev';

/**
 * Checks if a child block type is permitted within a parent block type.
 * @param parentType - The parent block type
 * @param childType - The child block type to check
 * @returns True if child is permitted, false otherwise
 * @example
 * const allowed = canBlockAcceptChild('container', 'text'); → true
 */
export function canBlockAcceptChild(parentTag: ElementTag, childTag: ElementTag): boolean {
	const safeData = new ValidationPipeline('[BlockManager → canBlockAcceptChild]')
		.validate({
			parentTag: validateBlockTag(parentTag),
			childTag: validateBlockTag(childTag),
		})
		.execute();
	if (!safeData) return false;

	return canBlockMoveInto(safeData.parentTag, safeData.childTag);
}

/**
 * Checks if a block type can have children based on its permittedContent property.
 * @param blockID - The block ID to check
 * @returns True if the block type can have children, false otherwise
 * @example
 * const canHaveChildren = canBlockHaveChildren('block-123'); → true
 */
export function canBlockHaveChildren(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const safeData = new ValidationPipeline('[BlockManager → canBlockHaveChildren]')
		.validate({
			blockID: validateBlockID(blockID),
		})
		.fetch((data) => ({
			blockInstance: fetchBlock(data.blockID, blockStore.allBlocks),
		}))
		.execute();
	if (!safeData) return false;

	const registeredBlocks = blockRegistry.getRegisteredBlocks();
	const blockDefinition = registeredBlocks[safeData.blockInstance.type];

	if (!blockDefinition) return devLog.error(`[BlockManager → canBlockHaveChildren] Block definition not found`), false;

	if (blockDefinition.permittedContent == null) return true;
	return blockDefinition.permittedContent.length > 0;
}
