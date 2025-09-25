"use client";

import React, { useRef, memo, useEffect, useCallback, useMemo, useState, useLayoutEffect, } from "react";

// Components
import ActionGroup from "@/src/shared/components/group/action/component";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { LayoutPanelProps } from "@/src/page-builder/ui/editors/layout/types/panel";
import type { PanelSide } from "@/src/page-builder/core/editor/layout/types/panel";

// Utilities
import { devLog } from "@/src/shared/utilities/dev";

// Hooks
import { useDrag } from "@/src/shared/hooks/interface/useDrag";
import { useResize } from "@/src/shared/hooks/interface/useResize";

/**
 * LayoutPanel Component
 * A draggable and resizable LayoutPanel with tab support.
 * - Uses CSS for initial layout, then takes control after measuring the DOM node.
 * - Supports resizing from all sides/corners and dragging the LayoutPanel.
 * - Renders tab buttons and tab content.
 *
 * @param props - LayoutPanelProps
 * @returns The rendered LayoutPanel group or null if no tabs
 */
const LayoutPanel: React.FC<LayoutPanelProps> = ({
    initialPosition = { top: "0px", left: "0px" },
    initialSize = { width: "250px", height: "250px", minWidth: 250, minHeight: 250 },
    initialLocked = true,
    title = "LayoutPanel",
    onClose = () => { },
    tabs = {} }) => {

    // Guard clause: if no tabs, render nothing
    if (!tabs || Object.keys(tabs).length === 0) {
        devLog.warn("[LayoutPanel] No tabs registered, rendering nothing");
        return null;
    }

    // Ref for the LayoutPanel DOM element
    const layoutPanelRef = useRef<HTMLDivElement>(null);

    // Hydration flag: false until measured, then true
    const [hydrated, setHydrated] = useState(false);

    // State for LayoutPanel position and size (controlled after hydration)
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [size, setSize] = useState({ width: 250, height: 250 });
    const [locked, setLocked] = useState(initialLocked);

    // Determine the initial tab ID 
    const [currentTabID, setCurrentTabID] = useState<string>(Object.keys(tabs)[0]);

    // Drag hook
    const { startDrag, stopDrag, handleMouseMove: handleDragMouseMove, dragging } = useDrag(position, setPosition);

    // Resize hook
    const { startResize, stopResize, handleMouseMove: handleResizeMouseMove, resizing, } = useResize(initialSize.minWidth, initialSize.minHeight, size, position, setSize, setPosition);

    /**
     * Memoized inline styles for the LayoutPanel.
     * Uses hydrated state to determine if we should use measured values or initial props.
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
        [hydrated, position, size, initialPosition, initialSize]
    );

    /**
     * Handles mouse down events for both dragging and resizing using event delegation.
     * If a resize handle is clicked, starts resizing; otherwise, starts dragging.
     */
    const handleMouseDown = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (locked) return;
            const target = e.target as HTMLElement;
            const side = target.dataset.position as PanelSide | undefined;

            if (side) {
                e.stopPropagation();
                startResize(e, side);
            } else {
                startDrag(e);
            }
        },
        [startDrag, startResize, locked]
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
     * Toggles the locked state of the LayoutPanel.
     */
    const handleLock = useCallback(() => {
        setLocked((prev) => !prev);
    }, []
    );

    /**
     * Handles LayoutPanel close action.
     */
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]
    );

    /**
     * Handles global mouse move events for dragging and resizing.
     * Delegates to the appropriate handler.
     */
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (locked) return;
            if (dragging.current) {
                handleDragMouseMove(e);
                return;
            }
            if (resizing.current) {
                handleResizeMouseMove(e);
                return;
            }
        },
        [handleDragMouseMove, handleResizeMouseMove, dragging, resizing, locked]
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

    /**
     * On mount, measure the element and set initial position/size.
     * This allows CSS to control layout before React takes over.
     */
    useLayoutEffect(() => {
        if (!layoutPanelRef.current) return;

        const rect = layoutPanelRef.current.getBoundingClientRect();
        setPosition({ left: rect.left, top: rect.top });
        setSize({ width: rect.width, height: rect.height });
        setHydrated(true);
    }, []
    );

    /**
     * Memoized tab button elements.
     */
    const tabActions = useMemo(() => {
        return Object.values(tabs).map((tab) => (
            <button
                key={tab.id}
                className={CSS.Tab}
                data-is-active={tab.id === currentTabID}
                onClick={() => setCurrentTabID(tab.id)}
                title={tab.title}
            >
                {tab.icon()}
            </button>
        ));
    }, [tabs, currentTabID, setCurrentTabID]
    );

    /**
     * Memoized current tab content.
     * If no tab is selected, defaults to the first tab.
     */
    const currentTabContent = useMemo(() => {
        const Content = tabs[currentTabID]?.render();
        if (!Content) return <p>Tab content not available</p>;

        return <Content />;
    }, [currentTabID, tabs]
    );

    const headerActions = useMemo(() => {
        return (
            <>
                <button title="Lock" data-is-active={locked} onClick={handleLock}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffffff" viewBox="0 0 256 256">
                        <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z" />
                    </svg>
                </button>
                <button onClick={handleClose} title="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffffff" viewBox="0 0 256 256">
                        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                    </svg>
                </button>
            </>
        )
    }, [locked, handleLock, handleClose]
    )

    return (
        <div
            className={CSS.LayoutPanel}
            ref={layoutPanelRef}
            style={styles}
            onMouseDown={handleMouseDown}
        >
            {/* Top bar with title and actions */}
            <div className={CSS.LayoutPanel__Header}>
                <span className={CSS.LayoutPanel__Title}>{title}</span>
                <ActionGroup>
                    {headerActions}
                </ActionGroup>
            </div>

            {/* Render all resize handles with data-position for event delegation */}
            {!locked && (
                <>
                    <div className={CSS.LayoutPanel__ResizeHandle} data-position="top-right" title="Resize" />
                    <div className={CSS.LayoutPanel__ResizeHandle} data-position="top-left" title="Resize" />
                    <div className={CSS.LayoutPanel__ResizeHandle} data-position="bottom-left" title="Resize" />
                    <div className={CSS.LayoutPanel__ResizeHandle} data-position="bottom-right" title="Resize" />
                    <div className={CSS.LayoutPanel__ResizeHandle} data-position="top" title="Resize" />
                    <div className={CSS.LayoutPanel__ResizeHandle} data-position="right" title="Resize" />
                    <div className={CSS.LayoutPanel__ResizeHandle} data-position="bottom" title="Resize" />
                    <div className={CSS.LayoutPanel__ResizeHandle} data-position="left" title="Resize" />
                </>
            )}

            {/* Render tab elements if there are multiple tabs */}
            {tabActions.length > 1 && (
                <ActionGroup className="LayoutPanelTabActions" direction="vertical">
                    {tabActions}
                </ActionGroup>
            )}

            {/* Render current tab content */}
            {currentTabContent}
        </div>
    );
};

export default memo(LayoutPanel);