// Types
import type { CSSDimensionGroups } from '@/types/style/dimension';
import type {ValueSeparators as ValueSeparatorsType} from '@/types/style/value';

/**
 * Separators used to split CSS value slots in the style editor.
 * Used for parsing value definitions and slot variations.
 */
export const ValueSeparators: ValueSeparatorsType[] = [' ', ',', '/'];

export const DimensionGroups: CSSDimensionGroups[] = ['length', 'percentage', 'angle', 'flex'];
