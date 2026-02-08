import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Managers
import { setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';
import { setPanelOpenState } from '@/core/layout/panel/managers/commands/panel';
import { getBlockNodeElementKey } from '@/core/block/node/managers';
import { useBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a summary block for details disclosure widgets.
 *
 * @param nodeID - The unique identifier of the block instance
 * @returns JSX element representing the summary block
 */
const BlockSummaryComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, nodeID, children }) => {
    const nodeElementKey = getBlockNodeElementKey(nodeID);
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
        // First select this header
        setBlockNodeSelectedNodeID(nodeID);
        // Then open the library panel
        setPanelOpenState('library', true);
    }, [nodeID]);

    const Tag = nodeElementKey as React.ElementType;
    const showPlaceholder = React.Children.count(children) <= 0;

    return showPlaceholder ? (
        <Placeholder
            title="Empty Summary"
            description="Add content to this summary"
            actions={[
                {
                    label: "Add Content",
                    onClick: handleAddBlock
                }
            ]}
            isSelected={isSelected}
            onSelect={handleSelectBlock}
        />
    ) : (
        <Tag
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}
            data-block-type="summary"
            data-is-selected={isSelected}
            {...nodeAttributes}
        >
            {/* Render child blocks */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </Tag>
    );
};

export default memo(BlockSummaryComponent);