// Stores
import { useBlockStore } from '@/src/core/block/store';

// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/types';

// Helpers
import { pickBlockInstance, pickBlockDefinition } from '@/src/core/block/instance/helper/pickers';
import { validateBlockID } from '@/src/core/block/instance/helper/validators';
import { validateStyleKey } from '@/src/core/block/style/helper';

// Utilities
import { ResultPipeline } from '@/src/shared/utilities/pipeline/result';

// Manager
import { getBlockDefinitions } from '@/src/core/block/instance/manager';

/**
 * Checks if a block type can have styles based on its allowedStyles property.
 * @param blockID - The block ID to check
 */
export function canBlockHaveStyles(blockID: BlockID): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canBlockHaveStyles]')
		.validate({ blockID: validateBlockID(blockID) })
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getBlockDefinitions()),
		}))
		.execute();
	if (!results) return false;

	// If allowedStyles is undefined or null, the block can have any styles
	if (results.blockDefinition.allowedStyles == null) return true;

	return results.blockDefinition.allowedStyles.length > 0;
}

/**
 * Checks if a block type can have a specific style based on its allowedStyles property.
 * @param blockID - The block ID to check
 * @param styleKey - The style key to check
 */
export function canBlockHaveStyle(blockID: BlockID, styleKey: StyleKey): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canBlockHaveStyle]')
		.validate({
			blockID: validateBlockID(blockID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick((data) => ({
			blockInstance: pickBlockInstance(data.blockID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getBlockDefinitions()),
		}))
		.execute();
	if (!results) return false;

	// If allowedStyles is undefined or null, the block can have any styles
	if (results.blockDefinition.allowedStyles == null) return true;

	return results.blockDefinition.allowedStyles.includes(results.styleKey);
}
