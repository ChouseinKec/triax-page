import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { setBlockNodeSelectedNodeID, useBlockNodeElementKey } from '@/core/block/node/managers';
import { setPanelOpenState } from '@/core/layout/panel/managers/commands/panel';
import { useBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a table header cell block.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table header cell
 * @returns JSX element representing the table header cell block
 */
const BlockTableHeaderCellComponent: React.FC<NodeComponentProps> = ({ nodeID, deviceKey, orientationKey, pseudoKey, isSelected, children }) => {
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
     * Opens the library panel to let users choose what block to add
     */
    const handleAddBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        // First select this table header cell
        setBlockNodeSelectedNodeID(nodeID);
        // Then open the library panel
        setPanelOpenState('library', true);
    }, [nodeID]);

    // Check if table header cell has children
    const hasChildren = React.Children.count(children) > 0;
    const Tag = nodeElementKey as React.ElementType;
    return hasChildren ? (
        <Tag
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="table-header-cell"
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
            as="th"
            title="Add header content"
            description="Insert text or other blocks into this table header cell"
            actions={[{
                label: "Add Block",
                onClick: handleAddBlock
            }]}
            isSelected={isSelected}
        />
    );
};

export default memo(BlockTableHeaderCellComponent);