// Types
import type { StyleKey } from '@/core/block/style/types';
import type { NodeID } from '@/core/block/node/instance/types';
import type { CSSProperties } from 'react';

export type RenderStyleRowOptions = {
    NodeID: NodeID;
    propertyName: StyleKey;
    label?: string | null;
    styles?: CSSProperties;
    disabled?: boolean;
    hidden?: boolean;
};
