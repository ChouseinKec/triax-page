// Components
import Value from '@/editors/style/components/value/component';

// Types
import { STYLE_LAYOUT } from '@/editors/style/components/layout/types';
import { useState } from 'react';

// Definitions
import { CSSPropertyDefs } from '@/constants/style/property';


/**
 * Custom hook for managing the "Size & Overflow" section layout in the style editor.
 *
 * @returns {STYLE_LAYOUT} Configuration for size and overflow properties in the style editor.
*/
export const useSizeLayout = (): STYLE_LAYOUT => {
    const [width, setWidth] = useState<string>('');

    return {
        label: 'Size & Overflow',
        groups: [
            {
                columns: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)',
                properties: [
                    // Width
                    {
                        label: 'Width',
                        column: 'auto',
                        direction: 'column',
                        component: () => {
                            const property = CSSPropertyDefs.width;
                            if (!property) {
                                // Fallback: render nothing, an error, or a default Value
                                return <div>Property not found</div>;
                                // Or: return <Value value={width} property={defaultPropertyObject} onChange={setWidth} />;
                            }
                            return <Value value={width} property={property} onChange={setWidth} />;
                        },
                    },
                ],
            },
        ],
    };
};