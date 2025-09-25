"use client";
import React, { useState, useCallback, MouseEvent, useRef, useEffect, memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useSelectedDevice, useSelectedWorkbenchID } from "@/src/page-builder/services/managers/page";

// Registries
import { getRegisteredViewportByWorkbenchID } from "@/src/page-builder/state/registries/viewport";

const ViewportEditor: React.FC = () => {
    const [zoom, setZoom] = useState(0.8);
    const [pan, setPan] = useState({ x: 350, y: 50 });
    const [isPanning, setIsPanning] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
    const selectedWorkbench = useSelectedWorkbenchID();

    // Ref for the canvas element
    const viewRef = useRef<HTMLDivElement>(null);
    const selectedDevice = useSelectedDevice();
    const { width: deviceWidth, height: deviceHeight } = selectedDevice?.template || { width: 1920, height: 1080 };

    /**
     * Use native event listener to properly prevent default on wheel events
     */
    useEffect(() => {
        const canvas = viewRef.current;
        if (!canvas) return;

        const handleNativeWheel = (e: Event) => {
            const wheelEvent = e as globalThis.WheelEvent;

            if (!wheelEvent.ctrlKey) return;

            // Prevent page zoom when Ctrl+wheel
            e.preventDefault();

            const zoomSensitivity = 0.001;
            const minZoom = 0.2;
            const maxZoom = 2;

            const delta = -wheelEvent.deltaY * zoomSensitivity;

            setZoom(prevZoom => {
                const newZoom = Math.min(Math.max(prevZoom + delta, minZoom), maxZoom);

                // Get cursor position relative to the container
                const rect = canvas.getBoundingClientRect();
                const cursorX = wheelEvent.clientX - rect.left;
                const cursorY = wheelEvent.clientY - rect.top;

                // Calculate new pan position to zoom towards cursor
                const zoomRatio = newZoom / prevZoom;

                setPan(prevPan => ({
                    x: cursorX - (cursorX - prevPan.x) * zoomRatio,
                    y: cursorY - (cursorY - prevPan.y) * zoomRatio
                }));

                return newZoom;
            });
        };

        // Add event listener with { passive: false } to allow preventDefault
        canvas.addEventListener('wheel', handleNativeWheel, { passive: false });

        return () => {
            canvas.removeEventListener('wheel', handleNativeWheel);
        };
    }, []
    );

    const handleMouseDown = useCallback((e: MouseEvent) => {
        if (e.button === 1) { // Middle mouse button
            e.preventDefault();
            setIsPanning(true);
            setLastPanPoint({ x: e.clientX, y: e.clientY });
        }
    }, []
    );

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isPanning) return;

        e.preventDefault();
        const deltaX = e.clientX - lastPanPoint.x;
        const deltaY = e.clientY - lastPanPoint.y;

        setPan(prevPan => ({
            x: prevPan.x + deltaX,
            y: prevPan.y + deltaY
        }));

        setLastPanPoint({ x: e.clientX, y: e.clientY });
    }, [isPanning, lastPanPoint]
    );

    const handleMouseUp = useCallback((e: MouseEvent) => {
        if (e.button === 1) {
            setIsPanning(false);
        }
    }, []
    );

    const handleReset = useCallback(() => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    }, []
    );

    const viewportInstance = useMemo(() => {
        const currentViewport = getRegisteredViewportByWorkbenchID(selectedWorkbench);

        if (!currentViewport || !currentViewport.render) return null;
        return currentViewport.render();
    }, [selectedWorkbench]
    )


    return (
        <div className={CSS.ViewportEditor}
            ref={viewRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsPanning(false)}
            style={{ cursor: isPanning ? 'grabbing' : 'default' }}
        >
            {/* Content with zoom and pan transforms */}
            <div
                className={CSS.ViewportEditor__Content}
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: '0 0',
                    transition: isPanning ? 'none' : 'transform 0.1s ease-out',
                    width: `${deviceWidth}px`,
                    height: `${deviceHeight}px`,
                    position: 'relative',
                }}
            >

                {viewportInstance
                    ? viewportInstance
                    :
                    <div className={CSS.ViewportEditor__Empty}>
                        No content available
                    </div>
                }

            </div>

        </div>
    );
}
export default memo(ViewportEditor);