'use client';
import { useLayoutEffect, RefObject, useState } from 'react';

type Anchor = 'top' | 'bottom' | 'left' | 'right';

const usePosition = (targetRef: RefObject<HTMLElement | null>, floatRef: RefObject<HTMLElement | null>, anchor: Anchor, isVisible: boolean) => {
	const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const offset = 5;

	useLayoutEffect(() => {
		if (!isVisible || !targetRef.current || !floatRef.current) return;

		// Get true viewport position accounting for all transforms and scrolls
		const targetRect = targetRef.current.getBoundingClientRect();
		const floatRect = floatRef.current.getBoundingClientRect();

		let top = 0;
		let left = 0;

		switch (anchor) {
			case 'top':
				top = targetRect.top - floatRect.height - offset;
				left = targetRect.left;
				break;
			case 'bottom':
				top = targetRect.bottom + offset;
				left = targetRect.left;
				break;
			case 'left':
				top = targetRect.top + targetRect.height / 2 - floatRect.height / 2;
				left = targetRect.left - floatRect.width;
				break;
			case 'right':
				top = targetRect.top + targetRect.height / 2 - floatRect.height / 2;
				left = targetRect.right;
				break;
		}

		// Ensure the float stays within viewport boundaries
		top = Math.max(0, Math.min(top, window.innerHeight - floatRect.height));
		left = Math.max(0, Math.min(left, window.innerWidth - floatRect.width));

		setPosition({ top, left });
	}, [isVisible, anchor, targetRef, floatRef]);

	return position;
};

export default usePosition;
