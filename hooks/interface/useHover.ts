"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const useHover = (delay = 200) => {
	const [isHovered, setisHovered] = useState(false);
	const showTimeoutRef = useRef<number | null>(null);
	const hideTimeoutRef = useRef<number | null>(null);
	const isHoveringRef = useRef(false);

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
			if (!isHoveringRef.current) {
				setisHovered(false);
			}
		}, delay);
	}, [delay]);

	const handleTargetEnter = useCallback(() => {
		isHoveringRef.current = false;
		show();
	}, [show]);

	const handleTargetLeave = useCallback(() => {
		hide();
	}, [hide]);

	const handleFloatEnter = useCallback(() => {
		isHoveringRef.current = true;
		if (!isHovered) {
			if (showTimeoutRef.current) {
				clearTimeout(showTimeoutRef.current);
			}
			setisHovered(true);
		}
	}, [isHovered]);

	const handleFloatLeave = useCallback(() => {
		isHoveringRef.current = false;
		hide();
	}, [hide]);

	// Cleanup timeouts on unmount
	useEffect(() => {
		return () => {
			if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
			if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
		};
	}, []);

	return {
		isHovered,
		handleTargetEnter,
		handleTargetLeave,
		handleFloatEnter,
		handleFloatLeave,
	};
};

export default useHover;
