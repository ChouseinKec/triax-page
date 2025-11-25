// Types
import type { BlockID } from '@/src/core/block/instance/types';
import type { OperationResult } from '@/src/shared/types/result';

// Utilities
import { toKebabCase } from '@/src/shared/utilities/string';

/**
 * Generate CSS properties block from key/value map
 */
export function generateCSSProperties(styles: Record<string, string>, indentLevel = 1): OperationResult<string> {
    try {
        const indent = '  '.repeat(indentLevel);
        let css = '';
        for (const [key, value] of Object.entries(styles)) {
            if (!value) continue;
            if (!key) continue;
            const formattedKey = toKebabCase(key);
            if (!formattedKey) continue;
            css += `${indent}${formattedKey}: ${value};\n`;
        }
        return { success: true, data: css };
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}

export function generateCSSSelector(blockID: BlockID, pseudoName: string): OperationResult<string> {
    try {
        const pseudoSelector = pseudoName === 'all' ? '' : `:${pseudoName}`;
        return { success: true, data: `#block-${blockID}${pseudoSelector}` };
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}

export function generateCSSRule(selector: string, styles: Record<string, string>, indentLevel = 0): OperationResult<string> {
    try {
        const indent = '  '.repeat(indentLevel);
        let css = `${indent}${selector} {\n`;
        // reuse generateCSSProperties but inline to avoid circular imports
        for (const [key, value] of Object.entries(styles)) {
            if (!value) continue;
            if (!key) continue;
            const formattedKey = toKebabCase(key);
            if (!formattedKey) continue;
            css += `${indent}  ${formattedKey}: ${value};\n`;
        }
        css += `${indent}}\n`;
        return { success: true, data: css };
    } catch (err: any) {
        return { success: false, error: err?.message ?? String(err) };
    }
}
