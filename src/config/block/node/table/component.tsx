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
 * Renders a table block that can hold table rows.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this table
 * @returns JSX element representing the table block
 */
const BlockTableComponent: React.FC<NodeComponentProps> = ({ nodeID, deviceKey, orientationKey, pseudoKey, isSelected, children }) => {
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
     * Handles adding a new table section to this table.
     */
    const handleAddTableSection = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addBlockNode('core-table-body', nodeID, 'tbody');
    }, [nodeID]);


    // Check if table has children
    const hasChildren = React.Children.count(children) > 0;
    const Tag = nodeElementKey as React.ElementType;
    return hasChildren
        ? (
            <Tag
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
            </Tag>
        )
        : (
            <Placeholder
                as="table"
                title="Empty Table"
                description="Add header, body, or footer sections to organize your content"
                actions={[{
                    label: "Add Body",
                    onClick: handleAddTableSection
                }]}
                onSelect={handleSelectBlock}
                isSelected={isSelected}
                wrap={['tbody', 'tr', 'td']}
            />
        );
};

export default memo(BlockTableComponent);