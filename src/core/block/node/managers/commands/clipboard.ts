// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Helpers
import { validateNodeID, validateNodeInstance } from '@/core/block/node/helpers/validators';
import { pickNodeInstance } from '@/core/block/node/helpers/pickers';
import { overwriteNodeInTree } from '@/core/block/node/helpers/operations/tree';

// Types
import type { NodeInstance, NodeID } from '@/core/block/node/types/instance';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Clipboard storage for copy/paste operations
let blockClipboard: NodeInstance | null = null;

/**
 * Copies a block instance and all its descendants to the clipboard for later pasting.
 *
 * This operation performs a deep clone of the specified node and its entire subtree,
 * storing the complete hierarchical structure in memory. The copied data can then
 * be used to overwrite other nodes via the paste operation, enabling content duplication
 * and replacement workflows.
 *
 * @param nodeID - The unique identifier of the block instance to copy to the clipboard
 * @returns void - This function does not return a value but updates the global clipboard state
 * @see {@link pasteNode} - The complementary operation that applies the copied content
 * @see {@link overwriteNodeInTree} - The underlying tree operation used during pasting
 */
export function copyNode(nodeID: NodeID): void {
	// Validate and pick the blockInstance to copy
	const results = new ResultPipeline('[BlockManager → copyNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Store the entire blockInstance tree in clipboard
	blockClipboard = JSON.parse(JSON.stringify(results.blockInstance));
}

/**
 * Pastes a copied block instance by replacing the target block's content with clipboard content.
 *
 * This operation takes the block instance previously stored in the clipboard and uses it
 * to completely overwrite the target node. The target's position in the hierarchy is preserved,
 * but its definition key, styles, attributes, and child structure are replaced with those
 * from the clipboard. This enables content replacement while maintaining layout relationships.
 *
 * If no content exists in the clipboard, the operation is silently ignored.
 *
 * @param nodeID - The unique identifier of the block instance to replace with clipboard content
 * @returns void - This function does not return a value but updates the block store state
 * @see {@link copyNode} - The operation that populates the clipboard with content
 * @see {@link overwriteNodeInTree} - The core tree manipulation function used for the replacement
 */
export function pasteNode(nodeID: NodeID): void {
	if (!blockClipboard) return (devLog.error(`[BlockManager → pasteNode] No blockInstance in clipboard`), undefined);

	// Validate and pick the target blockInstance to paste into
	const results = new ResultPipeline('[BlockManager → pasteNode]')
		.validate({
			nodeID: validateNodeID(nodeID),
		})
		.pick((data) => ({
			targetBlock: pickNodeInstance(data.nodeID, useBlockStore.getState().storedNodes),
		}))
		.validate(() => ({
			clipboardBlock: validateNodeInstance(blockClipboard),
		}))
		.operate((data) => ({
			pastedBlocks: overwriteNodeInTree(data.clipboardBlock, data.targetBlock, useBlockStore.getState().storedNodes),
		}))
		.execute();
	if (!results) return;

	// Update the block store with the new blockInstance tree
	useBlockStore.setState((state) => {
		const updatedNodes = { ...state.storedNodes, ...results.pastedBlocks };
		return { storedNodes: updatedNodes };
	});
}
