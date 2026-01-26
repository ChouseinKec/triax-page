// Types
import type { HighlightedNode } from '@/core/block/node/types';
import type { OperateResult } from '@/shared/types/result';
import type { ElementKey } from '@/core/block/element/types';

/**
 * Splits the original text into before, highlighted, and after segments based on highlight data.
 *
 * @param originalText - The full text content to split
 * @param highlightedNode - The highlight data containing start/end offsets and text
 */
export type SplitedHighlightText = { before: string; highlight: string; after: string };
export function splitHighlightText(originalText: string, highlightedNode: HighlightedNode): OperateResult<SplitedHighlightText> {
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
 * Generates an array of text segments with their corresponding tags.
 *
 * @param splitText - The result of splitting the text (before, highlight, after)
 * @param nodeTag - The tag to apply to the highlighted segment
 */
export type SegmentedHighlightText = { text: string; tag: ElementKey };
export function segmentHighlightText(splitText: SplitedHighlightText, nodeTag: ElementKey): OperateResult<SegmentedHighlightText[]> {
	// Destructure the split text for clarity
	const { before, highlight, after } = splitText;

	// Create segments: before (span), highlight (specified tag), after (span)
	// Filter out any empty segments to avoid creating unnecessary nodes
	return {
		success: true,
		data: [
			{ text: before, tag: 'span' },
			{ text: highlight, tag: nodeTag },
			{ text: after, tag: 'span' },
		].filter((s) => s.text),
	};
}
