"use client";

import { useLayoutEffect, RefObject } from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right';

const usePosition = (targetRef: RefObject<HTMLElement | null>, floatRef: RefObject<HTMLElement | null>, position: Position, isVisible: boolean) => {
	const offset = 5;
	useLayoutEffect(() => {
		if (!isVisible || !targetRef.current || !floatRef.current) return;

		const targetRect = targetRef.current.getBoundingClientRect();
		const floatRect = floatRef.current.getBoundingClientRect();

		let top = 0;
		let left = 0;

		switch (position) {
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
		// left = Math.max(0, Math.min(left, window.innerWidth - floatRect.width));

		if (floatRect.right > window.innerWidth) {
			left = targetRect.left - Math.min(floatRect.width - targetRect.width);
		}

		floatRef.current.style.top = `${top}px`;
		floatRef.current.style.left = `${left}px`;
	}, [isVisible, position, targetRef, floatRef]);
};

export default usePosition;
