// Stores
import { useBlockStore } from '@/core/block/node/states/store';

// Managers
import { addNode } from '@/core/block/node/managers/commands/crud';
import { setNodeContent } from '@/core/block/node/managers/commands/content';
import { getNodeContent } from '@/core/block/node/managers/queries/content';
import { setHighlightedNodeText } from '@/core/block/node/managers/commands/select';

// Helpers
import { findNodeFirstChild,findNodeNextSibling,findNodePreviousSibling } from '@/core/block/node/helpers/finders';

// Types
import type { NodeKey } from '@/core/block/node/types/definition';

// Utilities
import { devLog } from '@/shared/utilities/dev';

/**
 * Replace the highlighted text in the selected block with a new child block.
 *
 * - Reads `selectedNodeID` and `highlightedNodeText` from the store
 * - Removes the highlighted substring from the original node's `content.text`
 * - Adds a new node of the requested `nodeKey` as a child of the original
 * - Sets the new node's `content.text` to the highlighted substring
 * - Clears the highlight state
 */
export function replaceHighlightedText(nodeKey: NodeKey): void {
	const store = useBlockStore.getState();
	const selectedNodeID = store.selectedNodeID;
	const highlighted = store.highlightedNodeText;

	if (!selectedNodeID || !highlighted || !highlighted.text) return (devLog.warn(`[BlockHighlightManager → replaceHighlightedText] No selected block or highlighted text to replace.`), undefined);

	const content = getNodeContent(selectedNodeID) ?? {};
	const originalText: string = content.text ?? '';

	let newText = originalText;
	const hText = highlighted.text;
	const start = highlighted.startOffset ?? -1;
	const end = highlighted.endOffset ?? -1;

	// Prefer range offsets when valid; fallback to first occurrence match
	if (typeof start === 'number' && typeof end === 'number' && start >= 0 && end >= start && end <= originalText.length) {
		newText = originalText.slice(0, start) + originalText.slice(end);
	} else {
		const idx = originalText.indexOf(hText);
		if (idx >= 0) {
			newText = originalText.slice(0, idx) + originalText.slice(idx + hText.length);
		}
	}

	// Update original node text
	setNodeContent(selectedNodeID, { ...content, text: newText });

	// Add new node under the selected block and set its content
	const addedNode = addNode(nodeKey, selectedNodeID);


	if (addedNode) {
		setNodeContent(addedNode.id, { text: hText });
	}

	// Clear highlight
	setHighlightedNodeText(null);
}
