import React, { useCallback, memo } from 'react';

// Types
import type { BlockChildren, BlockInstance } from '@/src/page-builder/core/block/block/types';

// Manager
import { useHasBlockSelectedContent, useIsBlockSelected, selectBlock, useRenderedBlockAttributes, useRenderedBlockStyles } from '@/src/page-builder/services/managers/block';

/**
 * Renders a container block that can hold other blocks.
 * 
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this container
 * @returns JSX element representing the container block
 */
const ContainerRender: React.FC<{ instance: BlockInstance; children?: BlockChildren }> = ({ instance, children }) => {
    const isSelected = useIsBlockSelected(instance.id);
    const hasChildSelected = useHasBlockSelectedContent(instance.id);
    const blockAttributes = useRenderedBlockAttributes(instance.id);
    const blockStyles = useRenderedBlockStyles(instance.id);

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        selectBlock(instance.id);
    }, [selectBlock, instance.id]
    );

    return (
        <div
            id={`block-${instance.id}`}
            onClick={handleSelectBlock}
            data-block-type="container"
            data-is-selected={isSelected}
            data-has-selected-descendant={hasChildSelected}
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