import React from 'react';

// Managers
import { setBlockStyle, useBlockStyle, } from '@/core/block/style/instance/managers/';


// Components
import BlockStyleValue from '@/config/layout/panel/tabs/style/value';
import Property from '@/shared/components/layout/property/component';
import PropertyActions from '@/config/layout/panel/tabs/style/action';

// Types
import type { StyleKey } from '@/core/block/style/definition/types';
import type { RenderStyleRowOptions } from './types';

// Utilties
import { devRender } from '@/shared/utilities/dev';

// Registry
import { getRegisteredStyle } from '@/core/block/style/definition/state/registry';

/**
 * Memoized component to render the appropriate value editor for a CSS property
 * Handles data fetching and component selection reactively
 */
const StyleValueRenderer = React.memo(({ NodeID, propertyName }: { NodeID: string; propertyName: StyleKey }): React.ReactElement | null => {
    const value = useBlockStyle(NodeID, propertyName);
    const styleDefinition = getRegisteredStyle(propertyName);

    if (!styleDefinition) return devRender.error("[StyleValueRenderer] No property definition found", { propertyName });

    return (
        <BlockStyleValue
            value={value || ''}
            onChange={(newValue) => setBlockStyle(NodeID, propertyName, newValue)}
            styleDefinition={styleDefinition}
        />
    );
});

StyleValueRenderer.displayName = 'StyleValueRenderer';

export { StyleValueRenderer };


/**
 * Renders a shared Property row for a given style key with name/description/actions wired.
 */
export function renderStyleRow(options: RenderStyleRowOptions): React.ReactElement | null {
    if (options?.hidden) return null;
    const { NodeID, propertyName } = options;

    const styleDefinition = getRegisteredStyle(propertyName);
    if (!styleDefinition) return devRender.error("[renderStyleRow] No style definition found", { propertyName });

    return (
        <Property
            name={styleDefinition.key}
            description={styleDefinition.description}
            label={options.label ?? null}
            styles={options?.styles}
            disabled={options?.disabled}
            content={() => (<StyleValueRenderer NodeID={NodeID} propertyName={propertyName} />)}
            actions={() => <PropertyActions NodeID={NodeID} property={propertyName} />}
        />
    );
}