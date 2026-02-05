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
 * Renders a table body block that can hold table rows.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table body
 * @returns JSX element representing the table body block
 */
const BlockTableBodyComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
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
     * Handles adding a new table row to this table body.
     */
    const handleAddTableRow = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addBlockNode('core-table-row', nodeID, 'tr');
    }, [nodeID]);

    // Check if table body has children
    const hasChildren = React.Children.count(children) > 0;

    return hasChildren ? (
        <NodeElementKey
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="table-body"
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
            as="tbody"
            message="Empty Table Body"
            description="Create table body rows with your data"
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

export default memo(BlockTableBodyComponent);