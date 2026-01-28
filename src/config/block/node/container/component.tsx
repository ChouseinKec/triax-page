import React, { useCallback, useRef, memo } from 'react';


// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { setSelectedNodeID, getNodeRenderedAttributes } from '@/core/block/node/managers';
import { useBlockRenderedStyles } from '@/core/block/style/managers';


/**
 * Renders a container block that can hold other blocks.
 * 
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this container
 * @returns JSX element representing the container block
 */
const BlockContainerComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
    const NodeID = instance.id;
    const NodeAttributes = getNodeRenderedAttributes(NodeID);
    const NodeStyles = useBlockRenderedStyles(NodeID, deviceKey, orientationKey, pseudoKey);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedNodeID(NodeID);
    }, [NodeID]
    );

    return (
        <div
            className={`block-${NodeID}`}
            ref={containerRef}
            onClick={handleSelectBlock}

            data-block-type="container"
            data-is-selected={isSelected}

            {...NodeAttributes}
        >
            {/* Render child blocks */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {NodeStyles}
            </style>
        </div>
    );
}


export default memo(BlockContainerComponent);