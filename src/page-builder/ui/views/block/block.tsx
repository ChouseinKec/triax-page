"use client";

import React, { useMemo, memo, useEffect } from "react";

// Types
import type { BlockID } from "@/src/page-builder/core/block/block/types";

// Manager
import { useBlock, getBlockRender, getBlockIcon, setBlockTag, useIsBlockSelected, getBlockTags } from "@/src/page-builder/services/managers/block";
import { registerBarAction, unregisterBarAction, isBarActionRegistered } from "@/src/page-builder/services/managers/layout";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

// Components
import DropdownSelect from "@/src/shared/components/select/dropdown/component";
import { ElementTag } from "@/src/page-builder/core/block/element/types";

/**
 * BlocksCanvasBlock Component
 * Renders the block editor block with recursive children for better user experience.
 *
 * @param blockID - The block identifier
 * @returns The rendered block with recursive children for block editing
 */
const Block: React.FC<{ blockID: BlockID }> = ({ blockID }) => {
    const instance = useBlock(blockID);
    const render = getBlockRender(instance?.type || '');
    const isSelected = useIsBlockSelected(blockID);
    const tags = getBlockTags(instance?.type || '');

    // Render child blocks recursively
    const children = useMemo(() => {
        if (!instance) return [];

        const contentIDs = instance.contentIDs || [];
        if (contentIDs.length <= 0) return [];

        return contentIDs.map(childID => <Block key={childID} blockID={childID} />);
    }, [instance]
    );

    useEffect(() => {
        const barID = "main-selected-actions";
        const blockActionTag = `${blockID}-tag`;

        if (!instance || !isSelected) {
            if (isBarActionRegistered(barID, blockActionTag)) {
                unregisterBarAction(barID, blockActionTag);
            }
            return;
        }

        registerBarAction(barID, {
            id: blockActionTag,
            title: 'Tag Select',
            order: 0,
            render: () => (
                <DropdownSelect
                    key={instance.tag}
                    searchable={false}
                    groupable={false}
                    placeholder={getBlockIcon(instance.type)}
                    forcePlaceholder={true}
                    options={tags ? tags.map(tag => ({ name: tag, value: tag })) : []}
                    value={instance.tag}
                    onChange={(value) => setBlockTag(instance.id, value as ElementTag)}
                />
            )
        });

        // Cleanup: unregister on unmount
        return () => {
            if (isBarActionRegistered(barID, blockActionTag)) {
                unregisterBarAction(barID, blockActionTag);
            }
        };

    }, [blockID, instance, isSelected, tags]);


    // Early return if block doesn't exist
    if (!instance) return devRender.error(`[BlocksCanvasBlock] Block not found: ${blockID}`);

    // Handle unknown block types gracefully
    if (!render) return devRender.error(`[BlocksCanvasBlock] Unknown block type: ${instance.type}`);

    // Render the block using its definition's render function, passing instance data and children
    return render(instance, children);
};

export default memo(Block);