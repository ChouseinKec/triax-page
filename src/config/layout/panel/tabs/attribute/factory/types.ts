// Types
import type { AttributeKey } from '@/core/block/attribute/types';
import type { NodeID } from '@/core/block/node/types/instance';
import type { CSSProperties } from 'react';

export type RenderAttributeRowProps = {
    nodeID: NodeID;
    attributeKey: AttributeKey;
    label: string | null;
    disabled?: boolean;
    hidden?: boolean;
    styles?: CSSProperties;
};
