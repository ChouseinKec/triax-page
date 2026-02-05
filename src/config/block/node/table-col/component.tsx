import React, { memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { getBlockAttributesRendered } from '@/core/block/attribute/managers';

const BlockTableColComponent: React.FC<NodeComponentProps> = ({
    instance,
}) => {
    const nodeID = instance.id;
    const nodeAttributes = getBlockAttributesRendered(nodeID);

    return (
        <col
            id={nodeID}
            {...nodeAttributes}
        />
    );
};

export default memo(BlockTableColComponent);