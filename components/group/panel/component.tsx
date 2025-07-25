"use client";

import React, {
    useRef,
    memo,
    useEffect,
    useCallback,
    useMemo,
    useState,
    useLayoutEffect,
} from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { PanelGroupProps, Side } from "./types";

// Hooks
import { useDrag } from "@/hooks/interface/useDrag";
import { useResize } from "@/hooks/interface/useResize";

/**
 * PanelGroup Component
 *
 * A draggable and resizable panel group using event delegation for resize handles.
 * - Uses CSS for initial layout, then takes control after measuring the DOM node.
 * - Supports resizing from all sides/corners and dragging the panel.
 *
 * @component
 * @param  props - The component props
 * @param  props.children - The content to render inside the panel group
 * @param  props.minWidth=250 - Minimum width of the panel
 * @param  props.minHeight=250 - Minimum height of the panel
 * @param  props.className - Optional CSS class name for the panel
 * @returns The rendered panel group or null if no children
 */
const PanelGroup: React.FC<PanelGroupProps> = (props: PanelGroupProps) => {
    const {
        children,
        initialPosition = { top: '0px', left: '0px' },
        initialSize = { width: '250px', height: '250px', minWidth: 250, minHeight: 250 },
    } = props;

    // Ref for the panel DOM element
    const panelRef = useRef<HTMLDivElement>(null);

    // Hydration flag: false until measured, then true
    const [hydrated, setHydrated] = useState(false);

    // State for panel position and size (controlled after hydration)
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [size, setSize] = useState({ width: 250, height: 250 });

    // Drag logic (position is updated by setPosition)
    const {
        startDrag,
        stopDrag,
        handleMouseMove: handleDragMouseMove,
        dragging,
    } = useDrag(position, setPosition);

    // Resize logic (size and position are updated by setSize/setPosition)
    const {
        startResize,
        stopResize,
        handleMouseMove: handleResizeMouseMove,
        resizing,
    } = useResize(initialSize.minWidth, initialSize.minHeight, size, position, setSize, setPosition);

    /**
      * On mount, measure the element and set initial position/size.
      * This allows CSS to control layout before React takes over.
      */
    useLayoutEffect(() => {
        if (!panelRef.current) return;
        const rect = panelRef.current.getBoundingClientRect();
        setPosition({ left: rect.left, top: rect.top });
        setSize({ width: rect.width, height: rect.height });
        setHydrated(true);
    }, []
    );

    /**
     * Memoized inline styles for the panel.
     * Only applied after hydration, so CSS can control initial layout.
     */
    const styles = useMemo(
        () =>
            hydrated
                ? {
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                }
                : {
                    top: initialPosition.top,
                    left: initialPosition.left,
                    width: initialSize.width,
                    height: initialSize.height,
                },
        [hydrated, position, size]
    );

    /**
     * Handles mouse down events for both dragging and resizing using event delegation.
     * If a resize handle is clicked, starts resizing; otherwise, starts dragging.
     *
     * @param {React.MouseEvent<HTMLDivElement>} e
     */
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        // Uses data-position attribute for event delegation
        const side = target.dataset.position as Side | undefined;

        if (side) {
            // Start resizing from the specified side/corner
            e.stopPropagation();
            startResize(e, side);
        } else {
            // Start dragging the panel
            startDrag(e);
        }
    },
        [startDrag, startResize]
    );

    /**
     * Handles mouse up events to stop dragging or resizing.
     */
    const handleMouseUp = useCallback(() => {
        stopDrag();
        stopResize();
    }, [stopDrag, stopResize]
    );

    /**
     * Handles global mouse move events for dragging and resizing.
     * Delegates to the appropriate handler.
     *
     * @param {MouseEvent} e
     */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (dragging.current) {
            handleDragMouseMove(e);
            return;
        }
        if (resizing.current) {
            handleResizeMouseMove(e);
            return;
        }
    },
        [handleDragMouseMove, handleResizeMouseMove, dragging, resizing]
    );

    /**
     * Attach global mouse listeners for dragging/resizing.
     * Cleans up listeners on unmount or dependency change.
     */
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]
    );

    // Guard clause: if no children, render nothing
    if (!children) return null;

    return (
        <div
            className={CSS.PanelGroup}
            ref={panelRef}
            style={styles}
            onMouseDown={handleMouseDown}
        >
            {children}

            {/* Render all resize handles with data-position for event delegation */}
            <div className={CSS.ResizeHandle} data-position="top-right" title="Resize" />
            <div className={CSS.ResizeHandle} data-position="top-left" title="Resize" />
            <div className={CSS.ResizeHandle} data-position="bottom-left" title="Resize" />
            <div className={CSS.ResizeHandle} data-position="bottom-right" title="Resize" />
            <div className={CSS.ResizeHandle} data-position="top" title="Resize" />
            <div className={CSS.ResizeHandle} data-position="right" title="Resize" />
            <div className={CSS.ResizeHandle} data-position="bottom" title="Resize" />
            <div className={CSS.ResizeHandle} data-position="left" title="Resize" />
        </div>
    );
};


export default memo(PanelGroup);