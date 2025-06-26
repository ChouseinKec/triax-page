import { CSSUnits } from './units';

/**
 * A string representing a numeric value followed by a valid CSS unit (e.g., "10px", "0.5rem").
 */
export type CSSDimensionString = `${number}${CSSUnits}`;

/**
 * Groups of CSS dimensions based on their functional use.
 * Used for categorizing dimensions in the style system.
 */
export type CSSDimensionGroups = 'length' | 'angle' | 'flex' | 'percentage';
