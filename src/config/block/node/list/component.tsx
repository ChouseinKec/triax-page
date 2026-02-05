import React, { useCallback, useRef, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { addBlockNode, setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';
import { getBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a list block that can be either an unordered list (ul) or ordered list (ol).
 *
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this list
 * @returns JSX element representing the list block
 */
const BlockListComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
    const nodeID = instance.id;
    const NodeElementKey = instance.elementKey as React.ElementType;
    const nodeAttributes = getBlockAttributesRendered(nodeID);
    const nodeStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelect = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setBlockNodeSelectedNodeID(nodeID);
    }, [nodeID]);

    /**
     * Handles adding a new list item to this list.
     */
    const handleAddItem = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        addBlockNode('core-list-item', nodeID, 'li');
    }, [nodeID]);


    return (
        <NodeElementKey
            className={`block-${nodeID}`}
            onClick={handleSelect}

            data-block-type="list"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            {/* Render child blocks (list items) or placeholder */}
            {React.Children.count(children) > 0 ? children : (
                <Placeholder
                    message="This list is empty"
                    actions={[{
                        label: "Add List Item",
                        onClick: handleAddItem
                    }]}
                    isSelected={isSelected}
                    wrap={['li']}
                />
            )}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </NodeElementKey>
    );
};

export default memo(BlockListComponent);