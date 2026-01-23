"use client";
import React, { useRef, useCallback, useMemo, useState, memo, useEffect } from "react";

// Components
import Action from "./action";
import Tab from "./tab";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { PanelProps } from "./types";

// Managers
import { usePanel, setPanelPosition, setPanelSize } from "@/core/layout/panel/managers";

// Utilities
import { convertPositionToPx, convertSizeToPx, convertPxToPosition, convertPxToSize, calculatePanelStyles, } from "@/core/layout/panel/utilities";

// Hooks
import { useDrag } from "@/shared/hooks/interface/useDrag";
import { useResize } from "@/shared/hooks/interface/useResize";

/**
 * Panel Component
 * A draggable and resizable Panel with tab support.
 * - Positioned based on anchor points in %.
 * - Sizes in % with min constraints in px.
 * - Supports resizing from all sides/corners and dragging the Panel.
 * - Renders tab buttons and tab content.
 *
 * @param props - PanelProps
 */
const Panel: React.FC<PanelProps> = ({ panelKey }) => {
    const panel = usePanel(panelKey);

    // Stored position and size from the panel (in %)
    const { position: storedPosition, size: storedSize, isLocked, title, icon } = panel || { position: { top: 0, left: 0 }, size: { width: 0, height: 0, minWidth: 0, minHeight: 0 }, isLocked: false, title: '', icon: null };

    // ViewEditor dimensions for conversions
    const vh = typeof window === 'undefined' ? 1000 : window.innerHeight;
    const vw = typeof window === 'undefined' ? 1920 : window.innerWidth;

    // Refs for DOM and interaction tracking
    const layoutPanelRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const isResizingRef = useRef(false);

    // Local working position and size (in %) - updated during drag/resize for visual feedback
    const [currentPosition, setCurrentPosition] = useState(storedPosition);
    const [currentSize, setCurrentSize] = useState(storedSize);

    // Pixel equivalents for drag/resize hooks (in px) - kept in sync with current position/size
    const [currentPixelPosition, setCurrentPixelPosition] = useState(() => convertPositionToPx(storedPosition, storedSize, vh, vw));
    const [currentPixelSize, setCurrentPixelSize] = useState(() => convertSizeToPx(storedSize, vh, vw));

    // Update local state when position/size changes from store
    useEffect(() => {
        setCurrentPosition(storedPosition);
        setCurrentSize(storedSize);
        const newPxPosition = convertPositionToPx(storedPosition, storedSize, vh, vw);
        const newPxSize = convertSizeToPx(storedSize, vh, vw);
        setCurrentPixelPosition(newPxPosition);
        setCurrentPixelSize(newPxSize);
    }, [storedPosition, storedSize, vh, vw]
    );

    // Update store on mouse up
    useEffect(() => {
        const handleMouseUp = () => {
            if (isDraggingRef.current) {
                setPanelPosition(panelKey, currentPosition);
                isDraggingRef.current = false;
            }
            if (isResizingRef.current) {
                setPanelSize(panelKey, currentSize);
                isResizingRef.current = false;
            }
        };
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, [currentPosition, currentSize, panelKey, setPanelPosition, setPanelSize]
    );

    // Handlers for updating local state during drag/resize
    const handlePositionChange = useCallback((newPos: { top: number; left: number }) => {
        setCurrentPixelPosition(newPos);
        const newPosition = convertPxToPosition(newPos, currentPixelSize, vh, vw, currentPosition);
        setCurrentPosition(newPosition);
        isDraggingRef.current = true;
    }, [currentPixelSize, vh, vw, currentPosition]
    );

    const handleSizeChange = useCallback((newSize: { width: number; height: number }) => {
        setCurrentPixelSize(newSize);
        const newSizePercent = convertPxToSize(newSize, vh, vw);
        setCurrentSize({ ...currentSize, ...newSizePercent });
        isResizingRef.current = true;
    }, [vh, vw, currentSize]
    );

    // Resize hook
    const { handles } = useResize(layoutPanelRef, storedSize.minWidth, storedSize.minHeight, currentPixelSize, currentPixelPosition, handleSizeChange, handlePositionChange, isLocked);

    // Drag hook
    useDrag(layoutPanelRef, handlePositionChange, (e) => !(e.target as Element)?.closest('[data-position]'), isLocked);

    /**
     * Memoized inline styles for the Panel.
     */
    const styles = useMemo(() => calculatePanelStyles(currentPosition, currentSize), [currentPosition, currentSize]);

    if (!panel || !panel.isOpen) return null;

    return (
        <div
            className={CSS.Panel}
            ref={layoutPanelRef}
            style={styles}
        >
            {/* Top bar with title and actions */}
            <div className={CSS.Header}>
                <span className={CSS.Title}>{panel.title}</span>
                <Action panelKey={panelKey} isLocked={isLocked} />
            </div>

            {/* Render resize handles */}
            <div className={CSS.ResizeHandles}>
                {handles}
            </div>

            {/* Render tabs and tab content */}
            <Tab panelKey={panelKey} />
        </div>
    );
};

export default memo(Panel);