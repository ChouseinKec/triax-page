// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Helpers
import { validateNodeID } from '@/core/block/node/helpers/validators';
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';

// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeStyles } from '@/core/block/node/types/definition';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

let stylesClipboard: NodeStyles | null = null;

/**
 * Copies the styles of a blockInstance to the clipboard in blockInstance CRUD operations.
 * Stores the blockInstance styles for later pasting.
 *
 * @param nodeID - The blockInstance identifier to copy styles from
 */
export function copyNodeStyles(nodeID: NodeID): void {
	// Validate and pick the blockInstance to copy styles from
	const results = new ResultPipeline('[BlockManager → copyNodeStyles]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
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
 * @param nodeID - The blockInstance identifier to paste styles to
 */
export function pasteNodeStyles(nodeID: NodeID): void {
	if (!stylesClipboard) return (devLog.error(`[BlockManager → pasteNodeStyles] No styles in clipboard`), undefined);

	// Validate and pick the target blockInstance to paste styles into
	const results = new ResultPipeline('[BlockManager → pasteNodeStyles]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			targetBlock: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the target blockInstance with styles from clipboard
	useBlockStore.setState((state) => {
		const updatedNodes = {
			...state.storedNodes,
			[results.nodeID]: {
				...results.targetBlock,
				styles: JSON.parse(JSON.stringify(stylesClipboard)),
			},
		};
		return { storedNodes: updatedNodes };
	});
}
