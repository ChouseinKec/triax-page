import { useCallback, useRef, useEffect } from 'react';

// Hooks
import { useDebouncedCallback } from '@/shared/hooks/utility/useCallback';

/**
 * Custom hook for handling text selection changes in contentEditable elements.
 * Calls onHighlight when text is selected and onDehighlight when deselected.
 *
 * @param onHighlight - Callback when text is selected (receives range and selectedText)
 * @param onDehighlight - Callback when text is deselected
 * @returns Object containing the current selection state
 */
export function useHighlight(onHighlight: (range: Range, selectedText: string) => void, onDehighlight: () => void) {
	// Tracks the previous selected text to avoid redundant callbacks
	const prevSelectedTextRef = useRef<string | null>(null);

	/**
	 * Handles selection changes, calling onHighlight or onDehighlight based on state.
	 */
	const handleSelectionChangeImmediate = useCallback(() => {
		const selection = window.getSelection();
		const isSelected = selection && selection.rangeCount > 0 && selection.toString().length > 0;

		if (!isSelected) {
			// Deselect: call if previously selected
			if (prevSelectedTextRef.current) {
				onDehighlight();
				prevSelectedTextRef.current = null;
			}
			return;
		}

		const range = selection.getRangeAt(0);

		// Select: call if selection changed
		const selectedText = selection.toString();
		if (prevSelectedTextRef.current !== selectedText) {
			onHighlight(range, selectedText);
			prevSelectedTextRef.current = selectedText;
		}
	}, [onHighlight, onDehighlight]);

	// Debounced version of the handler
	const handleSelectionChange = useDebouncedCallback(handleSelectionChangeImmediate, 100);

	// Listen for selection changes
	useEffect(() => {
		document.addEventListener('selectionchange', handleSelectionChange);
		return () => {
			document.removeEventListener('selectionchange', handleSelectionChange);
		};
	}, [handleSelectionChange]);

	// Return nothing
	return {};
}
