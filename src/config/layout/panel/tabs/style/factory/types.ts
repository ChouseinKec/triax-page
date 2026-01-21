// Types
import type { StyleKey } from '@/core/block/style/types';
import type { BlockID } from '@/core/block/instance/types';
import type { CSSProperties } from 'react';

export type RenderStyleRowOptions = {
    blockID: BlockID;
    propertyName: StyleKey;
    label?: string | null;
    styles?: CSSProperties;
    disabled?: boolean;
    hidden?: boolean;
};
