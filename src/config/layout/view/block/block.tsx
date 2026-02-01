"use client";
import React, { useMemo, memo } from "react";

// Types
import type { NodeID } from "@/core/block/node/types/instance";
import type { DeviceKey, OrientationKey, PseudoKey } from "@/core/layout/page/types";

// Manager
import { useNodeInstance, useNodeIsSelected } from "@/core/block/node/managers";
import { getNodeInstanceComponent, } from "@/core/block/node/managers";

// Utilities
import { devRender } from "@/shared/utilities/dev";



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
    const instance = useNodeInstance(NodeID);
    const NodeComponent = getNodeInstanceComponent(NodeID);
    const isBlockSelected = useNodeIsSelected(NodeID);

    // Render child blocks recursively
    const children = useMemo(() => {
        if (!instance) return [];

        const childNodeIDs = instance.childNodeIDs || [];
        if (childNodeIDs.length <= 0) return [];

        return childNodeIDs.map(childID => <Block key={childID} NodeID={childID} deviceKey={deviceKey} orientationKey={orientationKey} pseudoKey={pseudoKey} isDeviceSelected={isDeviceSelected} />);
    }, [instance, deviceKey, orientationKey, pseudoKey]
    );

    // Early return if block doesn't exist
    if (!instance) return devRender.error(`[BlocksCanvasBlock] Block not found: ${NodeID}`);

    // Handle unknown block types gracefully
    if (!NodeComponent) return devRender.error(`[BlocksCanvasBlock] Unknown block type: ${instance.definitionKey}`);

    // Render the block using its definition's component function, passing instance data and children
    return <NodeComponent isSelected={isBlockSelected} deviceKey={deviceKey} orientationKey={orientationKey} pseudoKey={pseudoKey} instance={instance}>{children}</NodeComponent>;
};

export default memo(Block);