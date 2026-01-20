"use client";
import React, { useMemo, memo, useEffect } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { BlockID } from "@/src/core/block/instance/types";
import type { DeviceKey, OrientationKey, PseudoKey } from "@/src/core/layout/page/types";

// Manager
import { useBlock, getBlockComponent, getBlockIcon, setBlockTag, useIsBlockSelected, getBlockAvailableTags } from "@/src/core/block/instance/managers";
import { registerBarAction, unregisterBarAction, isBarActionRegistered } from "@/src/core/layout/bar/managers";

// Utilities
import { devRender } from "@/src/shared/utilities/dev";

// Components
import DropdownSelect from "@/src/shared/components/select/dropdown/component";
import { ElementKey } from "@/src/core/block/element/types";


interface BlockProps {
    blockID: BlockID;
    deviceKey: DeviceKey;
    orientationKey: OrientationKey;
    pseudoKey: PseudoKey;
    isDeviceSelected: boolean;
}


/**
 * BlocksCanvasBlock Component
 * Renders the block editor block with recursive children for better user experience.
 *
 * @param blockID - The block identifier
 * @returns The rendered block with recursive children for block editing
 */
const Block: React.FC<BlockProps> = ({ blockID, deviceKey, orientationKey, pseudoKey, isDeviceSelected }) => {
    const instance = useBlock(blockID);
    const BlockComponent = getBlockComponent(instance?.type || '');
    const isBlockSelected = useIsBlockSelected(blockID);
    const availableTags = getBlockAvailableTags(instance?.type || '');

    // Render child blocks recursively
    const children = useMemo(() => {
        if (!instance) return [];

        const contentIDs = instance.contentIDs || [];
        if (contentIDs.length <= 0) return [];

        return contentIDs.map(childID => <Block key={childID} blockID={childID} deviceKey={deviceKey} orientationKey={orientationKey} pseudoKey={pseudoKey} isDeviceSelected={isDeviceSelected} />);
    }, [instance, deviceKey, orientationKey, pseudoKey]
    );

    // useEffect(() => {
    //     const barID = "main-block-actions";
    //     const blockActionTag = `${blockID}-tag`;
    //     const blockActionDivider = `${blockID}-divider`;

    //     if (!instance || !isBlockSelected) {
    //         if (isBarActionRegistered(barID, blockActionTag)) unregisterBarAction(barID, blockActionTag);
    //         if (isBarActionRegistered(barID, blockActionDivider)) unregisterBarAction(barID, blockActionDivider);
    //         return;
    //     }

    //     registerBarAction(barID, {
    //         id: blockActionTag,
    //         title: 'Tag Select',
    //         order: 0,
    //         render: () => (
    //             <DropdownSelect
    //                 key={instance.tag}
    //                 searchable={false}
    //                 groupable={false}
    //                 clearable={false}
    //                 placeholder={getBlockIcon(instance.type)}
    //                 forcePlaceholder={true}
    //                 options={availableTags ? availableTags.map(tag => ({ name: tag, value: tag })) : []}
    //                 value={instance.tag}
    //                 onChange={(value) => setBlockTag(instance.id, value as ElementKey)}
    //             />
    //         )
    //     });

    //     registerBarAction(barID, {
    //         id: blockActionDivider,
    //         title: 'Divider',
    //         order: 5,
    //         render: () => (
    //             <span className={CSS.Divider} data-disabled={true}>
    //                 |
    //             </span>

    //         )
    //     });

    //     // Cleanup: unregister on unmount
    //     return () => {
    //         if (isBarActionRegistered(barID, blockActionTag)) unregisterBarAction(barID, blockActionTag);
    //         if (isBarActionRegistered(barID, blockActionDivider)) unregisterBarAction(barID, blockActionDivider);
    //     };

    // }, [blockID, instance, isBlockSelected, availableTags]
    // );

    // Early return if block doesn't exist
    if (!instance) return devRender.error(`[BlocksCanvasBlock] Block not found: ${blockID}`);

    // Handle unknown block types gracefully
    if (!BlockComponent) return devRender.error(`[BlocksCanvasBlock] Unknown block type: ${instance.type}`);

    // Render the block using its definition's component function, passing instance data and children
    return <BlockComponent isSelected={isBlockSelected} deviceKey={deviceKey} orientationKey={orientationKey} pseudoKey={pseudoKey} instance={instance}>{children}</BlockComponent>;
};

export default memo(Block);