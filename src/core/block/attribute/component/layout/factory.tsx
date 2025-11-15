import React from 'react';

// Components
import Property from '@/src/shared/components/layout/property/component';
import BlockAttributesValue from '@/src/core/block/attribute/component/value/component';

// Types
import type { CSSProperties } from 'react';
import type { AttributeKey } from '@/src/core/block/attribute/types';
import type { BlockID } from '@/src/core/block/instance/types';

// Constants
import { ATTRIBUTE_DEFINITIONS } from '@/src/core/block/attribute/constants';

export type RenderAttributeRowOptions = {
  blockID: BlockID;
  attribute: AttributeKey;
  label?: string | null;
  styles?: CSSProperties;
  disabled?: boolean;
  hidden?: boolean;
};

/**
 * Renders a shared Property row for a given attribute key with name/description wired.
 */
export function renderAttributeRow(options: RenderAttributeRowOptions): React.ReactElement | null {
  if (options?.hidden) return null;
  const { blockID, attribute } = options;

  const def = ATTRIBUTE_DEFINITIONS[attribute];
  const name = def?.name || attribute;
  const description = def?.description || '';

  return (
    <Property
      label={options.label ?? null}
      name={name}
      description={description}
      styles={options?.styles}
      disabled={options?.disabled}
      content={() => (
        <BlockAttributesValue blockID={blockID} attribute={attribute} />
      )}
      actions={() => <></>}
    />
  );
}
