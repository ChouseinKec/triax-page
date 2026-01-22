// Types
import type { AttributeKey } from '@/core/block/attribute/definition/types';
import type { NodeID } from '@/core/block/node/instance/types/instance';
import type { CSSProperties } from 'react';

export type RenderAttributeRowProps = {
    NodeID: NodeID;
    attributeKey: AttributeKey;
    label: string | null;
    disabled?: boolean;
    hidden?: boolean;
    styles?: CSSProperties;
};
