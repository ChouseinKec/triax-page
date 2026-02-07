// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeAttributes } from '@/core/block/node/types';

// Helpers
import { pickSelectedNodeID, pickNodeStoreState } from '@/core/block/node/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline';

// Managers
import { getBlockAttributesDefaults } from '@/core/block/attribute/managers/';

/**
 * Retrieves the default attributes of the currently selected node.
 *
 * This function returns the default HTML attributes applied to the selected node,
 * defining its initial properties and behavior.
 *
 * @returns Readonly<NodeAttributes> | undefined - The default attributes of the selected node, or undefined if no selection exists
 */
export function getSelectedBlockAttributesDefaults(): Readonly<NodeAttributes> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getSelectedBlockAttributesDefaults]')
		.pick(() => ({
			blockStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			selectedNodeID: pickSelectedNodeID(data.blockStoreState),
		}))
		.execute();
	if (!validData || validData.selectedNodeID === 'html') return undefined;

	return getBlockAttributesDefaults(validData.selectedNodeID);
}
