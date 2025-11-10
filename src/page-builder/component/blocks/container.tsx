import React, { useCallback, memo, useRef } from 'react';

// Types
import type { BlockChildren, BlockInstance } from '@/src/page-builder/core/block/block/types';

// Manager
import { useIsBlockSelected, selectBlock, getBlockRenderedAttributes, getBlockRenderedStyles } from '@/src/page-builder/service/managers/block';


/**
 * Renders a container block that can hold other blocks.
 * 
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this container
 * @returns JSX element representing the container block
 */
const ContainerRender: React.FC<{ instance: BlockInstance; children?: BlockChildren }> = ({ instance, children }) => {
    const blockID = instance.id;
    const isSelected = useIsBlockSelected(blockID);
    const blockAttributes = getBlockRenderedAttributes(blockID);
    const blockStyles = getBlockRenderedStyles(blockID);
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


export default memo(ContainerRender);