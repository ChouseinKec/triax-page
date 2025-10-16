'use client';

import { useState, useEffect, RefObject, useCallback } from 'react';
import { useDebouncedCallback } from '../utility/useCallback';

type Size = { width: number; height: number };

const useSize = (targetRef: RefObject<HTMLElement | null>) => {
	const [size, setSize] = useState<Size>({ width: 0, height: 0 });
	const [isOverflowing, setIsOverflowing] = useState(false);

	// Handle resize events
	const handleResize = useCallback(() => {
		const node = targetRef.current;
		if (!node) return;

		// Get the current width and height of the target element
		const width = node.offsetWidth;
		const height = node.offsetHeight;

		// Update the size state and check for overflow
		setSize({ width, height });
		setIsOverflowing(node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight);
	}, [targetRef]);

	// Create a debounced version of the resize handler
	const debouncedResize = useDebouncedCallback(handleResize, 100);

	// Set up the ResizeObserver to observe the target element
	useEffect(() => {
		const node = targetRef.current;
		if (!node) return;

		// Create a ResizeObserver instance with the debounced resize handler
		const observer = new ResizeObserver(debouncedResize);
		observer.observe(node);

		// Set initial size
		handleResize();

		// Cleanup function to disconnect the observer when the component unmounts
		return () => observer.disconnect();
	}, [targetRef, debouncedResize, handleResize]);

	return { size, isOverflowing } as const;
};

export default useSize;
