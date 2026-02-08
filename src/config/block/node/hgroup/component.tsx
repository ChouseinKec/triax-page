import React, { useCallback, memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Managers
import { setBlockNodeSelectedNodeID } from '@/core/block/node/managers/commands';
import { setPanelOpenState } from '@/core/layout/panel/managers/commands/panel';
import { useBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

/**
 * Renders a heading group block that can contain headings and paragraphs.
 *
 * @param nodeID - The unique identifier of the block instance
 * @param children - Child blocks to render inside this heading group
 * @returns JSX element representing the heading group block
 */
const BlockHgroupComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, isSelected, nodeID, children }) => {
    const nodeAttributes = useBlockAttributesRendered(nodeID);
    const nodeStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    // Get node data to check placeholder setting

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
        // First select this hgroup
        setBlockNodeSelectedNodeID(nodeID);
        // Then open the library panel
        setPanelOpenState('library', true);
    }, [nodeID]);



    // Check if hgroup is empty (no children)
    const showPlaceholder = React.Children.count(children) !== 0;

    return showPlaceholder ? (
        <hgroup
            className={`block-${nodeID}`}
            onClick={handleSelectBlock}
            data-block-type="hgroup"
            data-is-selected={isSelected}
            {...nodeAttributes}
        >
            {/* Render child blocks */}
            {children}

            {/* Inject block-specific styles */}
            <style>
                {nodeStyles}
            </style>
        </hgroup>
    ) : (
        <Placeholder
            title="Empty Heading Group"
            description="Add headings and paragraphs to this group"
            actions={[
                {
                    label: "Add Content",
                    onClick: handleAddBlock
                },
            ]}
            isSelected={isSelected}
            onSelect={handleSelectBlock}
        />
    );
};

export default memo(BlockHgroupComponent);