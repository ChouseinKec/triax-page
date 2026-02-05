import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';
import { setPanelOpenState } from '@/core/layout/panel/managers/commands/panel';
import { getBlockNodeData, setBlockNodeData } from '@/core/block/node/managers';
import { getBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';


/**
 * Renders a container block that can hold other blocks.
 * 
 * @param instance - The block instance data
 * @param children - Child blocks to render inside this container
 * @returns JSX element representing the container block
 */
const BlockContainerComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, instance, children }) => {
    const nodeID = instance.id;
    const nodeAttributes = getBlockAttributesRendered(nodeID);
    const nodeStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    // Get node data to check placeholder setting
    const data = getBlockNodeData(nodeID);
    const hidePlaceholder = data?.placeholder === false;

    /**
     * Handles block selection when clicked.
     * Stops event propagation to prevent parent blocks from being selected.
     */
    const handleSelectBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setBlockNodeSelectedNodeID(nodeID);
    }, [nodeID]
    );

    /**
     * Opens the library panel to let users choose what block to add
     */
    const handleAddBlock = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        // First select this container
        setBlockNodeSelectedNodeID(nodeID);
        // Then open the library panel
        setPanelOpenState('library', true);
    }, [nodeID]
    );

    /**
     * Hides the placeholder for this container
     */
    const handleHidePlaceholder = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setBlockNodeData(nodeID, { ...data, placeholder: false });
    }, [nodeID, data]
    );

    // Check if container is empty (no children)
    const isEmpty = React.Children.count(children) === 0;
    const shouldShowPlaceholder = isEmpty && !hidePlaceholder;

    return (
        <div
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}

            data-block-type="container"
            data-is-selected={isSelected}

            {...nodeAttributes}
        >
            {/* Render child blocks */}
            {children}

            {/* Show placeholder when empty and not hidden */}
            {shouldShowPlaceholder && (
                <Placeholder
                    message="Empty Container"
                    description="Add blocks to this container"
                    actions={[
                        {
                            label: "Add Block",
                            onClick: handleAddBlock
                        },
                        {
                            label: "Hide",
                            onClick: handleHidePlaceholder
                        }
                    ]}
                    isSelected={isSelected}
                />
            )}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </div>
    );
}


export default memo(BlockContainerComponent);