"use client";
import React, { useMemo, memo, useEffect } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { NodeID } from "@/core/block/node/types/instance";
import type { DeviceKey, OrientationKey, PseudoKey } from "@/core/layout/page/types";

// Manager
import { useNode, setNodeElementKey, useIsNodeSelected } from "@/core/block/node/managers";
import { getNodeComponent, getNodeIcon, getNodeSupportedElementKeys } from "@/core/block/node/managers";

// Utilities
import { devRender } from "@/shared/utilities/dev";

// Components
import DropdownSelect from "@/shared/components/select/dropdown/component";
import { ElementKey } from "@/core/block/element/types";


interface BlockProps {
    NodeID: NodeID;
    deviceKey: DeviceKey;
    orientationKey: OrientationKey;
    pseudoKey: PseudoKey;
    isDeviceSelected: boolean;
}


/**
 * BlocksCanvasBlock Component
 * Renders the block editor block with recursive children for better user experience.
 *
 * @param NodeID - The block identifier
 * @returns The rendered block with recursive children for block editing
 */
const Block: React.FC<BlockProps> = ({ NodeID, deviceKey, orientationKey, pseudoKey, isDeviceSelected }) => {
    const instance = useNode(NodeID);
    const NodeComponent = getNodeComponent(instance?.definitionKey || '');
    const isBlockSelected = useIsNodeSelected(NodeID);
    const supportedElementKeys = getNodeSupportedElementKeys(instance?.definitionKey || '');

    // Render child blocks recursively
    const children = useMemo(() => {
        if (!instance) return [];

        const childNodeIDs = instance.childNodeIDs || [];
        if (childNodeIDs.length <= 0) return [];

        return childNodeIDs.map(childID => <Block key={childID} NodeID={childID} deviceKey={deviceKey} orientationKey={orientationKey} pseudoKey={pseudoKey} isDeviceSelected={isDeviceSelected} />);
    }, [instance, deviceKey, orientationKey, pseudoKey]
    );

    // useEffect(() => {
    //     const barID = "main-block-actions";
    //     const blockActionTag = `${NodeID}-tag`;
    //     const blockActionDivider = `${NodeID}-divider`;

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
    //                 placeholder={getNodeIcon(instance.definitionKey)}
    //                 forcePlaceholder={true}
    //                 options={supportedElementKeys ? supportedElementKeys.map(tag => ({ name: tag, value: tag })) : []}
    //                 value={instance.tag}
    //                 onChange={(value) => setNodeElementKey(instance.id, value as ElementKey)}
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

    // }, [NodeID, instance, isBlockSelected, supportedElementKeys]
    // );

    // Early return if block doesn't exist
    if (!instance) return devRender.error(`[BlocksCanvasBlock] Block not found: ${NodeID}`);

    // Handle unknown block types gracefully
    if (!NodeComponent) return devRender.error(`[BlocksCanvasBlock] Unknown block type: ${instance.definitionKey}`);

    // Render the block using its definition's component function, passing instance data and children
    return <NodeComponent isSelected={isBlockSelected} deviceKey={deviceKey} orientationKey={orientationKey} pseudoKey={pseudoKey} instance={instance}>{children}</NodeComponent>;
};

export default memo(Block);