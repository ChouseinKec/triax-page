import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';
import { getBlockNodeData } from '@/core/block/node/managers';
import { getBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders an image block.
 *
 * @param instance - The block instance data
 * @returns JSX element representing the image block
 */
const BlockImageComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance }) => {
    const nodeID = instance.id;
    const NodeElementKey = instance.elementKey as React.ElementType;
    const nodeAttributes = getBlockAttributesRendered(nodeID);
    const nodeStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    // Get image data
    const data = getBlockNodeData(nodeID);
    const src = data?.src || '';
    const alt = data?.alt || '';

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setBlockNodeSelectedNodeID(nodeID);
    }, [nodeID]);

    /**
     * Handles image upload/replacement
     */
    const handleUploadImage = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        // TODO: Implement image upload functionality
        console.log('Upload image for block:', nodeID);
    }, [nodeID]);

    return (
        <NodeElementKey
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="image"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            {/* Render image or placeholder */}
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            ) : (
                <Placeholder
                    message="Add an image"
                    description="Upload or select an image to display in your content"
                    actions={[{
                        label: "Upload Image",
                        onClick: handleUploadImage
                    }]}
                    isSelected={isSelected}
                />
            )}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </NodeElementKey>
    );
};

export default memo(BlockImageComponent);