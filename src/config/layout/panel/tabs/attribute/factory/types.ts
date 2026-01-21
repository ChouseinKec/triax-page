// Types
import type { AttributeKey } from '@/core/block/attribute/types';
import type { BlockID } from '@/core/block/instance/types';
import type { CSSProperties } from 'react';

export type RenderAttributeRowProps = {
    blockID: BlockID;
    attributeKey: AttributeKey;
    label: string | null;
    disabled?: boolean;
    hidden?: boolean;
    styles?: CSSProperties;
};
