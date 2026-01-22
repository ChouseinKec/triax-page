// Stores
import { useBlockStore } from '@/state/block/block';

// Helpers
import { validateNodeID } from '@/core/block/node/instance/helpers/validators';
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';

// Types
import type { NodeID } from '@/core/block/node/instance/types';
import type { NodeStyles } from '@/core/block/node/definition/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

let stylesClipboard: NodeStyles | null = null;

/**
 * Copies the styles of a blockInstance to the clipboard in blockInstance CRUD operations.
 * Stores the blockInstance styles for later pasting.
 *
 * @param NodeID - The blockInstance identifier to copy styles from
 */
export function copyNodeStyles(NodeID: NodeID): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick the blockInstance to copy styles from
	const results = new ResultPipeline('[BlockManager → copyNodeStyles]')
		.validate({
			NodeID: validateNodeID(NodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Store the styles in clipboard
	stylesClipboard = JSON.parse(JSON.stringify(results.blockInstance.styles));
}

/**
 * Pastes copied styles to a target blockInstance in blockInstance CRUD operations.
 * Applies the styles from clipboard to the specified blockInstance.
 *
 * @param NodeID - The blockInstance identifier to paste styles to
 */
export function pasteNodeStyles(NodeID: NodeID): void {
	if (!stylesClipboard) return (devLog.error(`[BlockManager → pasteNodeStyles] No styles in clipboard`), undefined);
	const blockStore = useBlockStore.getState();

	// Validate and pick the target blockInstance to paste styles into
	const results = new ResultPipeline('[BlockManager → pasteNodeStyles]')
		.validate({
			NodeID: validateNodeID(NodeID),
		})
		.pick((data) => ({
			targetBlock: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the target blockInstance with styles from clipboard
	blockStore.updateBlocks({
		[results.NodeID]: {
			...results.targetBlock,
			styles: JSON.parse(JSON.stringify(stylesClipboard)),
		},
	});
}
