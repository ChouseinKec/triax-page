'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';

const useHover = (ref: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[], delay = 200): boolean => {
	const [isHovered, setisHovered] = useState(false);
	const showTimeoutRef = useRef<number | null>(null);
	const hideTimeoutRef = useRef<number | null>(null);

	const show = useCallback(() => {
		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current);
			hideTimeoutRef.current = null;
		}

		if (!isHovered) {
			showTimeoutRef.current = window.setTimeout(() => {
				setisHovered(true);
			}, delay);
		}
	}, [isHovered, delay]);

	const hide = useCallback(() => {
		if (showTimeoutRef.current) {
			clearTimeout(showTimeoutRef.current);
			showTimeoutRef.current = null;
		}

		hideTimeoutRef.current = window.setTimeout(() => {
			setisHovered(false);
		}, delay);
	}, [delay]);

	useEffect(() => {
		const elements = (Array.isArray(ref) ? ref.map(r => r.current).filter(Boolean) : [ref.current].filter(Boolean)) as HTMLElement[];
		if (elements.length === 0) return;

		const handleEnter = () => show();
		const handleLeave = () => hide();

		elements.forEach(element => {
			element.addEventListener('mouseenter', handleEnter);
			element.addEventListener('mouseleave', handleLeave);
		});

		return () => {
			elements.forEach(element => {
				element.removeEventListener('mouseenter', handleEnter);
				element.removeEventListener('mouseleave', handleLeave);
			});
		};
	}, [ref, show, hide]);

	// Cleanup timeouts on unmount
	useEffect(() => {
		return () => {
			if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
			if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
		};
	}, []);

	return isHovered;
};

export default useHover;
