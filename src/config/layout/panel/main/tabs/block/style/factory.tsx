import React from 'react';

// Managers
import { useBlockStyle, setBlockStyle } from '@/src/core/block/instance/manager/';
import { canBlockHaveStyle } from '@/src/core/block/instance/manager/queries';

// Constants
import { STYLE_DEFINITIONS } from '@/src/core/block/style/core/constants';

// Components
import BlockStyleValue from '@/src/core/block/style/component';
import Property from '@/src/shared/components/layout/property/component';
import PropertyActions from '@/src/config/layout/panel/main/tabs/block/style/actions';

// Types
import type { StyleKey } from '@/src/core/block/style/core/types';
import type { BlockID } from '@/src/core/block/instance/types';
import type { CSSProperties } from 'react';

// Utilties
import { devRender } from '@/src/shared/utilities/dev';

/**
 * Memoized component to render the appropriate value editor for a CSS property
 * Handles data fetching and component selection reactively
 */
const StyleValueRenderer = React.memo(({ blockID, propertyName }: { blockID: string; propertyName: StyleKey }): React.ReactElement | null => {
    const value = useBlockStyle(blockID, propertyName);
    const property = STYLE_DEFINITIONS[propertyName];

    if (!property) return devRender.error("[StyleValueRenderer] No property definition found", { propertyName });

    return (
        <BlockStyleValue
            value={value || ''}
            onChange={(newValue) => setBlockStyle(blockID, propertyName, newValue)}
            property={property}
        />
    );
});

StyleValueRenderer.displayName = 'StyleValueRenderer';

export { StyleValueRenderer };

// --------------------------------------
// Shared renderer for a single style property row
// --------------------------------------

export type RenderStyleRowOptions = {
    blockID: BlockID;
    propertyName: StyleKey;
    label?: string | null;
    styles?: CSSProperties;
    disabled?: boolean;
    hidden?: boolean;
};

/**
 * Renders a shared Property row for a given style key with name/description/actions wired.
 * Applies allowedStyles filtering via canBlockHaveStyle before rendering.
 */
export function renderStyleRow(options: RenderStyleRowOptions): React.ReactElement | null {
    if (options?.hidden) return null;
    const { blockID, propertyName } = options;
    if (!canBlockHaveStyle(blockID, propertyName)) return null;

    const propertyDef = STYLE_DEFINITIONS[propertyName];

    return (
        <Property
            label={options.label ?? null}
            name={propertyDef?.name || propertyName}
            description={propertyDef?.description || ''}
            styles={options?.styles}
            disabled={options?.disabled}
            content={() => (
                <StyleValueRenderer blockID={blockID} propertyName={propertyName} />
            )}
            actions={() => <PropertyActions blockID={blockID} property={propertyName} />}
        />
    );
}