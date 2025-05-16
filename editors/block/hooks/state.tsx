import { useCallback } from 'react';

// Utilities
import { devLog } from '@/utilities/dev';

// Stores
import useBlockStore from '@/stores/block/store';
import useDeviceStore from '@/stores/device/store';
import useOrientationStore from '@/stores/orientation/store';

interface BLOCK_STATE {
    generateBlockStyles: (id?: string) => string | null;
}


export const useBlockEditor = (): BLOCK_STATE => {

    /**
     * Generates CSS for a block by processing its style configuration.
     * Handles responsive breakpoints (devices), orientations, and pseudo-states.
     *
     * @param {string} [blockId] - Optional block ID to generate styles for.
     *                             If not provided, uses the currently selected block.
     * @returns {string | null} - Generated CSS, or null if:
     *                            - No block ID is available
     *                            - Block doesn't exist
     *                            - Block has no styles
     *
     * @example
     * // Basic usage (current block)
     * const styles = generateBlockStyles();
     *
     * // Specific block
     * const styles = generateBlockStyles('block-123');
     *
     * // Example output:
     *   .block-1 {
     *     display: grid;
     *     width: 8px;
     *   }
     *   @media (max-width: 767px) and (orientation: portrait) {
     *     .block-1 {
     *       width: 100%;
     *     }
     *   }
     *   .block-1:hover {
     *     background: blue;
     *   }
     */
    const generateBlockStyles = useCallback<BLOCK_STATE['generateBlockStyles']>((id?: string): string | null => {
        // Get the target block
        const _id = id || useBlockStore.getState().getSelected();
        if (!_id) return null;

        const block = useBlockStore.getState().getBlock(_id);
        if (!block) return null;

        const { styles } = block;
        if (!styles) return null;

        // Get devices and orientations
        const devices = useDeviceStore.getState().getDevices();
        const orientations = useOrientationStore.getState().getOrientations();

        let css = '';

        // Process each device (breakpoint)
        for (const [deviceName, deviceStyles] of Object.entries(styles)) {
            if (!deviceStyles) continue;

            // Process each orientation
            for (const [orientationName, orientationStyles] of Object.entries(deviceStyles)) {
                if (!orientationStyles) continue;

                // Get media queries for device + orientation
                const device = devices.find((d) => d.value === deviceName);
                const orientation = orientations.find((o) => o.value === orientationName);
                if (!device || !orientation) continue;

                // Build media query
                let mediaQuery = '';
                if (deviceName !== 'default') {
                    mediaQuery = `@media ${device.media}`;
                    mediaQuery += orientationName !== 'default' ? ` and (orientation: ${orientationName})` : ')';
                } else if (orientationName !== 'default') {
                    mediaQuery = `@media (orientation: ${orientationName})`;
                }

                if (mediaQuery) css += `${mediaQuery} {\n`;

                // Process each pseudo state
                for (const [pseudoName, pseudoStyles] of Object.entries(orientationStyles)) {
                    if (!pseudoStyles || Object.keys(pseudoStyles).length === 0) continue;

                    const selector = pseudoName === 'default' ? '' : `:${pseudoName}`;

                    // Generate class name based on block ID only
                    css += `  .block-${_id}${selector} {\n`;

                    // Add each style property
                    for (const [property, value] of Object.entries(pseudoStyles)) {
                        if (!value) continue;
                        const cssProperty = property.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
                        css += `    ${cssProperty}: ${value};\n`;
                    }

                    css += '  }\n';
                }

                if (mediaQuery) css += '}\n';
            }
        }

        return css;
    }, []);


    return {
        generateBlockStyles,
    }

}