import React from 'react';

// Managers
import { useStyle, setStyle } from '@/editors/block/managers/style';

// Constants
import { StyleDefinitions } from '@/constants/style/style';

// Components
import StylesEditorValue from '@/editors/block/components/style/value/component';

// Types
import { StyleKeys } from '@/editors/block/types/core/style/style';

// Utilties
import { devRender } from '@/utilities/dev';

/**
 * Memoized component to render the appropriate value editor for a CSS property
 * Handles data fetching and component selection reactively
 */
const StyleValueRenderer = React.memo(({ blockID, propertyName }: { blockID: string; propertyName: StyleKeys }): React.ReactElement | null => {
    const value = useStyle(blockID, propertyName);
    const property = StyleDefinitions[propertyName];

    if (!property) return devRender.error("[StyleValueRenderer] No property definition found", { propertyName });

    return (
        <StylesEditorValue
            value={value}
            onChange={(newValue) => setStyle(blockID, propertyName, newValue)}
            property={property}
        />
    );
});

StyleValueRenderer.displayName = 'StyleValueRenderer';

export { StyleValueRenderer };