// Stores
import { useBlockStore } from '@/state/block/block';

// Helpers
import { validateNodeID, validateNodeInstance } from '@/core/block/node/instance/helpers/validators';
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';
import { overwriteNodeInTree } from '@/core/block/node/instance/helpers/operations/tree';

// Types
import type { NodeInstance, NodeID } from '@/core/block/node/instance/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Clipboard storage for copy/paste operations
let blockClipboard: NodeInstance | null = null;

/**
 * Copies a blockInstance and all its descendants to the clipboard in blockInstance CRUD operations.
 * Stores the complete blockInstance tree for later pasting.
 *
 * @param nodeID - The blockInstance identifier to copy
 */
export function copyNode(nodeID: NodeID): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick the blockInstance to copy
	const results = new ResultPipeline('[BlockManager → copyNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Store the entire blockInstance tree in clipboard
	blockClipboard = JSON.parse(JSON.stringify(results.blockInstance));
}

/**
 * Pastes a copied blockInstance by replacing the target blockInstance's content with clipboard content.
 * Maintains the target's position in the hierarchy while updating its type, styles, attributes, and content structure.
 *
 * @param nodeID - The blockInstance identifier to replace with clipboard content
 */
export function pasteNode(nodeID: NodeID): void {
	if (!blockClipboard) return (devLog.error(`[BlockManager → pasteNode] No blockInstance in clipboard`), undefined);
	const blockStore = useBlockStore.getState();

	// Validate and pick the target blockInstance to paste into
	const results = new ResultPipeline('[BlockManager → pasteNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			targetBlock: pickNodeInstance(data.nodeID, blockStore.allBlocks),
		}))
		.validate(() => ({
			clipboardBlock: validateNodeInstance(blockClipboard),
		}))
		.operate((data) => ({
			pastedBlocks: overwriteNodeInTree(data.clipboardBlock, data.targetBlock, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the block store with the new blockInstance tree
	blockStore.updateBlocks(results.pastedBlocks);
}
