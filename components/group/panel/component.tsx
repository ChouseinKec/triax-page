"use client";

import React, { memo, useEffect, useCallback, useState, useMemo, useRef } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { PanelGroupProps, Position, Side } from "./types";

/**
 * PanelGroup Component
 * 
 * Draggable and resizable panel group using event delegation.
 */
const PanelGroup: React.FC<PanelGroupProps> = (props) => {
    const {
        children,
        initialPosition = { top: 0, left: 0 },
        initialSize = { width: 320, height: 240, minWidth: 250, minHeight: 250 }
    } = props;

    // State for position and size
    const [position, setPosition] = useState<Position>(initialPosition);
    const [size, setSize] = useState(initialSize);

    // Refs for drag/resize state
    const dragging = useRef(false);
    const resizing = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0, side: "bottom-right" as Side });

    // Memoized styles for the panel
    const styles = useMemo(() => ({
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
    }), [position, size]
    );

    /**
     * Handles mouse down events for both dragging and resizing using event delegation.
     * If a resize handle is clicked, starts resizing; otherwise, starts dragging.
     */
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const side = target.dataset.position as Side | undefined;

        if (side) {
            // Start resizing
            e.stopPropagation();
            resizing.current = true;
            resizeStart.current = {
                width: size.width,
                height: size.height,
                x: e.clientX,
                y: e.clientY,
                side,
            };
            document.body.style.cursor = "nwse-resize";
        } else {
            // Start dragging
            dragging.current = true;
            dragOffset.current = {
                x: e.clientX - (position.left ?? 0),
                y: e.clientY - (position.top ?? 0),
            };
            document.body.style.cursor = "move";
        }
    }, [position, size]
    );

    /**
     * Handles mouse up events to stop dragging/resizing.
     */
    const handleMouseUp = useCallback(() => {
        dragging.current = false;
        resizing.current = false;
        document.body.style.cursor = "";
    }, []
    );

    /**
    * Handles global mouse move events for dragging and resizing.
    */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Dragging logic
        if (dragging.current) {
            setPosition({
                top: e.clientY - dragOffset.current.y,
                left: e.clientX - dragOffset.current.x,
            });
            return; // Only one operation at a time
        }

        // Resizing logic
        if (resizing.current) {
            const minWidth = initialSize.minWidth;
            const minHeight = initialSize.minHeight;

            const side = resizeStart.current.side;
            const dx = e.clientX - resizeStart.current.x;
            const dy = e.clientY - resizeStart.current.y;

            let newWidth = resizeStart.current.width;
            let newHeight = resizeStart.current.height;
            let newTop = position.top;
            let newLeft = position.left;

            // Use switch for clarity
            switch (side) {
                case "bottom-right":
                    newWidth = Math.max(minWidth, resizeStart.current.width + dx);
                    newHeight = Math.max(minHeight, resizeStart.current.height + dy);
                    break;

                case "bottom-left":
                    newWidth = Math.max(minWidth, resizeStart.current.width - dx);
                    newHeight = Math.max(minHeight, resizeStart.current.height + dy);
                    // Prevent shrinking past min width and moving the panel further left
                    if (newWidth > minWidth) {
                        newLeft = resizeStart.current.x + dx;
                    }
                    break;

                case "top-right":
                    newWidth = Math.max(minWidth, resizeStart.current.width + dx);
                    newHeight = Math.max(minHeight, resizeStart.current.height - dy);
                    if (newHeight > minHeight) {
                        newTop = resizeStart.current.y + dy;
                    }
                    break;

                case "top-left":
                    newWidth = Math.max(minWidth, resizeStart.current.width - dx);
                    newHeight = Math.max(minHeight, resizeStart.current.height - dy);

                    if (newWidth > minWidth) {
                        newLeft = resizeStart.current.x + dx;
                    }
                    if (newHeight > minHeight) {
                        newTop = resizeStart.current.y + dy;
                    }
                    break;

                case "top":
                    newHeight = Math.max(minHeight, resizeStart.current.height - dy);
                    if (newHeight > minHeight) {
                        newTop = resizeStart.current.y + dy;
                    }
                    break;

                case "right":
                    newWidth = Math.max(minWidth, resizeStart.current.width + dx);
                    break;

                case "bottom":
                    newHeight = Math.max(minHeight, resizeStart.current.height + dy);
                    break;

                case "left":
                    newWidth = Math.max(minWidth, resizeStart.current.width - dx);
                    // Prevent shrinking past min width and moving the panel further left
                    if (newWidth > minWidth) {
                        newLeft = resizeStart.current.x + dx;
                    }
                    break;

                default:
                    break;
            }

            setSize({
                width: newWidth,
                height: newHeight,
                minWidth: initialSize.minWidth,
                minHeight: initialSize.minHeight,
            });

            setPosition({
                left: newLeft,
                top: newTop,
            });
            return;
        }

    }, [position, initialSize]
    );

    // Attach global mouse listeners for dragging/resizing
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]
    );

    return (
        <div className={CSS.PanelGroup} style={styles} onMouseDown={handleMouseDown}>
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