import { CSSDimensionGroups } from '@/types/style/dimension';

/**
 * Separators used to split CSS value slots in the style editor.
 * Used for parsing value definitions and slot variations.
 */
export const ValueSeparators = [' ', ',', '/'] as const;

export const DimensionGroups: CSSDimensionGroups[] = ['length', 'percentage', 'angle', 'flex'];
