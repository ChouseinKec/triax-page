import { useRef, useCallback, useEffect, RefObject } from 'react';

/**
 * Custom hook for handling drag logic.
 * Encapsulates state and handlers for dragging an element.
 * Attaches mousedown listener to the ref and handles global mousemove/mouseup.
 *
 * @param ref - RefObject to the draggable element
 * @param setPosition - Setter function to update the element position
 * @param shouldStartDrag - Optional function to determine if drag should start on mousedown (default: always true)
 * @param locked - Whether dragging is disabled
 * @returns Object containing dragging state
 */
export function useDrag(ref: RefObject<HTMLElement | null>, setPosition: (position: { top: number; left: number }) => void, shouldStartDrag: (e: MouseEvent) => boolean = () => true, locked: boolean = false) {
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
		(e: MouseEvent) => {
			dragging.current = true;
			const rect = ref.current?.getBoundingClientRect();
			if (!rect) return;
			dragStart.current = {
				x: e.clientX,
				y: e.clientY,
				left: rect.left,
				top: rect.top,
			};
			document.body.style.cursor = 'move';
		},
		[ref]
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

	/**
	 * Handles mouse up to stop dragging.
	 */
	const handleMouseUp = useCallback(() => {
		stopDrag();
	}, [stopDrag]);

	/**
	 * Handles mousedown on the element to potentially start drag.
	 */
	const handleMouseDown = useCallback(
		(e: MouseEvent) => {
			if (locked || !shouldStartDrag(e)) {
				return;
			}
			startDrag(e);
		},
		[locked, shouldStartDrag, startDrag]
	);

	// Attach mousedown listener to ref
	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		element.addEventListener('mousedown', handleMouseDown);
		return () => element.removeEventListener('mousedown', handleMouseDown);
	}, [ref, handleMouseDown]);

	// Attach global mousemove and mouseup listeners
	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [handleMouseMove, handleMouseUp]);

	// Return only the dragging state
	return { dragging };
}
