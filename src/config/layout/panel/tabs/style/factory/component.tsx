import React, { useMemo } from 'react';

// Managers
import { setBlockStyle, useBlockStyle } from '@/core/block/style/managers';
import { getNonTerminalDefinitions } from '@/core/block/style/managers';

// Components
import StyleValue from '@/config/layout/panel/tabs/style/value/component';
import Property from '@/shared/components/layout/property/component';
import PropertyActions from '@/config/layout/panel/tabs/style/action/component';

// Types
import type { StyleKey } from '@/core/block/style/types';
import type { RenderStyleRowOptions } from './types';

// Utilties
import { devRender } from '@/shared/utilities/dev';
import { deriveConstraint } from '@/core/block/style/utilities';

// Registry
import { getRegisteredStyle } from '@/core/block/style/state/registry';

/**
 * Memoized component to render the appropriate value editor for a CSS property
 * Handles data fetching and component selection reactively
 */
const ValueRenderer = React.memo(({ nodeID, propertyName }: { nodeID: string; propertyName: StyleKey }): React.ReactElement | null => {
    const value = useBlockStyle(nodeID, propertyName);
    const styleDefinition = getRegisteredStyle(propertyName);
    const nonTerminalDefinitions = useMemo(() => getNonTerminalDefinitions(), []);
    const constraint = useMemo(
        () => styleDefinition ? deriveConstraint(styleDefinition.syntax, nonTerminalDefinitions) : null,
        [styleDefinition, nonTerminalDefinitions]
    );

    if (!styleDefinition || !constraint) return devRender.error("[ValueRenderer] No property definition found", { propertyName });

    return (
        <StyleValue
            value={value || ''}
            styleKey={styleDefinition.key}
            constraint={constraint}
            onChange={(newValue) => setBlockStyle(nodeID, propertyName, newValue)}
        />
    );
});

ValueRenderer.displayName = 'ValueRenderer';

export { ValueRenderer };


/**
 * Renders a shared Property row for a given style key with name/description/actions wired.
 */
export function renderStyleRow(options: RenderStyleRowOptions): React.ReactElement | null {
    if (options?.hidden) return null;
    const { nodeID, propertyName } = options;

    const styleDefinition = getRegisteredStyle(propertyName);
    if (!styleDefinition) return devRender.error("[renderStyleRow] No style definition found", { propertyName });

    return (
        <Property
            name={styleDefinition.key}
            description={styleDefinition.description}
            label={options.label ?? null}
            styles={options?.styles}
            disabled={options?.disabled}
            content={() => (<ValueRenderer nodeID={nodeID} propertyName={propertyName} />)}
            actions={() => <PropertyActions nodeID={nodeID} property={propertyName} />}
        />
    );
}