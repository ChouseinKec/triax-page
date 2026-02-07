// Stores
import { useNodeStore } from '@/core/block/node/states/store';

// Types
import type { NodeStyles } from '@/core/block/node/types';

// Helpers
import { pickSelectedNodeID, pickNodeStoreState } from '@/core/block/node/helpers/pickers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline';

// Managers
import { getBlockStylesDefaults } from '@/core/block/style/managers/';

/**
 * Retrieves the default styles of the currently selected node.
 *
 * This function returns the default CSS styles applied to the selected node,
 * defining its initial visual appearance.
 *
 * @returns Readonly<NodeStyles> | undefined - The default styles of the selected node, or undefined if no selection exists
 */
export function getSelectedBlockStylesDefaults(): Readonly<NodeStyles> | undefined {
	const validData = new ResultPipeline('[BlockQueries → getSelectedBlockStylesDefaults]')
		.pick(() => ({
			blockStoreState: pickNodeStoreState(useNodeStore.getState()),
		}))
		.pick((data) => ({
			selectedNodeID: pickSelectedNodeID(data.blockStoreState),
		}))
		.execute();
	if (!validData || validData.selectedNodeID === 'html') return undefined;

	return getBlockStylesDefaults(validData.selectedNodeID);
}
