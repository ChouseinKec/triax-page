'use client';
import { useLayoutEffect, RefObject, useState } from 'react';

type Anchor = 'top' | 'bottom' | 'left' | 'right';

const usePosition = (targetRef: RefObject<HTMLElement | null>, floatRef: RefObject<HTMLElement | null>, anchor: Anchor, isVisible: boolean, offset: number = 5) => {
	const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

	useLayoutEffect(() => {
		if (!isVisible || !targetRef.current || !floatRef.current) return;

		// Get true viewport position accounting for all transforms and scrolls
		const targetRect = targetRef.current.getBoundingClientRect();
		const floatRect = floatRef.current.getBoundingClientRect();

		// Destructure properties for cleaner access
		const { top: targetTop, bottom: targetBottom, left: targetLeft, right: targetRight } = targetRect;
		const { width: floatWidth, height: floatHeight } = floatRect;

		let top = 0;
		let left = 0;

		switch (anchor) {
			case 'top':
				top = targetTop - floatHeight;
				left = targetLeft;
				break;
			case 'bottom':
				top = targetBottom;
				left = targetLeft;
				break;
			case 'left':
				// top = targetRect.top + targetRect.height / 2 - floatRect.height / 2;
				top = targetTop;
				left = targetLeft - floatWidth;
				break;
			case 'right':
				// top = targetRect.top + targetRect.height / 2 - floatRect.height / 2;
				top = targetTop;
				left = targetRight;
				break;
		}

		// Apply offset based on anchor direction
		switch (anchor) {
			case 'top':
				top -= offset;
				break;
			case 'bottom':
				top += offset;
				break;
			case 'left':
				left -= offset;
				break;
			case 'right':
				left += offset;
				break;
		}

		// Ensure the float stays within viewport boundaries
		top = Math.max(0, Math.min(top, window.innerHeight - floatHeight));
		left = Math.max(0, Math.min(left, window.innerWidth - floatWidth));

		setPosition({ top, left });
	}, [isVisible, anchor, targetRef, floatRef, offset]);

	return position;
};

export default usePosition;
