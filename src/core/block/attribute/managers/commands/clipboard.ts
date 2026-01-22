// Stores
import { useBlockStore } from '@/state/block/block';

// Helpers
import { validateNodeID } from '@/core/block/node/instance/helpers/validators';
import { pickNodeInstance } from '@/core/block/node/instance/helpers/pickers';

// Types
import type { NodeID} from '@/core/block/node/instance/types';
import type { NodeAttributes } from '@/core/block/node/definition/types';

// Utilities
import { devLog } from '@/shared/utilities/dev';
import { ResultPipeline } from '@/shared/utilities/pipeline/result';

// Clipboard storage for copy/paste operations
let attributesClipboard: NodeAttributes | null = null;

/**
 * Copies the attributes of a blockInstance to the clipboard in blockInstance CRUD operations.
 * Stores the blockInstance attributes for later pasting.
 *
 * @param NodeID - The blockInstance identifier to copy attributes from
 */
export function copyNodeAttributes(NodeID: NodeID): void {
	const blockStore = useBlockStore.getState();

	// Validate and pick the blockInstance to copy attributes from
	const results = new ResultPipeline('[BlockManager → copyNodeAttributes]')
		.validate({
			NodeID: validateNodeID(NodeID),
		})
		.pick((data) => ({
			blockInstance: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Store the attributes in clipboard
	attributesClipboard = JSON.parse(JSON.stringify(results.blockInstance.attributes));
}

/**
 * Pastes copied attributes to a target blockInstance in blockInstance CRUD operations.
 * Applies the attributes from clipboard to the specified blockInstance.
 *
 * @param NodeID - The blockInstance identifier to paste attributes to
 */
export function pasteNodeAttributes(NodeID: NodeID): void {
	if (!attributesClipboard) return devLog.error(`[BlockManager → pasteNodeAttributes] No attributes in clipboard`), undefined;
	const blockStore = useBlockStore.getState();

	// Validate and pick the target blockInstance to paste attributes into
	const results = new ResultPipeline('[BlockManager → pasteNodeAttributes]')
		.validate({
			NodeID: validateNodeID(NodeID),
		})
		.pick((data) => ({
			targetBlock: pickNodeInstance(data.NodeID, blockStore.allBlocks),
		}))
		.execute();
	if (!results) return;

	// Update the target blockInstance with attributes from clipboard
	blockStore.updateBlocks({
		[results.NodeID]: {
			...results.targetBlock,
			attributes: JSON.parse(JSON.stringify(attributesClipboard)),
		},
	});
}
