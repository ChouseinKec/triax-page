// Types
import type { ViewportDefinition, ViewportID, ViewportRender, ViewportTitle } from '@/src/core/layout/viewport/types';

/**
 * Validates if a value is a valid viewport title.
 * Checks if the value is a non-empty string.
 * @param viewportTitle - The value to validate
 */
export function isViewportTitleValid(viewportTitle: unknown): viewportTitle is ViewportTitle {
    return typeof viewportTitle === 'string' && viewportTitle.length > 0;
}

/**
 * Validates if a value is a valid viewport render function.
 * Checks if the value is a function (React component).
 * @param viewportRender - The value to validate
 */
export function isViewportRenderValid(viewportRender: unknown): viewportRender is ViewportRender {
    return typeof viewportRender === 'function';
}

/**
 * Validates if a value is a valid viewport identifier.
 * Checks if the value is a non-empty string.
 * @param viewportID - The value to validate
 */
export function isViewportIDValid(viewportID: unknown): viewportID is ViewportID {
    return typeof viewportID === 'string' && viewportID.length > 0;
}

/**
 * Validates if a value is a valid viewport definition.
 * Checks if the value is an object with all required viewport properties.
 * @param viewportDefinition - The value to validate
 */
export function isViewportDefinitionValid(viewportDefinition: unknown): viewportDefinition is ViewportDefinition {
    return (
        typeof viewportDefinition === 'object' &&
        viewportDefinition !== null && //
        'id' in viewportDefinition &&
        'title' in viewportDefinition &&
        'render' in viewportDefinition &&
        'workbenchID' in viewportDefinition
    );
}
