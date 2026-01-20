import React from 'react';

// Managers
import { setBlockStyle, useBlockStyle, canBlockHaveStyle } from '@/src/core/block/style/managers/';


// Components
import BlockStyleValue from '@/src/config/layout/panel/tabs/style/value';
import Property from '@/src/shared/components/layout/property/component';
import PropertyActions from '@/src/config/layout/panel/tabs/style/action';

// Types
import type { StyleKey } from '@/src/core/block/style/types';
import type { RenderStyleRowOptions } from './types';

// Utilties
import { devRender } from '@/src/shared/utilities/dev';

// Registry
import { getRegisteredStyle } from '@/src/core/block/style/registries';

/**
 * Memoized component to render the appropriate value editor for a CSS property
 * Handles data fetching and component selection reactively
 */
const StyleValueRenderer = React.memo(({ blockID, propertyName }: { blockID: string; propertyName: StyleKey }): React.ReactElement | null => {
    const value = useBlockStyle(blockID, propertyName);
    const styleDefinition = getRegisteredStyle(propertyName);

    if (!styleDefinition) return devRender.error("[StyleValueRenderer] No property definition found", { propertyName });

    return (
        <BlockStyleValue
            value={value || ''}
            onChange={(newValue) => setBlockStyle(blockID, propertyName, newValue)}
            styleDefinition={styleDefinition}
        />
    );
});

StyleValueRenderer.displayName = 'StyleValueRenderer';

export { StyleValueRenderer };


/**
 * Renders a shared Property row for a given style key with name/description/actions wired.
 * Applies allowedStyles filtering via canBlockHaveStyle before rendering.
 */
export function renderStyleRow(options: RenderStyleRowOptions): React.ReactElement | null {
    if (options?.hidden) return null;
    const { blockID, propertyName } = options;


    if (!canBlockHaveStyle(blockID, propertyName)) return null;

    const styleDefinition = getRegisteredStyle(propertyName);
    if (!styleDefinition) return devRender.error("[renderStyleRow] No style definition found", { propertyName });

    return (
        <Property
            name={styleDefinition.key}
            description={styleDefinition.description}
            label={options.label ?? null}
            styles={options?.styles}
            disabled={options?.disabled}
            content={() => (<StyleValueRenderer blockID={blockID} propertyName={propertyName} />)}
            actions={() => <PropertyActions blockID={blockID} property={propertyName} />}
        />
    );
}