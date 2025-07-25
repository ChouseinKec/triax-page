import { useRef, useCallback } from 'react';

/**
 * Custom hook for handling drag logic.
 * Encapsulates state and handlers for dragging an element.
 *
 * @param position - Current position of the element ({ top, left })
 * @param setPosition - Setter function to update the element position
 * @returns Object containing handlers and state for dragging:
 *   - startDrag: function to start dragging
 *   - stopDrag: function to stop dragging
 *   - handleMouseMove: function to handle mouse move events during dragging
 *   - dragging: ref indicating if dragging is active
 */
export function useDrag(position: { top: number; left: number }, setPosition: (position: { top: number; left: number }) => void) {
	// Tracks whether dragging is active
	const dragging = useRef(false);

	// Stores the initial mouse position and element position when dragging starts
	const dragStart = useRef({
		x: 0,
		y: 0,
		left: 0,
		top: 0,
	});

	/**
	 * Starts the drag operation.
	 * Sets initial mouse position and element position.
	 *
	 * @param e - Mouse event that started the drag
	 */
	const startDrag = useCallback(
		(e: React.MouseEvent) => {
			dragging.current = true;
			dragStart.current = {
				x: e.clientX,
				y: e.clientY,
				left: position.left,
				top: position.top,
			};
			document.body.style.cursor = 'move';
		},
		[position]
	);

	/**
	 * Stops the drag operation and resets the cursor.
	 */
	const stopDrag = useCallback(() => {
		dragging.current = false;
		document.body.style.cursor = '';
	}, []);

	/**
	 * Handles mouse move events while dragging.
	 * Calculates and updates the new position.
	 *
	 * @param e - Mouse event
	 */
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!dragging.current) return;
			const { x, y, left, top } = dragStart.current;
			setPosition({
				left: left + (e.clientX - x),
				top: top + (e.clientY - y),
			});
		},
		[setPosition]
	);

	// Return handlers and state ref
	return { startDrag, stopDrag, handleMouseMove, dragging };
}
