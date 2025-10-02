'use client';
import { useLayoutEffect, RefObject, useState } from 'react';

type Anchor = 'top' | 'bottom' | 'left' | 'right';

/**
 * Gets the true viewport position of an element by manually calculating accumulated transforms
 * from all parent elements and applying them to the element's offset positions.
 */
const getTrueViewportPosition = (element: HTMLElement): { top: number; left: number; width: number; height: number } => {
	let x = 0;
	let y = 0;
	let currentElement: HTMLElement | null = element;

	while (currentElement) {
		// Add the element's position relative to its offset parent
		x += currentElement.offsetLeft;
		y += currentElement.offsetTop;

		// Apply the element's transform to the accumulated position
		const computedStyle = window.getComputedStyle(currentElement);
		const transform = computedStyle.transform;

		if (transform && transform !== 'none') {
			const matrix = new DOMMatrix(transform);
			const transformedPoint = matrix.transformPoint(new DOMPoint(x, y));
			x = transformedPoint.x;
			y = transformedPoint.y;
		}

		currentElement = currentElement.offsetParent as HTMLElement;
	}

	// Get the element's actual dimensions from bounding rect
	const rect = element.getBoundingClientRect();

	return {
		top: y,
		left: x,
		width: rect.width,
		height: rect.height
	};
};

const usePosition = (targetRef: RefObject<HTMLElement | null>, floatRef: RefObject<HTMLElement | null>, anchor: Anchor, isVisible: boolean) => {
	const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const offset = 5;

	useLayoutEffect(() => {
		if (!isVisible || !targetRef.current || !floatRef.current) return;

		// Get true viewport position accounting for all transforms and scrolls
		const targetPosition = getTrueViewportPosition(targetRef.current);
		const floatRect = floatRef.current.getBoundingClientRect();

		let top = 0;
		let left = 0;

		switch (anchor) {
			case 'top':
				top = targetPosition.top - floatRect.height - offset;
				left = targetPosition.left;
				break;
			case 'bottom':
				top = targetPosition.top + targetRef.current.offsetHeight + offset;
				left = targetPosition.left;
				break;
			case 'left':
				top = targetPosition.top + targetRef.current.offsetHeight / 2 - floatRect.height / 2;
				left = targetPosition.left - floatRect.width - offset;
				break;
			case 'right':
				top = targetPosition.top + targetRef.current.offsetHeight / 2 - floatRect.height / 2;
				left = targetPosition.left + targetRef.current.offsetWidth + offset;
				break;
		}

		// Ensure the float stays within viewport boundaries
		top = Math.max(0, Math.min(top, window.innerHeight - floatRect.height));
		// left = Math.max(0, Math.min(left, window.innerWidth - floatRect.width));

		if (floatRect.right > window.innerWidth) {
			left = targetPosition.left - Math.min(floatRect.width - targetRef.current.offsetWidth);
		}

		setPosition({ top, left });
	}, [isVisible, anchor, targetRef, floatRef]);

	return position;
};

export default usePosition;
