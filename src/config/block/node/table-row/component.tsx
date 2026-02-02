import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { addNode, setSelectedNodeID } from '@/core/block/node/managers/commands';
import { getNodeRenderedAttributes } from '@/core/block/attribute/managers';
import { useBlockRenderedStyles } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a table row block.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table row
 * @returns JSX element representing the table row block
 */
const BlockTableRowComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
    const nodeID = instance.id;
    const NodeElementKey = instance.elementKey as React.ElementType;
    const nodeAttributes = getNodeRenderedAttributes(nodeID);
    const nodeStyles = useBlockRenderedStyles(nodeID, deviceKey, orientationKey, pseudoKey);

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedNodeID(nodeID);
    }, [nodeID]);

    /**
     * Handles adding a new table cell to this row.
     */
    const handleAddTableCell = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addNode('core-table-cell', nodeID, 'td');
    }, [nodeID]);

    // Check if table row has children
    const hasChildren = React.Children.count(children) > 0;

    return hasChildren ? (
        <NodeElementKey
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
        </NodeElementKey>
    ) : (
        <tr
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="table-row"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            <td style={{ border: 'none', padding: 0 }}>
                <Placeholder
                    message="Add table cells"
                    description="Create cells to hold your table data and content"
                    actions={[{
                        label: "Add Cell",
                        onClick: handleAddTableCell
                    }]}
                />
            </td>

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </tr>
    );
};

export default memo(BlockTableRowComponent);