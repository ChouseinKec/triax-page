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
 * Renders a table foot block that can hold table rows.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table foot
 * @returns JSX element representing the table foot block
 */
const BlockTableFootComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
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
     * Handles adding a new table row to this table foot.
     */
    const handleAddTableRow = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addNode('core-table-row', nodeID, 'tr');
    }, [nodeID]);

    // Check if table foot has children
    const hasChildren = React.Children.count(children) > 0;

    return hasChildren ? (
        <NodeElementKey
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="table-foot"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            {/* Render child blocks (table rows) */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </NodeElementKey>
    ) : (
        <Placeholder
            as="tfoot"
            message="Add footer rows"
            description="Create table footer rows with summary data"
            actions={[{
                label: "Add Row",
                onClick: handleAddTableRow
            }]}
            onSelect={handleSelectBlock}
        />
    );
};

export default memo(BlockTableFootComponent);