import React, { useCallback, useRef } from 'react';


// Types
import type { BlockComponentProps } from '@/src/core/block/instance/types';

// Manager
import { useIsBlockSelected, selectBlock, getBlockComponentedAttributes } from '@/src/core/block/instance/managers';
import { useBlockRenderedStyles } from '@/src/core/block/style/managers/';


/**
 * Renders a container block that can hold other blocks.
 * 
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this container
 * @returns JSX element representing the container block
 */
const BlockContainerComponent: React.FC<BlockComponentProps> = ({ instance, children }) => {
    const blockID = instance.id;
    const isSelected = useIsBlockSelected(blockID);
    const blockAttributes = getBlockComponentedAttributes(blockID);
    const blockStyles = useBlockRenderedStyles(blockID);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        selectBlock(blockID);
    }, [blockID]
    );

    return (
        <div
            id={`block-${blockID}`}
            ref={containerRef}
            onClick={handleSelectBlock}

            data-block-type="container"
            data-is-selected={isSelected}

            {...blockAttributes}
        >
            {/* Render child blocks */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {blockStyles}
            </style>
        </div>
    );
}


export default BlockContainerComponent;