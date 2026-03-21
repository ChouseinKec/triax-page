// Types
import type { StyleKey } from '@/core/block/style/types';
import type { NodeID } from '@/core/block/node/types/instance';
import type { CSSProperties } from 'react';

export type RenderStyleRowOptions = {
    nodeID: NodeID;
    propertyName: StyleKey;
    label?: string | null;
    styles?: CSSProperties;
    disabled?: boolean;
    hidden?: boolean;
};
