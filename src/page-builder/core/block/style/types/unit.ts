/**
 * All valid CSS unit names supported by the style system.
 * These correspond to official CSS units (e.g. 'px', 'em', 'vh', 'deg').
 * Used for type-safe unit lookup and validation.
 */
export type UnitKeys = 'fr' | 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmax' | 'vmin' | 'deg' | 'grad' | 'rad' | 'turn' | '%';

/**
 * Groups of CSS dimensions based on their functional use.
 * Used for categorizing dimensions in the style system.
 */
export type UnitTypes = 'length' | 'angle' | 'flex' | 'percentage';

/**
 * Represents a single CSS unit definition, including its name, value, support status, and category.
 * Used for unit lookup, validation, and UI rendering.
 */
export interface UnitDefinition {
	/** The canonical name of the CSS unit (e.g. 'px', 'em', 'vh'). */
	name: UnitKeys;
	/** The value of the CSS unit (usually same as name). */
	value: `${number}${UnitKeys}`;
	/** The group of the CSS unit (e.g. 'length', 'angle', 'percentage', 'flex'). */
	type: UnitTypes;
}
