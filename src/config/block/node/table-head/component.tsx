import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { addBlockNode, setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';
import { getBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a table head block that can hold table rows.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table head
 * @returns JSX element representing the table head block
 */
const BlockTableHeadComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
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
     * Handles adding a new table row to this table head.
     */
    const handleAddTableRow = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addBlockNode('core-table-row', nodeID, 'tr');
    }, [nodeID]);

    // Check if table head has children
    const hasChildren = React.Children.count(children) > 0;

    return hasChildren ? (
        <NodeElementKey
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="table-head"
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
            as="thead"
            message="Add header rows"
            description="Create table header rows with column titles"
            actions={[{
                label: "Add Row",
                onClick: handleAddTableRow
            }]}
            onSelect={handleSelectBlock}
            isSelected={isSelected}
            wrap={['tr', 'td']}
        />
    );
};

export default memo(BlockTableHeadComponent);