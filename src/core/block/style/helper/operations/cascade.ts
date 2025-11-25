// Types
import type { BlockStyles } from '@/src/core/block/instance/types';
import type { StyleKey } from '@/src/core/block/style/types';
import type { OperationResult } from '@/src/shared/types/result';

// Constants
import { DEFAULT_DEVICE_ID, DEFAULT_ORIENTATION_ID, DEFAULT_PSEUDO_ID } from '@/src/core/layout/page/constants';

/**
 * Resolve a single style value using the cascade order.
 */
export function cascadeStyle(styles: BlockStyles, styleKey: StyleKey, device: string, orientation: string, pseudo: string): OperationResult<string> {
    try {
        const value = (
            styles[device]?.[orientation]?.[pseudo]?.[styleKey] ??
            styles[device]?.[orientation]?.[DEFAULT_PSEUDO_ID]?.[styleKey] ??
            styles[device]?.[DEFAULT_ORIENTATION_ID]?.[pseudo]?.[styleKey] ??
            styles[device]?.[DEFAULT_ORIENTATION_ID]?.[DEFAULT_PSEUDO_ID]?.[styleKey] ??
            styles[DEFAULT_DEVICE_ID]?.[orientation]?.[pseudo]?.[styleKey] ??
            styles[DEFAULT_DEVICE_ID]?.[orientation]?.[DEFAULT_PSEUDO_ID]?.[styleKey] ??
            styles[DEFAULT_DEVICE_ID]?.[DEFAULT_ORIENTATION_ID]?.[pseudo]?.[styleKey] ??
            styles[DEFAULT_DEVICE_ID]?.[DEFAULT_ORIENTATION_ID]?.[DEFAULT_PSEUDO_ID]?.[styleKey] ??
            ''
        );
        return { success: true, data: value };
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}

/**
 * Collect all keys and produce a cascaded map for the provided context.
 */
export function cascadeCSSStyles(styles: BlockStyles, device: string, orientation: string, pseudo: string): OperationResult<Record<string, string>> {
    try {
        const allKeys = new Set<string>();
        Object.values(styles).forEach((deviceStyles) => {
            Object.values(deviceStyles).forEach((orientationStyles) => {
                Object.values(orientationStyles).forEach((pseudoStyles) => {
                    Object.keys(pseudoStyles).forEach((key) => allKeys.add(key));
                });
            });
        });

        const resolved: Record<string, string> = {};
        for (const key of allKeys) {
            const r = cascadeStyle(styles, key as StyleKey, device, orientation, pseudo);
            if (!r.success) return r as OperationResult<Record<string, string>>;
            resolved[key] = r.data;
        }

        return { success: true, data: resolved };
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}

/**
 * Resolve a style value that may be shorthand — tries cascade and shorthand merging.
 */
import { resolveStyleShorthand } from './shorthands';
import { findStyleShorthand } from '@/src/core/block/style/helper/finders';
export function resolveStyle(styles: BlockStyles, styleKey: StyleKey, device: string, orientation: string, pseudo: string): OperationResult<string> {
    try {
        // First check if shorthand definition exists
        const shorthandRes = findStyleShorthand(styleKey);
        if (shorthandRes.status === 'error') return { success: false, error: shorthandRes.error };
        if (shorthandRes.status === 'found') {
            // compute each longhand and then resolve
            const values = shorthandRes.data.map((longhand) => {
                const r = cascadeStyle(styles, longhand, device, orientation, pseudo);
                return r.success ? r.data : '';
            });
            const shorthandResult = resolveStyleShorthand(values);
            return shorthandResult as OperationResult<string>;
        }

        // Not a shorthand — single value
        return cascadeStyle(styles, styleKey, device, orientation, pseudo);
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}
