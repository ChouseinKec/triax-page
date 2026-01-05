"use client";
import React, { useRef, memo, useCallback, useMemo, useState, useLayoutEffect, } from "react";

// Components
import ActionGroup from "@/src/shared/components/group/action/component";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { PanelProps } from "./types";

// Hooks
import { useDrag } from "@/src/shared/hooks/interface/useDrag";
import { useResize } from "@/src/shared/hooks/interface/useResize";

/**
 * Panel Component
 * A draggable and resizable Panel with tab support.
 * - Uses CSS for initial layout, then takes control after measuring the DOM node.
 * - Supports resizing from all sides/corners and dragging the Panel.
 * - Renders tab buttons and tab content.
 *
 * @param props - PanelProps
 * @returns The rendered Panel group or null if no tabs
 */
const Panel: React.FC<PanelProps> = ({
    initialPosition = { top: "0px", left: "0px" },
    initialSize = { width: "250px", height: "250px", minWidth: 250, minHeight: 250 },
    initialLocked = true,
    title = "Panel",
    onClose = () => { },
    tabs = {} }) => {

    // Ref for the Panel DOM element
    const layoutPanelRef = useRef<HTMLDivElement>(null);

    // Hydration flag: false until measured, then true
    const [hydrated, setHydrated] = useState(false);

    // State for Panel position and size (controlled after hydration)
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [size, setSize] = useState({ width: 250, height: 250 });
    const [locked, setLocked] = useState(initialLocked);

    // Determine the initial tab ID 
    const [currentPanelTabID, setCurrentPanelTabID] = useState<string>(Object.keys(tabs)[0]);

    // Resize hook
    const { handles } = useResize(layoutPanelRef, initialSize.minWidth, initialSize.minHeight, size, position, setSize, setPosition, locked);

    // Drag hook
    useDrag(layoutPanelRef, setPosition, (e) => !(e.target as Element)?.closest('[data-position]'), locked);


    /**
     * Memoized inline styles for the Panel.
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
     * Toggles the locked state of the Panel.
     */
    const handleLock = useCallback(() => {
        setLocked((prev) => !prev);
    }, []
    );

    /**
     * Handles Panel close action.
     */
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]
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
                data-is-active={tab.id === currentPanelTabID}
                onClick={() => setCurrentPanelTabID(tab.id)}
                title={tab.title}
            >
                {tab.icon()}
            </button>
        ));
    }, [tabs, currentPanelTabID, setCurrentPanelTabID]
    );

    /**
     * Memoized current tab content.
     * If no tab is selected, defaults to the first tab.
     */
    const currentTabContent = useMemo(() => {
        const Content = tabs[currentPanelTabID]?.render();

        if (!Content) return <p>Tab content not available</p>;

        return <Content />;
    }, [currentPanelTabID, tabs]
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
            className={CSS.Panel}
            ref={layoutPanelRef}
            style={styles}
        >
            {/* Top bar with title and actions */}
            <div className={CSS.Header}>
                <span className={CSS.Title}>{title}</span>
                <ActionGroup>
                    {headerActions}
                </ActionGroup>
            </div>

            {/* Render resize handles */}
            <div className={CSS.ResizeHandles}>
                {handles}
            </div>

            {/* Render tab elements if there are multiple tabs */}
            {tabActions.length > 1 && (
                <ActionGroup direction="vertical">
                    {tabActions}
                </ActionGroup>
            )}

            {/* Render current tab content */}
            {currentTabContent}
        </div>
    );
};

export default memo(Panel);