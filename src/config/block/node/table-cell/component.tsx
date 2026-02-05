import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';
import { setPanelOpenState } from '@/core/layout/panel/managers/commands/panel';
import { getBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a table cell block.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table cell
 * @returns JSX element representing the table cell block
 */
const BlockTableCellComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
    const nodeID = instance.id;
    const NodeElementKey = instance.elementKey as React.ElementType;
    const nodeAttributes = getBlockAttributesRendered(nodeID);
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
        // First select this table cell
        setBlockNodeSelectedNodeID(nodeID);
        // Then open the library panel
        setPanelOpenState('library', true);
    }, [nodeID]);

    // Check if table cell has children
    const hasChildren = React.Children.count(children) > 0;

    return hasChildren ? (
        <NodeElementKey
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="table-cell"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            {/* Render child blocks */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </NodeElementKey>
    ) : (
        <Placeholder
            as="td"
            message="Empty Table Cell"
            description="Insert text, images, or other blocks to populate this table cell"
            actions={[{
                label: "Add Block",
                onClick: handleAddBlock
            }]}
            isSelected={isSelected}
        />
    );
};

export default memo(BlockTableCellComponent);