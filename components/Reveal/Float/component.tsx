import React, { useState, useRef, useEffect, useLayoutEffect, memo, useCallback } from "react";

import { FLOAT_REVEAL } from "@/components/Reveal/Float/types";


const FloatReveal: React.FC<FLOAT_REVEAL> = ({ targetRef, position = "top", children, className = "", }) => {
    const [isVisible, setIsVisible] = useState(false);
    const floatRef = useRef<HTMLDivElement>(null);
    const showTimeoutRef = useRef<number | null>(null);
    const hideTimeoutRef = useRef<number | null>(null);
    const isHoveringFloat = useRef(false);


    // Event handlers
    const showFloat = useCallback(() => {
        // Clear any pending hide operations
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        // Only set show timeout if not already visible
        if (!isVisible) {
            showTimeoutRef.current = window.setTimeout(() => {
                setIsVisible(true);
            }, 400);
        }
    }, [isVisible]
    );

    const hideFloat = useCallback(() => {
        // Clear any pending show operations
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = null;
        }

        hideTimeoutRef.current = window.setTimeout(() => {
            if (!isHoveringFloat.current) {
                setIsVisible(false);
            }
        }, 200); // 200ms delay before hiding
    }, []
    );

    const handleTargetEnter = useCallback(() => {
        isHoveringFloat.current = false;
        showFloat();
    }, [showFloat]
    );

    const handleTargetLeave = useCallback(() => {
        hideFloat();
    }, [hideFloat]
    );

    const handleFloatEnter = useCallback(() => {
        isHoveringFloat.current = true;
        // Immediately show if not already visible
        if (!isVisible) {
            if (showTimeoutRef.current) {
                clearTimeout(showTimeoutRef.current);
            }
            setIsVisible(true);
        }
    }, [isVisible]
    );

    const handleFloatLeave = useCallback(() => {
        isHoveringFloat.current = false;
        hideFloat();
    }, [hideFloat]
    );


    // Position calculation
    useLayoutEffect(() => {
        if (!isVisible || !targetRef.current || !floatRef.current) return;

        const targetRect = targetRef.current.getBoundingClientRect();
        const floatRect = floatRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (position) {
            case "top":
                top = targetRect.top - floatRect.height;
                // left = targetRect.left + targetRect.width / 2 - floatRect.width / 2;
                left = targetRect.left;
                break;
            case "bottom":
                top = targetRect.bottom;
                left = targetRect.left + targetRect.width / 2 - floatRect.width / 2;
                break;
            case "left":
                top = targetRect.top + targetRect.height / 2 - floatRect.height / 2;
                left = targetRect.left - floatRect.width;
                break;
            case "right":
                top = targetRect.top + targetRect.height / 2 - floatRect.height / 2;
                left = targetRect.right;
                break;
        }

        top = Math.max(0, Math.min(top, window.innerHeight - floatRect.height));
        left = Math.max(0, Math.min(left, window.innerWidth - floatRect.width));

        floatRef.current.style.top = `${top}px`;
        floatRef.current.style.left = `${left}px`;
    }, [isVisible, position, targetRef]
    );

    // Setup event listeners
    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        target.addEventListener("mouseenter", handleTargetEnter);
        target.addEventListener("mouseleave", handleTargetLeave);

        return () => {
            target.removeEventListener("mouseenter", handleTargetEnter);
            target.removeEventListener("mouseleave", handleTargetLeave);
            if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

        };
    }, [targetRef, handleTargetEnter, handleTargetLeave]
    );

    if (!isVisible) return null;

    return (
        <div
            ref={floatRef}
            className={className}
            style={{ position: "fixed" }}
            onMouseEnter={handleFloatEnter}
            onMouseLeave={handleFloatLeave}
        >
            {children}
        </div>
    );
};

export default memo(FloatReveal);
