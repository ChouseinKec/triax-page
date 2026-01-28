// Types
import type { CheckResult } from '@/shared/types/result';
import type { NodeData, HighlightedNode } from '@/core/block/node/types/';

/**
 * Checks whether the highlightedNode's text matches the substring in nodeContent.text defined by its startOffset and endOffset.
 *
 * @param nodeContent - The content of the node containing the text.
 * @param highlightedNode - The highlighted node data with text and offsets.
 * @returns CheckResult indicating if the highlight is valid.
 */
export function includesHighlightText(nodeContent: NodeData, highlightedNode: HighlightedNode): CheckResult {
	// Return false if no highlightedNode data is provided
	if (!highlightedNode) return { success: false, error: 'No highlighted node data provided.' };

	// Extract the original text from the node content
	const originalText = nodeContent?.text;
	if (!originalText) return { success: false, error: 'No valid node content text provided.' };

	// Check if offsets are within bounds
	const { startOffset, endOffset, text: highlightedText } = highlightedNode;
	if (startOffset < 0 || endOffset > originalText.length || startOffset >= endOffset) return { success: true, passed: false };

	// Extract the substring from the original text using offsets
	const extractedText = originalText.slice(startOffset, endOffset).trim();

	// Compare the extracted text with the highlighted text (case-sensitive, trimmed for forgiveness)
	const passed = extractedText === highlightedText.trim();

	return { success: true, passed };
}
