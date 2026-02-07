import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';
import { getBlockNodeElementKey } from '@/core/block/node/managers';
import { useBlockAttributesRendered, useBlockAttribute } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Assets
import imagePlaceholder from '@/shared/assets/images/image-placeholder.png';

/**
 * Renders an image block.
 *
 * @param nodeID - The unique identifier of the block instance
 * @returns JSX element representing the image block
 */
const BlockImageComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, nodeID }) => {
    const nodeElementKey = getBlockNodeElementKey(nodeID);
    const nodeAttributes = useBlockAttributesRendered(nodeID);
    const nodeStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    // Get image data
    const src = useBlockAttribute(nodeID, 'src');

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setBlockNodeSelectedNodeID(nodeID);
    }, [nodeID]
    );


    const Tag = nodeElementKey as React.ElementType;

    return (src
        ? (
            <>
                <Tag
                    className={`block-${nodeID}`}
                    onClick={handleSelectBlock}

                    data-block-type="image"
                    data-is-selected={isSelected}

                    {...nodeAttributes} />

                <style>
                    {nodeStyles}
                </style>

            </>
        ) : (
            <img
                className={`block-${nodeID}`}
                src={imagePlaceholder.src}
                alt="Add an image - Upload or select an image to display in your content"
                onClick={handleSelectBlock}
                data-is-selected={isSelected}
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    cursor: 'pointer',
                    opacity: isSelected ? 0.8 : 0.6
                }}
            />
        )


    );
};

export default memo(BlockImageComponent);