import { useRef, useCallback } from 'react';

export type Side = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Utility to clamp a value between min and max.
 *
 * @param value - The value to clamp
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns The clamped value
 */
function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

/**
 * Calculate new width based on side and delta.
 *
 * @param side - The side/corner being resized
 * @param width - The original width
 * @param dx - The horizontal mouse movement delta
 * @param minWidth - The minimum allowed width
 * @returns The new width
 */
function calculateWidth(side: Side, width: number, dx: number, minWidth: number) {
	if (side.includes('right')) return Math.max(minWidth, width + dx);
	if (side.includes('left')) return Math.max(minWidth, width - dx);
	return width;
}

/**
 * Calculate new height based on side and delta.
 *
 * @param side - The side/corner being resized
 * @param height - The original height
 * @param dy - The vertical mouse movement delta
 * @param minHeight - The minimum allowed height
 * @returns The new height
 */
function calculateHeight(side: Side, height: number, dy: number, minHeight: number) {
	if (side.includes('bottom')) return Math.max(minHeight, height + dy);
	if (side.includes('top')) return Math.max(minHeight, height - dy);
	return height;
}

/**
 * Calculate new left based on side, delta, and minWidth.
 *
 * @param side - The side/corner being resized
 * @param left - The original left position
 * @param dx - The horizontal mouse movement delta
 * @param width - The original width
 * @param minWidth - The minimum allowed width
 * @returns The new left position
 */
function calculateLeft(side: Side, left: number, dx: number, width: number, minWidth: number) {
	if (side.includes('left')) {
		const newWidth = width - dx;
		if (newWidth > minWidth) return left + dx;
	}
	return left;
}

/**
 * Calculate new top based on side, delta, and minHeight.
 *
 * @param side - The side/corner being resized
 * @param top - The original top position
 * @param dy - The vertical mouse movement delta
 * @param height - The original height
 * @param minHeight - The minimum allowed height
 * @returns The new top position
 */
function calculateTop(side: Side, top: number, dy: number, height: number, minHeight: number) {
	if (side.includes('top')) {
		const maxDy = height - minHeight;
		const actualDy = clamp(dy, -Infinity, maxDy);
		return top + actualDy;
	}
	return top;
}

/**
 * Custom hook for handling resize logic.
 * Encapsulates state and handlers for resizing an element from a given side/corner.
 *
 * @param minWidth - Minimum allowed width of the panel
 * @param minHeight - Minimum allowed height of the panel
 * @param size - Current size of the panel ({ width, height })
 * @param position - Current position of the panel ({ top, left })
 * @param setSize - Setter function to update the panel size
 * @param setPosition - Setter function to update the panel position
 * @returns Object containing handlers and state for resizing:
 *   - startResize: function to start resizing
 *   - stopResize: function to stop resizing
 *   - handleMouseMove: function to handle mouse move events during resizing
 *   - resizing: ref indicating if resizing is active
 */
export function useResize(minWidth: number, minHeight: number, size: { width: number; height: number }, position: { top: number; left: number }, setSize: (size: { width: number; height: number }) => void, setPosition: (position: { top: number; left: number }) => void) {
	const resizing = useRef(false);
	const resizeStart = useRef({
		width: 0,
		height: 0,
		x: 0,
		y: 0,
		side: 'bottom-right' as Side,
		left: 0,
		top: 0,
	});

	/**
	 * Starts the resize operation.
	 *
	 * @param e - Mouse event that started the resize
	 * @param side - The side/corner being resized
	 */
	const startResize = useCallback(
		(e: React.MouseEvent, side: Side) => {
			resizing.current = true;
			resizeStart.current = {
				width: size.width,
				height: size.height,
				x: e.clientX,
				y: e.clientY,
				side,
				left: position.left,
				top: position.top,
			};
			document.body.style.cursor = 'nwse-resize';
		},
		[size, position]
	);

	/**
	 * Stops the resize operation and resets the cursor.
	 */
	const stopResize = useCallback(() => {
		resizing.current = false;
		document.body.style.cursor = '';
	}, []);

	/**
	 * Handles mouse move events during resizing.
	 * Calculates and updates the new size and position.
	 *
	 * @param e - Mouse event
	 */
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!resizing.current) return;

			const { side, width, height, x, y, left, top } = resizeStart.current;
			const dx = e.clientX - x;
			const dy = e.clientY - y;

			const newWidth = calculateWidth(side, width, dx, minWidth);
			const newHeight = calculateHeight(side, height, dy, minHeight);
			const newLeft = calculateLeft(side, left, dx, width, minWidth);
			const newTop = calculateTop(side, top, dy, height, minHeight);

			setSize({ width: newWidth, height: newHeight });
			setPosition({ left: newLeft, top: newTop });
		},
		[minWidth, minHeight, setSize, setPosition]
	);

	return { startResize, stopResize, handleMouseMove, resizing };
}
