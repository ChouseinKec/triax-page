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
 * Renders a list item block.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this list item
 * @returns JSX element representing the list item block
 */
const BlockListItemComponent: React.FC<NodeComponentProps> = ({ nodeID, deviceKey, orientationKey, pseudoKey, isSelected, children }) => {
    const NodeElementKey = useBlockNodeElementKey(nodeID) as React.ElementType;
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
        // First select this list item
        setBlockNodeSelectedNodeID(nodeID);
        // Then open the library panel
        setPanelOpenState('library', true);
    }, [nodeID]);

    return (
        <NodeElementKey
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="list-item"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            {/* Render child blocks or placeholder */}
            {React.Children.count(children) > 0 ? children : (
                <Placeholder
                    title="List item is empty"
                    actions={[{
                        label: "Add Block",
                        onClick: handleAddBlock
                    }]}
                    isSelected={isSelected}
                />
            )}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </NodeElementKey>
    );
};

export default memo(BlockListItemComponent);