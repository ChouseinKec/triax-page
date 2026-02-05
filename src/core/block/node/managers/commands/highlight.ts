// Store
import { useNodeStore } from '@/core/block/node/states/store';

// Managers
import { setBlockNodeData, addBlockNodes } from '@/core/block/node/managers/';

// Types
import type { NodeKey, NodeHighlight } from '@/core/block/node/types';
import type { ElementKey } from '@/core/block/element/types';

// Helpers
import { pickNodeData, pickSelectedNodeID, pickHighlightedNode, splitHighlightText, segmentHighlightText, includesHighlightText } from '@/core/block/node/helpers';

// Utilities
import { ResultPipeline } from '@/shared/utilities/pipeline/result';
import { devLog } from '@/shared/utilities/dev';

/**
 * Replaces the highlighted text within the currently selected block with new child elements.
 *
 * This operation takes the currently highlighted text range in the selected block and converts
 * it into structured child elements. The highlighted text is split into segments (before, highlighted, after),
 * and new child nodes are created for each segment with appropriate element tags. The original
 * text data is cleared, and the highlight state is reset.
 *
 * This enables rich text editing by converting plain text selections into structured data
 * with different HTML elements (e.g., converting selected text to bold, italic, or custom elements).
 *
 * @param nodeDefinitionKey - The unique key identifying the type of nodes to create for each text segment
 * @param nodeElementKey - The HTML element key to apply to the highlighted text segment
 * @returns void - This function does not return a value but modifies the block store and highlight state
 * @see {@link splitHighlightText} - The function that divides text into segments
 * @see {@link segmentHighlightText} - The function that assigns element keys to segments
 * @see {@link setBlockNodeHighlight} - The function that clears the highlight state
 */
export function convertBlockNodeHighlightToNodes(nodeDefinitionKey: NodeKey, nodeElementKey: ElementKey): void {
	// Get a snapshot of the current block store state
	const blockStoreState = useNodeStore.getState();

	// Validate and gather necessary data from the store
	const validData = new ResultPipeline('[BlockHighlightManager → convertBlockNodeHighlightToNodes]')
		.pick({
			selectedNodeID: pickSelectedNodeID(blockStoreState),
		})
		.pick((data) => ({
			nodeContent: pickNodeData(data.selectedNodeID, blockStoreState.storedNodes),
			highlightedNode: pickHighlightedNode(blockStoreState),
		}))
		.check((data) => ({
			includesSubText: includesHighlightText(data.nodeContent, data.highlightedNode),
		}))
		.operate((data) => ({
			splitedText: splitHighlightText(data.nodeContent.text, data.highlightedNode),
		}))
		.operate((data) => ({
			segmentedText: segmentHighlightText(data.splitedText, nodeElementKey),
		}))
		.execute();
	if (!validData) return;

	// Create new child blocks for each text segment under the selected node
	const addedNodes = addBlockNodes(validData.segmentedText.map((segment) => [nodeDefinitionKey, validData.selectedNodeID, segment.elementKey, { data: { text: segment.text } }]));
	if (!addedNodes || addedNodes.length === 0) return devLog.error('[BlockHighlightManager → convertBlockNodeHighlightToNodes] Failed to add new nodes for highlighted text replacement.');

	// Clear the text data of the parent by setting it to an empty string
	setBlockNodeData(validData.selectedNodeID, { ...validData.nodeContent, text: '' });

	// Clear the highlightedNode text state
	setBlockNodeHighlight(null);
}

/**
 * Sets the highlighted text range within the currently selected block.
 *
 * This operation updates the text highlight state to specify a range of text that
 * is currently selected or highlighted within the active block. This information
 * is used for text manipulation operations like formatting, replacement, or copying.
 * Passing null clears any existing highlight.
 *
 * @param highlightedNode - The highlight data containing start/end offsets and text, or null to clear highlighting
 * @returns void - This function does not return a value but updates the block store highlight state
 */
export function setBlockNodeHighlight(highlightedNode: NodeHighlight | null): void {
	// Set the highlighted block text in the store
	useNodeStore.setState((state) => ({
		...state,
		highlightedNode,
	}));
}
