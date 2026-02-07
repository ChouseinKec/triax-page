import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { addBlockNode, setBlockNodeSelectedNodeID, useBlockNodeElementKey } from '@/core/block/node/managers';
import { useBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a table caption block.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table caption
 * @returns JSX element representing the table caption block
 */
const BlockTableCaptionComponent: React.FC<NodeComponentProps> = ({ nodeID, deviceKey, orientationKey, pseudoKey, isSelected, children }) => {
    const nodeElementKey = useBlockNodeElementKey(nodeID);
    const nodeAttributes = useBlockAttributesRendered(nodeID);
    const nodeStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setBlockNodeSelectedNodeID(nodeID);
    }, [nodeID]);

    /**
     * Handles adding a new text block to this table caption.
     */
    const handleAddTextBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addBlockNode('core-text', nodeID, 'p');
    }, [nodeID]);

    // Check if table caption has children
    const hasChildren = React.Children.count(children) > 0;

    const Tag = nodeElementKey as React.ElementType;
    return hasChildren ? (
        <Tag
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="table-caption"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            {/* Render child blocks */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </Tag>
    ) : (
        <Placeholder
            as="caption"
            title="Empty Table Caption"
            description="Provide a title or description for your table"
            actions={[{
                label: "Add Text",
                onClick: handleAddTextBlock
            }]}
            onSelect={handleSelectBlock}
            isSelected={isSelected}
        />
    );
};

export default memo(BlockTableCaptionComponent);