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
 * Renders a table foot block that can hold table rows.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table foot
 * @returns JSX element representing the table foot block
 */
const BlockTableFootComponent: React.FC<NodeComponentProps> = ({ nodeID, deviceKey, orientationKey, pseudoKey, isSelected, children }) => {
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
     * Handles adding a new table row to this table foot.
     */
    const handleAddTableRow = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addBlockNode('core-table-row', nodeID, 'tr');
    }, [nodeID]);

    // Check if table foot has children
    const hasChildren = React.Children.count(children) > 0;
    const Tag = nodeElementKey as React.ElementType;
    return hasChildren ? (
        <Tag
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
        </Tag>
    ) : (
        <Placeholder
            as="tfoot"
            title="Empty Table Foot"
            description="Create table footer rows with summary data"
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

export default memo(BlockTableFootComponent);