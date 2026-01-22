// Types
import type { AttributeKey } from '@/core/block/attribute/types';
import type { NodeID } from '@/core/block/node/instance/types';
import type { CSSProperties } from 'react';

export type RenderAttributeRowProps = {
    NodeID: NodeID;
    attributeKey: AttributeKey;
    label: string | null;
    disabled?: boolean;
    hidden?: boolean;
    styles?: CSSProperties;
};
