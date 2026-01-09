"use client";
import React, { useState, useCallback, MouseEvent, useRef, useEffect, memo, useMemo } from "react";

// Types
import type { ViewportProps } from "./types";

// Styles
import CSS from "./styles.module.scss";

// Registry
import { getRegisteredViewport } from "@/src/core/layout/viewport/registries";
import { getRegisteredAction } from "@/src/core/layout/viewport/registries";

const Viewport: React.FC<ViewportProps> = ({ selectedWorkbench }) => {
    const [zoom, setZoom] = useState(0.8);
    const [pan, setPan] = useState({ x: 350, y: 50 });
    const [isPanning, setIsPanning] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
    // const actionInstances = 

    // Ref for the canvas element
    const viewRef = useRef<HTMLDivElement>(null);

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

    const ViewportComponent = useMemo(() => {
        const currentViewport = getRegisteredViewport(selectedWorkbench.key, 'workbench');

        if (!currentViewport || !currentViewport.component) return null;
        return currentViewport.component;
    }, [selectedWorkbench]
    )


    return (
        <div className={CSS.Viewport}
            ref={viewRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsPanning(false)}
            style={{ cursor: isPanning ? 'grabbing' : 'default', backgroundSize: `${30 * zoom}px ${30 * zoom}px` }}
        >

            <div className={CSS.Toolbar}>
                HOLA AMIGOS
            </div>

            {/* Content with zoom and pan transforms */}
            <div
                className={CSS.Scene}
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: '0 0',
                    transition: isPanning ? 'none' : 'transform 0.1s ease-out',
                    position: 'relative',
                }}
            >

                {ViewportComponent
                    ?
                    <div className={CSS.View}>
                        <ViewportComponent />
                    </div>
                    :
                    <div className={CSS.Empty}>
                        No viewport available
                    </div>
                }

            </div>


        </div>
    );
}
export default memo(Viewport);