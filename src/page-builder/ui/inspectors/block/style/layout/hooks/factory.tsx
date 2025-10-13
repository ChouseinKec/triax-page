import React, { useEffect } from 'react';

// Managers
import { useBlockStyle, setBlockStyle } from '@/src/page-builder/services/managers/block/style';

// Constants
import { STYLE_DEFINITIONS } from '@/src/page-builder/core/block/style/constants';

// Components
import BlockStylesValue from '@/src/page-builder/ui/inspectors/block/style/value/component';

// Types
import { StyleKey } from '@/src/page-builder/core/block/style/types';

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
        <BlockStylesValue
            value={value}
            onChange={(newValue) => setBlockStyle(blockID, propertyName, newValue)}
            property={property}
        />
    );
});

StyleValueRenderer.displayName = 'StyleValueRenderer';

export { StyleValueRenderer };