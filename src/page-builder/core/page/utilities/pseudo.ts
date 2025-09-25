// Types
import type { PseudoID,PseudoName,PseudoValue } from '@/src/page-builder/core/page/types/pseudo';

/**
 * Validates that a pseudo name is valid
 */
export function isPseudoNameValid(name: unknown): name is PseudoName {
	return typeof name === 'string' && ['all', 'hover', 'active'].includes(name);
}

/**
 * Validates that a pseudo value is valid
 */
export function isPseudoValueValid(value: unknown): value is PseudoValue {
	return typeof value === 'string' && ['all', 'hover', 'active'].includes(value);
}

export function isPseudoIDValid(value: unknown): value is PseudoID {
    return typeof value === 'string' && value.length > 0;
}