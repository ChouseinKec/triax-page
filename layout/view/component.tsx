"use client";
import React, { useState, useCallback, MouseEvent, useRef, useEffect } from "react";

// Styles
import CSS from "./styles.module.scss";

// Context
import { ViewPanel as ViewPanelContext } from "@/context/layout/manager";

// Components
import BlockEditor from "@/editors/block/component";

// Hooks
import { usePageManager } from "@/hooks/page/manager";

export default function ViewPanel() {
    const { items } = ViewPanelContext.usePanel();
    const [zoom, setZoom] = useState(0.8);
    const [pan, setPan] = useState({ x: 350, y: 50 });
    const [isPanning, setIsPanning] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
    const { getDevice } = usePageManager();


    // Ref for the canvas element
    const canvasRef = useRef<HTMLDivElement>(null);
    const { template: { width: deviceWidth, height: deviceHeight } } = getDevice();



    /**
     * Use native event listener to properly prevent default on wheel events
     */
    useEffect(() => {
        const canvas = canvasRef.current;
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

    return (
        <div className={CSS.ViewPanel}
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsPanning(false)}
            style={{ cursor: isPanning ? 'grabbing' : 'default' }}
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

                <BlockEditor />


                {items.map(item => (
                    <React.Fragment key={item.id}>
                        {item.component}
                    </React.Fragment>
                ))}
            </div>


        </div>
    );
}