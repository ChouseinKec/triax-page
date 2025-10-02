import { useRef, useCallback, useEffect, RefObject } from 'react';
import React from 'react';

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
 * Encapsulates state, handlers, and resize handles for resizing an element.
 *
 * @param ref - RefObject to the resizable container element
 * @param minWidth - Minimum allowed width
 * @param minHeight - Minimum allowed height
 * @param size - Current size ({ width, height })
 * @param position - Current position ({ top, left })
 * @param setSize - Setter for size
 * @param setPosition - Setter for position
 * @param locked - Whether resizing is disabled
 * @param handleClassName - CSS class for resize handles
 * @returns Object containing resize handles JSX and resizing state
 */
export function useResize(ref: RefObject<HTMLElement | null>, minWidth: number, minHeight: number, size: { width: number; height: number }, position: { top: number; left: number }, setSize: (size: { width: number; height: number }) => void, setPosition: (position: { top: number; left: number }) => void, locked: boolean = false) {
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
	 * @param side - The side/corner being resized
	 * @param e - Mouse event
	 */
	const startResize = useCallback(
		(side: Side, e: MouseEvent) => {
			if (locked) return;
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
		[size, position, locked]
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

	/**
	 * Handles mouse up to stop resizing.
	 */
	const handleMouseUp = useCallback(() => {
		stopResize();
	}, [stopResize]);

	/**
	 * Handles mousedown on resize handles.
	 */
	const handleMouseDown = useCallback(
		(e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const side = target.dataset.position as Side;
			if (side) {
				e.stopPropagation();
				startResize(side, e);
			}
		},
		[startResize]
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

	// Create resize handles using React.createElement
	const handles = locked ? null : React.createElement(React.Fragment, null, React.createElement('div', { 'data-position': 'top-right', title: 'Resize' }), React.createElement('div', { 'data-position': 'top-left', title: 'Resize' }), React.createElement('div', { 'data-position': 'bottom-left', title: 'Resize' }), React.createElement('div', { 'data-position': 'bottom-right', title: 'Resize' }), React.createElement('div', { 'data-position': 'top', title: 'Resize' }), React.createElement('div', { 'data-position': 'right', title: 'Resize' }), React.createElement('div', { 'data-position': 'bottom', title: 'Resize' }), React.createElement('div', { 'data-position': 'left', title: 'Resize' }));

	return { handles, resizing };
}
