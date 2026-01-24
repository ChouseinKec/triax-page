/**
 * All valid CSS unit names supported by the style system.
 * These correspond to official CSS units (e.g. 'px', 'em', 'vh', 'deg').
 * Used for type-safe unit lookup and validation.
 */
export type UnitKey = string;

/**
 * Groups of CSS dimensions based on their functional use.
 * Used for categorizing dimensions in the style system.
 */
export type UnitType = 'length' | 'angle' | 'flex' | 'percentage';

/**
 * Represents a valid CSS unit value combining a numeric value with a unit key.
 * Used for type-safe representation of CSS values (e.g. '10px', '50%', '1fr').
 */
export type UnitDefault = `${number}${UnitKey}`; // e.g. '0px', '100%', '1fr'

/**
 * Represents a single CSS unit definition, including its name, value, support status, and category.
 * Used for unit lookup, validation, and UI rendering.
 */
export interface UnitDefinition {
	/** The canonical name of the CSS unit (e.g. 'px', 'em', 'vh'). */
	key: UnitKey;
	/** The group of the CSS unit (e.g. 'length', 'angle', 'percentage', 'flex'). */
	type: UnitType;
}

/**
 * A record mapping unit keys to their corresponding unit definitions.
 * Used for efficient lookup of unit metadata by key.
 */
export type UnitDefinitionRecord = Record<UnitKey, UnitDefinition>;
