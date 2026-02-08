// Types
import type { NodeID } from '@/core/block/node/types/instance';
import type { NodeStyles } from '@/core/block/node/types/definition';
import type { OperateResult } from '@/shared/types/result';
import type { RegisteredStyles } from '@/core/block/style/types';
import type { DeviceKey, PseudoKey, OrientationKey, PseudoDefinition, DeviceDefinition } from '@/core/layout/page/types';

// Helpers
import { cascadeNodeStyles, generateCSSSelector, generateCSSRule, generateCascadePaths } from '@/core/block/style/helpers/';

// Managers
import { getDeviceDefinitions } from '@/core/layout/page/managers/queries';

/**
 * Renders CSS rules for all pseudo-classes for a block.
 * Generates a complete set of CSS rules for each registered pseudo-class (e.g., :hover, :active).
 *
 * @param styles - The block's complete style definition object
 * @param NodeID - The block's unique identifier for selector generation
 * @param styleDefinitions - Registry of all available style definitions
 * @param pseudoDefinitions - Array of all registered pseudo-class definitions
 * @param deviceKey - Current device context
 * @param orientationKey - Current orientation context
 * @param pseudoKey - Pseudo key (should be 'all' for this function)
 * @param defaultDeviceKey - Default device key
 * @param defaultOrientationKey - Default orientation key
 * @param defaultPseudoKey - Default pseudo key
 * @returns Operation result with the combined CSS string for all pseudos
 */
function renderNodeStylesAllPseudos(
    styles: NodeStyles,
    nodeID: NodeID,
    styleDefinitions: RegisteredStyles,
    pseudoDefinitions: PseudoDefinition[],

    deviceKey: DeviceKey,
    orientationKey: OrientationKey,
    pseudoKey: PseudoKey,

    defaultDeviceKey: DeviceKey,
    defaultOrientationKey: OrientationKey,
    defaultPseudoKey: PseudoKey,
): OperateResult<string> {
    let css = '';

    // Loop through each registered pseudo-class definition
    for (const pseudo of pseudoDefinitions) {
        // Render styles for the current pseudo and append to the CSS string
        const result = renderNodeStylesSinglePseudo(
            styles,
            nodeID,
            styleDefinitions,
            deviceKey,
            orientationKey,
            pseudo.key, // Use the specific pseudo key
            defaultDeviceKey,
            defaultOrientationKey,
            defaultPseudoKey,
            true, // Include pseudo-selector in CSS selector
        );
        if (!result.success) return result;
        css += result.data;
    }

    // Return the combined CSS string for all pseudo-classes
    return { success: true, data: css };
}

/**
 * Renders CSS rule for a single pseudo-class for a block.
 * Generates a CSS rule for either a specific pseudo-class or base styles.
 *
 * @param styles - The block's complete style definition object
 * @param NodeID - The block's unique identifier for selector generation
 * @param styleDefinitions - Registry of all available style definitions
 * @param deviceKey - Current device context
 * @param orientationKey - Current orientation context
 * @param pseudoKey - The pseudo-class key to render ('hover', 'active', etc.)
 * @param defaultDeviceKey - Default device key
 * @param defaultOrientationKey - Default orientation key
 * @param defaultPseudoKey - Default pseudo key
 * @param includePseudoInSelector - Whether to include the pseudo-selector in the CSS selector
 */
function renderNodeStylesSinglePseudo(
    styles: NodeStyles,
    nodeID: NodeID,
    styleDefinitions: RegisteredStyles,

    deviceKey: DeviceKey,
    orientationKey: OrientationKey,
    pseudoKey: PseudoKey,

    defaultDeviceKey: DeviceKey,
    defaultOrientationKey: OrientationKey,
    defaultPseudoKey: PseudoKey,

    includePseudoInSelector: boolean = true,
): OperateResult<string> {
    // Pre-compute cascade paths with device category fallback
    const pseudoPathsRes = generateCascadePaths(deviceKey, orientationKey, pseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey, getDeviceDefinitions());
    if (!pseudoPathsRes.success) return { success: false, error: pseudoPathsRes.error };

    const basePathsRes = generateCascadePaths(deviceKey, orientationKey, defaultPseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey, getDeviceDefinitions());
    if (!basePathsRes.success) return { success: false, error: basePathsRes.error };

    const cascadePaths = pseudoKey === defaultPseudoKey ? basePathsRes.data : [...pseudoPathsRes.data, ...basePathsRes.data];

    // Cascade styles for the specified pseudo, resolving all properties
    const cssStylesRes = cascadeNodeStyles(styles, styleDefinitions, cascadePaths);
    if (!cssStylesRes.success) return { success: false, error: cssStylesRes.error };

    // Determine the pseudo key for the selector (use default if not including pseudo)
    const selectorPseudoKey = includePseudoInSelector ? pseudoKey : defaultPseudoKey;

    // Generate the CSS selector string
    const cssSelectorRes = generateCSSSelector(nodeID, selectorPseudoKey, deviceKey, defaultPseudoKey);
    if (!cssSelectorRes.success) return { success: false, error: cssSelectorRes.error };

    // Generate the complete CSS rule
    const cssRuleRes = generateCSSRule(cssSelectorRes.data, cssStylesRes.data);
    if (!cssRuleRes.success) return { success: false, error: cssRuleRes.error };

    // Return the generated CSS rule
    return { success: true, data: cssRuleRes.data };
}

/**
 * Renders block styles into a CSS string with proper cascading and selectors.
 * When pseudo is 'all', generates CSS rules for all pseudo-classes.
 * When pseudo is specific, generates preview styles applied to base selector.
 *
 * @param styles - The block's complete style definition object
 * @param NodeID - The block's unique identifier for selector generation
 * @param styleDefinitions - Registry of all available style definitions
 * @param pseudoDefinitions - Array of all registered pseudo-class definitions
 * @param deviceKey - Current device context
 * @param orientationKey - Current orientation context
 * @param pseudoKey - Pseudo key ('all' or specific like 'hover')
 * @param defaultDeviceKey - Default device key
 * @param defaultOrientationKey - Default orientation key
 * @param defaultPseudoKey - Default pseudo key
 */
export function renderNodeStyles(
    styles: NodeStyles,
    nodeID: NodeID,
    styleDefinitions: RegisteredStyles,
    pseudoDefinitions: PseudoDefinition[],

    deviceKey: DeviceKey,
    orientationKey: OrientationKey,
    pseudoKey: PseudoKey,

    defaultDeviceKey: DeviceKey,
    defaultOrientationKey: OrientationKey,
    defaultPseudoKey: PseudoKey,
): OperateResult<string> {
    // If pseudo is 'all', render styles for all registered pseudo-classes
    if (pseudoKey === defaultPseudoKey) return renderNodeStylesAllPseudos(styles, nodeID, styleDefinitions, pseudoDefinitions, deviceKey, orientationKey, pseudoKey, defaultDeviceKey, defaultOrientationKey, defaultPseudoKey);

    // Otherwise, render styles for the selected pseudo only (for preview)
    return renderNodeStylesSinglePseudo(
        styles,
        nodeID,
        styleDefinitions,
        deviceKey,
        orientationKey,
        pseudoKey,
        defaultDeviceKey,
        defaultOrientationKey,
        defaultPseudoKey,
        false, // Do not include pseudo in selector for previews
    );
}
