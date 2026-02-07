import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { addBlockNode, setBlockNodeSelectedNodeID, useBlockNodeElementKey } from '@/core/block/node/managers/';
import { useBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a table row block.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table row
 * @returns JSX element representing the table row block
 */
const BlockTableRowComponent: React.FC<NodeComponentProps> = ({ nodeID, deviceKey, orientationKey, pseudoKey, isSelected, children }) => {
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
     * Handles adding a new table cell to this row.
     */
    const handleAddTableCell = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addBlockNode('core-table-cell', nodeID, 'td');
    }, [nodeID]);

    // Check if table row has children
    const hasChildren = React.Children.count(children) > 0;
    const Tag = nodeElementKey as React.ElementType;
    return hasChildren ? (
        <Tag
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="table-row"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            {/* Render child blocks (table cells) */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </Tag>
    ) : (

        <Placeholder
            as="tr"
            title="Empty Table Row"
            description="Create cells to hold your table data and content"
            actions={[{
                label: "Add Cell",
                onClick: handleAddTableCell
            }]}
            isSelected={isSelected}
            onSelect={handleSelectBlock}
            wrap={['td']}
        />


    );
};

export default memo(BlockTableRowComponent);