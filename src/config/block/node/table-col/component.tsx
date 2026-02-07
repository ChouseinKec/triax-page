import React, { memo } from 'react';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Manager
import { useBlockAttributesRendered } from '@/core/block/attribute/managers';

const BlockTableColComponent: React.FC<NodeComponentProps> = ({
    nodeID,
}) => {
    const nodeAttributes = useBlockAttributesRendered(nodeID);

    return (
        <col
            id={nodeID}
            {...nodeAttributes}
        />
    );
};

export default memo(BlockTableColComponent);