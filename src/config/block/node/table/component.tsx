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
 * Renders a table block that can hold table rows.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table
 * @returns JSX element representing the table block
 */
const BlockTableComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
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
     * Handles adding a new table section to this table.
     */
    const handleAddTableSection = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addNode('core-table-body', nodeID, 'tbody');
    }, [nodeID]);


    // Check if table has children
    const hasChildren = React.Children.count(children) > 0;

    return hasChildren
        ? (
            <NodeElementKey
                className={`block-${nodeID}`}
                onClick={handleSelectBlock}

                data-block-type="table"
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
        )
        : (
            <Placeholder
                as="div"
                message="Build your table"
                description="Add header, body, or footer sections to organize your content"
                actions={[{
                    label: "Add Body",
                    onClick: handleAddTableSection
                }]}
                onSelect={handleSelectBlock}
            />
        );
};

export default memo(BlockTableComponent);