// Stores
import { useBlockStore } from '@/state/block/block';

// Types
import type { NodeID } from '@/core/block/node/instance/types';
import type { StyleKey } from '@/core/block/style/types';

// Helpers
import { pickNodeInstance, pickNodeDefinition } from '@/core/block/node/instance/helpers/pickers';
import { validateNodeID } from '@/core/block/node/instance/helpers/validators';
import { validateStyleKey } from '@/core/block/style/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Registry
import { getRegisteredNodes } from '@/core/block/node/definition/registries';

/**
 * Checks if a block type can have styles based on its allowedStyles property.
 * @param NodeID - The block ID to check
 */
export function canNodeHaveStyles(NodeID: NodeID): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeHaveStyles]')
		.validate({ NodeID: validateNodeID(NodeID) })
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.blockInstance.type, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return false;

	// If allowedStyles is undefined or null, the block can have any styles
	if (results.NodeDefinition.allowedStyles == null) return true;

	return results.NodeDefinition.allowedStyles.length > 0;
}

/**
 * Checks if a block type can have a specific style based on its allowedStyles property.
 * @param NodeID - The block ID to check
 * @param styleKey - The style key to check
 */
export function canNodeHaveStyle(NodeID: NodeID, styleKey: StyleKey): boolean {
	const blockStore = useBlockStore.getState();
	const results = new ResultPipeline('[BlockQueries → canNodeHaveStyle]')
		.validate({
			NodeID: validateNodeID(NodeID),
			styleKey: validateStyleKey(styleKey),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.pick((data) => ({
			NodeDefinition: pickNodeDefinition(data.blockInstance.type, getRegisteredNodes()),
		}))
		.execute();
	if (!results) return false;

	// If allowedStyles is undefined or null, the block can have any styles
	if (results.NodeDefinition.allowedStyles == null) return true;

	return results.NodeDefinition.allowedStyles.includes(results.styleKey);
}
