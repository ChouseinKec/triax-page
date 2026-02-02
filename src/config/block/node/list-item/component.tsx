import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { setSelectedNodeID } from '@/core/block/node/managers/commands';
import { setPanelOpenState } from '@/core/layout/panel/managers/commands/panel';
import { getNodeRenderedAttributes } from '@/core/block/attribute/managers';
import { useBlockRenderedStyles } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a list item block.
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this list item
 * @returns JSX element representing the list item block
 */
const BlockListItemComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
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
     * Opens the library panel to let users choose what block to add
     */
    const handleAddBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        // First select this list item
        setSelectedNodeID(nodeID);
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
                    message="List item is empty"
                    actions={[{
                        label: "Add Block",
                        onClick: handleAddBlock
                    }]}
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