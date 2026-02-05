// Types
import type { NodeHighlight } from '@/core/block/node/types';
import type { OperateResult } from '@/shared/types/result';
import type { ElementKey } from '@/core/block/element/types';

/**
 * Splits the original text into before, highlighted, and after segments based on highlight data.
 *
 * This function takes a full text string and a highlight specification containing
 * start and end offsets, then divides the text into three parts: the content
 * before the highlight, the highlighted content itself, and the content after
 * the highlight. This is useful for text manipulation and rendering operations.
 *
 * @param originalText - The full text content to split into segments
 * @param highlightedNode - The highlight data containing start and end character offsets
 * @returns An OperateResult containing the split text segments or an error if highlight data is invalid
 */
export type SplitedHighlightText = { before: string; highlight: string; after: string };
export function splitHighlightText(originalText: string, highlightedNode: NodeHighlight): OperateResult<SplitedHighlightText> {
	if (!highlightedNode) return { success: false, error: 'No highlighted node data provided.' };

	// Extract the start and end offsets from the highlight data
	const start = highlightedNode.startOffset!;
	const end = highlightedNode.endOffset!;

	// Slice the original text to get the part before the highlight
	const before = originalText.slice(0, start);

	// Slice the original text to get the highlighted part
	const highlight = originalText.slice(start, end);

	// Slice the original text to get the part after the highlight
	const after = originalText.slice(end);

	// Return the split segments
	return { success: true, data: { before, highlight, after } };
}

/**
 * Creates segment configurations for highlighted text replacement.
 *
 * This function takes the result of text splitting and generates an array of
 * text segments with their corresponding HTML element keys. It creates segments
 * for the before text (using 'span'), the highlighted text (using the specified
 * element key), and the after text (using 'span'). Empty segments are filtered
 * out to avoid creating unnecessary DOM nodes.
 *
 * @param splitText - The result of splitting the text containing before, highlight, and after segments
 * @param nodeTag - The HTML element key to apply to the highlighted segment
 * @returns An OperateResult containing an array of text segments with element keys or an error
 */
export type SegmentedHighlightText = { text: string; elementKey: ElementKey };
export function segmentHighlightText(splitText: SplitedHighlightText, nodeTag: ElementKey): OperateResult<SegmentedHighlightText[]> {
	// Destructure the split text for clarity
	const { before, highlight, after } = splitText;

	// Create segments: before (span), highlight (specified tag), after (span)
	// Filter out any empty segments to avoid creating unnecessary nodes
	return {
		success: true,
		data: [
			{ text: before, elementKey: 'span' },
			{ text: highlight, elementKey: nodeTag },
			{ text: after, elementKey: 'span' },
		].filter((s) => s.text),
	};
}
