import React, { memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { useBlockAttributesRendered } from '@/core/block/attribute/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

const BlockTableColgroupComponent: React.FC<NodeComponentProps> = ({
    nodeID,
    deviceKey,
    orientationKey,
    pseudoKey,
    children,
}) => {
    const nodeAttributes = useBlockAttributesRendered(nodeID);
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