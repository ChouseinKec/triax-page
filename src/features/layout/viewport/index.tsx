"use client";
import React, { useState, useCallback, MouseEvent, useRef, useEffect, memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Managers
import { useSelectedDevice, useSelectedOrientation, useSelectedWorkbenchID } from "@/src/core/layout/page/managers";

// REGISTRY_DEFINITIONS
import { getRegisteredViewportByWorkbenchID } from "@/src/core/layout/viewport/registries";

const ViewportEditor: React.FC = () => {
    const [zoom, setZoom] = useState(0.8);
    const [pan, setPan] = useState({ x: 350, y: 50 });
    const [isPanning, setIsPanning] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
    const selectedWorkbench = useSelectedWorkbenchID();

    // Ref for the canvas element
    const viewRef = useRef<HTMLDivElement>(null);
    const selectedDevice = useSelectedDevice();
    const selectedOrientation = useSelectedOrientation();

    // Get base dimensions from device template
    const baseWidth = selectedDevice?.template?.width || 1920;
    const baseHeight = selectedDevice?.template?.height || 1080;


    // For 'all' orientation, use template dimensions as-is
    // For 'landscape', ensure width > height
    // For 'portrait', ensure height > width
    const orientationValue = selectedOrientation?.value;
    let deviceWidth: number;
    let deviceHeight: number;
    switch (orientationValue) {
        case 'all':
            deviceWidth = baseWidth;
            deviceHeight = baseHeight;
            break;
        case 'landscape':
            deviceWidth = Math.max(baseWidth, baseHeight);
            deviceHeight = Math.min(baseWidth, baseHeight);
            break;
        default:
            deviceWidth = Math.min(baseWidth, baseHeight);
            deviceHeight = Math.max(baseWidth, baseHeight);
            break;
    }

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

    // const handleReset = useCallback(() => {
    //     setZoom(1);
    //     setPan({ x: 0, y: 0 });
    // }, []
    // );

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
            style={{
                cursor: isPanning ? 'grabbing' : 'default',
                backgroundSize: `${30 * zoom}px ${30 * zoom}px`
            }}
        >
            {/* Content with zoom and pan transforms */}
            <div
                className={CSS.Content}
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
                    <div className={CSS.Empty}>
                        No viewport available
                    </div>
                }

            </div>

        </div>
    );
}
export default memo(ViewportEditor);