// Store
import { useBlockStore } from '@/core/block/node/states/store';

// Managers
import { setHighlightNodeText, setNodeContent, addNodes } from '@/core/block/node/managers/';

// Types
import type { NodeKey } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { pickNodeContent, pickSelectedNodeID, pickHighlightedNode, splitHighlightText, segmentHighlightText, includesHighlightText } from '@/core/block/node/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

/**
 * Replaces the highlighted text within the currently selected block with new elements.
 *
 * @param nodeKey - The key for the new nodes to be created
 * @param nodeTag - The tag to be applied to the new nodes
 */
export function replaceHighlightText(nodeKey: NodeKey, nodeTag: ElementKey): void {
	// Get a snapshot of the current block store state
	const blockStoreState = useBlockStore.getState();

	// Validate and gather necessary data from the store
	const validData = new ResultPipeline('[BlockHighlightManager → replaceHighlightText]')
		.pick({
			selectedNodeID: pickSelectedNodeID(blockStoreState),
		})
		.pick((data) => ({
			nodeContent: pickNodeContent(data.selectedNodeID, blockStoreState.storedNodes),
			highlightedNode: pickHighlightedNode(blockStoreState),
		}))
		.check((data) => ({
			includesSubText: includesHighlightText(data.nodeContent, data.highlightedNode),
		}))
		.operate((data) => ({
			splitedText: splitHighlightText(data.nodeContent.text, data.highlightedNode),
		}))
		.operate((data) => ({
			segmentedText: segmentHighlightText(data.splitedText, nodeTag),
		}))
		.execute();
	if (!validData) return;

	// Create new child blocks for each text segment under the selected node
	const addedNodes = addNodes(validData.segmentedText.map((segment) => [nodeKey, validData.selectedNodeID, segment.tag, { content: { text: segment.text } }]));
	if (!addedNodes || addedNodes.length === 0) return devLog.error('[BlockHighlightManager → replaceHighlightText] Failed to add new nodes for highlighted text replacement.');


	// Clear the text content of the parent by setting it to an empty string
	setNodeContent(validData.selectedNodeID, { ...validData.nodeContent, text: '' });

	// Clear the highlightedNode text state
	setHighlightNodeText(null);
}
