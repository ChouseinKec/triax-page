import React, { memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { getBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

const BlockTableColgroupComponent: React.FC<NodeComponentProps> = ({
    deviceKey,
    orientationKey,
    pseudoKey,
    instance,
    children,
}) => {
    const nodeID = instance.id;
    const nodeAttributes = getBlockAttributesRendered(nodeID);
    const nodeStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    return (
        <>
            <colgroup
                id={nodeID}
                {...nodeAttributes}
            >
                {children}

            </colgroup>
            <style>
                {nodeStyles}
            </style>
        </>
    );
};


export default memo(BlockTableColgroupComponent);