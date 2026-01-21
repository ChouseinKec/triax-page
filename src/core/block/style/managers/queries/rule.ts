// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { BlockID } from '@/core/block/instance/types';
import type { StyleKey } from '@/core/block/style/types';

// Helpers
import { pickBlockInstance, pickBlockDefinition } from '@/core/block/instance/helpers/pickers';
import { validateBlockID } from '@/core/block/instance/helpers/validators';
import { validateStyleKey } from '@/core/block/style/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredBlocks } from '@/core/block/instance/registries';

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
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getRegisteredBlocks()),
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
			blockDefinition: pickBlockDefinition(data.blockInstance.type, getRegisteredBlocks()),
		}))
		.execute();
	if (!results) return false;

	// If allowedStyles is undefined or null, the block can have any styles
	if (results.blockDefinition.allowedStyles == null) return true;

	return results.blockDefinition.allowedStyles.includes(results.styleKey);
}
