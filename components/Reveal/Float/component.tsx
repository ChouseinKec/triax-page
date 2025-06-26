import React, { useRef, useEffect, memo } from "react";

// Styles
import CSS from "@/components/Reveal/Float/styles.module.css";

// Types
import { FloatRevealProps } from "@/components/reveal/float/types";

// Hooks
import useHover from "@/hooks/interaction/useHover";
import usePosition from "@/hooks/position/usePosition";

const FloatReveal: React.FC<FloatRevealProps> = (props) => {
    const {
        targetRef,
        position = "top",
        children,
        isOpen, // Parent controlled state overrides the hover state
        style = {},
    } = props;

    const floatRef = useRef<HTMLDivElement | null>(null);

    // Use hover hook to manage hover state and handlers
    const { isVisible, ...hoverHandlers } = useHover();

    // Use position hook to manage the position of the float based on the target element
    usePosition(targetRef, floatRef, position, isOpen ?? isVisible);

    /**
     * Effect to handle hover interactions
     * This effect adds mouseenter and mouseleave listeners to the target element
     * to control the visibility of the float.
     * If isOpen is explicitly set to true or false, we do not add hover listeners,
     * allowing the parent to control visibility without hover interaction.
     * If isOpen is undefined, we add hover listeners to toggle visibility based on mouse events.
     * @param {React.RefObject} targetRef - Reference to the target element that triggers the float
     * @param {Object} hoverHandlers - Handlers for mouse enter and leave events
     * @param {boolean | undefined} isOpen - Parent controlled state for visibility
    */
    useEffect(() => {
        // If isOpen is explicitly set to true or false, we don't need to add hover listeners
        // This allows the parent to control the visibility without hover interaction
        if (isOpen === true || isOpen === false) { return; }


        const target = targetRef.current;
        if (!target) return;

        target.addEventListener("mouseenter", hoverHandlers.handleTargetEnter);
        target.addEventListener("mouseleave", hoverHandlers.handleTargetLeave);

        return () => {
            target.removeEventListener("mouseenter", hoverHandlers.handleTargetEnter);
            target.removeEventListener("mouseleave", hoverHandlers.handleTargetLeave);
        };
    }, [targetRef, hoverHandlers, isOpen]);

    // If isOpen is null and not visible, or explicitly set to false, do not render the float
    // This allows the parent to control visibility without hover interaction
    if (isOpen == null && !isVisible || isOpen === false) return null;

    return (
        <div
            className={CSS.FloatReveal}
            ref={floatRef}
            style={style}
            onMouseEnter={isOpen === undefined ? hoverHandlers.handleFloatEnter : undefined}
            onMouseLeave={isOpen === undefined ? hoverHandlers.handleFloatLeave : undefined}
        >
            {children}
        </div>
    );
};

export default memo(FloatReveal);